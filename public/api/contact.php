<?php
/**
 * KORTFOLIO Contact API Endpoint — Hardened Production Handler
 *
 * Implements:
 * - Content-Type & Method enforcement (POST / OPTIONS only)
 * - Origin validation (CORS restriction to verified hosts)
 * - Request payload size capping (10 KB max)
 * - Anti-spam honeypot & interaction time validation
 * - Link spam detection (max 3 URLs)
 * - Strict email header injection prevention (CRLF stripping)
 * - IP-based rate limiting (5 inquiries / 15 minutes)
 * - Safe UTF-8 email dispatch with honest failure reporting
 */

declare(strict_types=1);

// 1. Security Headers & CORS
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'https://bambamdev.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
} elseif (empty($origin)) {
    // Same-origin browser request where Origin header is omitted
    header('Access-Control-Allow-Methods: POST, OPTIONS');
} else {
    // Untrusted cross-origin request
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Cross-origin request blocked.'], JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST, OPTIONS');
    echo json_encode(['ok' => false, 'error' => 'Method not allowed. Use POST.'], JSON_UNESCAPED_SLASHES);
    exit;
}

// 2. Payload size cap (10 KB max to prevent buffer exhaust)
if (isset($_SERVER['CONTENT_LENGTH']) && (int)$_SERVER['CONTENT_LENGTH'] > 10240) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Payload exceeds 10 KB limit.'], JSON_UNESCAPED_SLASHES);
    exit;
}

// 3. Client IP Extraction & Rate Limiting
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP']
    ?? $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '127.0.0.1';

// Take first IP if comma-separated and validate
$clientIp = trim(explode(',', $clientIp)[0]);
if (!filter_var($clientIp, FILTER_VALIDATE_IP)) {
    $clientIp = '127.0.0.1';
}

$rateDir = sys_get_temp_dir() . '/kortfolio_cache';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/rate_' . hash('sha256', $clientIp) . '.json';
$now = time();
$history = [];

if (file_exists($rateFile)) {
    $rawHistory = @file_get_contents($rateFile);
    if ($rawHistory !== false) {
        $decoded = @json_decode($rawHistory, true);
        if (is_array($decoded)) {
            // Retain entries within 15 minutes (900 seconds)
            $history = array_filter($decoded, fn($ts) => is_int($ts) && ($now - $ts) < 900);
        }
    }
}

if (count($history) >= 5) {
    http_response_code(429);
    echo json_encode([
        'ok' => false,
        'error' => 'Rate limit exceeded. Please wait a few minutes before submitting another inquiry, or email kayphanga@gmail.com directly.'
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

// 4. Parse input safely (max 10 KB)
$inputRaw = file_get_contents('php://input', false, null, 0, 10240);
$data = [];
if (!empty($inputRaw)) {
    $parsed = json_decode($inputRaw, true);
    if (is_array($parsed)) {
        $data = $parsed;
    }
}
if (empty($data)) {
    $data = $_POST;
}

// 5. Anti-Spam Defenses
// Layer 1: Honeypot field 'website' (must remain empty for human users)
$honeypot = trim((string)($data['website'] ?? ''));
if ($honeypot !== '') {
    // Silently return 200 so bots are not alerted to honeypot trigger
    http_response_code(200);
    echo json_encode(['ok' => true, 'message' => 'Inquiry received. Thank you.'], JSON_UNESCAPED_SLASHES);
    exit;
}

// Layer 2: Minimum interaction duration check (3 seconds minimum)
$timestamp = isset($data['_ts']) ? (int)$data['_ts'] : null;
if ($timestamp !== null && ($now - $timestamp) < 3) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Submission rejected: human interaction verification failed.'], JSON_UNESCAPED_SLASHES);
    exit;
}

// 6. Input Sanitization & Strict Validation
$rawName = trim((string)($data['name'] ?? ''));
$rawEmail = trim((string)($data['email'] ?? ''));
$rawOrganisation = trim((string)($data['organisation'] ?? ''));
$rawProject = trim((string)($data['project'] ?? 'general'));
$rawMessage = trim((string)($data['message'] ?? ''));

// CRITICAL: Strip any Carriage Return or Line Feed characters from single-line headers
$name = preg_replace('/[\r\n\x00-\x1F\x7F]+/', ' ', $rawName) ?? '';
$email = preg_replace('/[\r\n\x00-\x1F\x7F]+/', '', $rawEmail) ?? '';
$organisation = preg_replace('/[\r\n\x00-\x1F\x7F]+/', ' ', $rawOrganisation) ?? '';
$project = preg_replace('/[\r\n\x00-\x1F\x7F]+/', ' ', $rawProject) ?? 'general';
$message = str_replace(["\r\n", "\r"], "\n", $rawMessage);

$errors = [];

if (mb_strlen($name) < 2 || mb_strlen($name) > 80) {
    $errors['name'] = 'Name must be between 2 and 80 characters.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120) {
    $errors['email'] = 'A valid email address is required.';
}

if (mb_strlen($organisation) > 120) {
    $errors['organisation'] = 'Organisation must be 120 characters or fewer.';
}

if (mb_strlen($project) > 60) {
    $errors['project'] = 'Project identifier is too long.';
}

if (mb_strlen($message) < 20 || mb_strlen($message) > 2000) {
    $errors['message'] = 'Message brief must be between 20 and 2000 characters.';
}

// Layer 3: Link count cap (max 3 URLs to deter automated link spam)
$linkCount = preg_match_all('/https?:\/\//i', $message);
if ($linkCount > 3) {
    $errors['message'] = 'Please limit external links in the message brief to 3 or fewer.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Validation failed.', 'details' => $errors], JSON_UNESCAPED_SLASHES);
    exit;
}

// Record submission timestamp for rate limiting
$history[] = $now;
@file_put_contents($rateFile, json_encode($history), LOCK_EX);

// 7. Compose and Dispatch Notification Email
$to = 'kayphanga@gmail.com';
$cleanSubject = sprintf('[KORTFOLIO] %s — %s', $project !== 'general' ? $project : 'General Enquiry', $name);

$bodyLines = [
    'New direct inquiry received via Kortfolio website.',
    '==================================================',
    'Name:         ' . $name,
    'Email:        ' . $email,
    'Organisation: ' . ($organisation !== '' ? $organisation : 'Not specified'),
    'Mission:      ' . $project,
    'Submitted:    ' . date('r'),
    'Client IP:    ' . $clientIp,
    '==================================================',
    '',
    'Message Brief:',
    $message,
    '',
    '==================================================',
    'Dispatched by Kortfolio Production API'
];
$body = implode("\r\n", $bodyLines);

// Use verified sender host
$host = $_SERVER['SERVER_NAME'] ?? 'bambamdev.com';
$fromEmail = 'noreply@' . preg_replace('/^www\./', '', $host);

$headers = [
    'From: Kortfolio Notification <' . $fromEmail . '>',
    'Reply-To: ' . addslashes($name) . ' <' . $email . '>',
    'X-Mailer: Kortfolio-API/3.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit'
];

$mailSent = @mail($to, $cleanSubject, $body, implode("\r\n", $headers));

if (!$mailSent) {
    error_log(sprintf('[KORTFOLIO] mail() dispatch failed for %s <%s>', $name, $email));
    
    // Transparent fallback: inform user so they can immediately use client-side mail draft
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => 'Server email transport is currently unavailable on this host. Your message has been retained in the form—please click "Open in Mail App" or "Copy Draft" to send directly.'
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

http_response_code(200);
echo json_encode([
    'ok' => true,
    'message' => 'Your message was sent successfully! Kondwani will review your inquiry and respond shortly.'
], JSON_UNESCAPED_SLASHES);

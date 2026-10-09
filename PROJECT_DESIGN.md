# PROJECT_DESIGN: Kondwani Austin Phanga Portfolio & Systems Lab

> Generated via `tasteful-ui` skill for `/Users/mac/Sites/Kortfolio`
> Mode: `taste_first_redesign`

## 1. Product Context

- **Product:** Kondwani Austin Phanga Personal Portfolio & Interactive Engineering Lab (`Kortfolio`).
- **Target User:** Global and regional engineering leaders, multilateral donor directors (World Bank, UNICEF, UNDP), enterprise FinTech & cloud hiring managers, fellow systems architects.
- **Target Surface:** Responsive single-page web app with interactive modal simulators and terminal CLI.
- **Primary Job-to-be-Done:** Establish deep credibility and distinctive craftsmanship for a Malawian computer engineer, showing how 10+ years across telecom data centres, cloud finance, edge AI hardware, and documentary filmmaking translate into resilient, real-world systems.
- **Success Criteria:**
  - Distinctive, dignified, and memorable—zero generic AI template feel.
  - High information density without visual clutter or fatigue.
  - Interactive simulators feel tactile and responsive.
  - Photography and human stories feel naturally integrated with the technical architecture.
- **Technical Constraints:** React 19, TypeScript, Tailwind CSS v3, Framer Motion, Lucide icons, Vite.

---

## 2. Existing UI Read

- **Current Visual Vocabulary:** Dark slate-blue tones (`#07090e`, `#090c14`), frosted glass panels, ambient blur halos, emerald/teal/amber badges, monospaced metadata tags.
- **Strongest Existing Cue to Preserve:** The grounded, real-world narrative (MTL telecom server rooms, off-grid solar edge cameras, tambala-level reconciliation, Bawo cultural mechanics, field documentary photography).
- **Patterns to Preserve:**
  - Interactive architecture playground with live state manipulation.
  - Monospace telemetry tags and location timestamps.
  - Clear section progression from high-level impact to deep technical simulators.
- **Patterns to Evolve:**
  - **Remove decorative ambient glow blobs** (violates anti-generic rules: meaningless background blurs add visual noise without utility).
  - **Sharpen container edges and hierarchy**: replace floaty generic glassmorphism with crisp, deliberate border contrasts (`border-white/10` and `bg-slate-900/60`).
  - **Typography hierarchy**: enhance contrast between display headlines, conversational narrative body text, and tabular monospace data points.
- **Patterns to Avoid:**
  - Over-saturated neon accents.
  - Generic SaaS feature grids.
  - Ungrounded corporate marketing buzzwords.

---

## 3. Taste Direction

- **Product Identity Sentence:** A grounded, high-craft portfolio and interactive engineering lab for an African systems builder whose work bridges low-level edge hardware, cloud finance, and human storytelling.
- **Recommended Direction:** **Tactile Field Engineering & Editorial Calm**
- **Direction to Avoid:** **Generic Neon Cyberpunk / SaaS Template**
- **Why this makes the UI more useful:** Replaces superficial decorative effects with functional clarity, high contrast for readable code/specs, and tactile interaction surfaces that highlight the real engineering accomplishments.
- **What should feel distinctive:** The harmony between rigorous technical instrumentation (telemetry pills, edge metrics, simulator controls) and warm, dignified editorial narrative (stories from the field, photography).
- **What should stay quiet:** Backgrounds, dividers, decorative shadows.

---

## 4. Selected References

### Reference A: Linear (`references/designs/productivity _ saas/linear.md`)
- **Why it fits:** Best-in-class dark surface precision, crisp 1px borders, subtle hover highlights, keyboard-first utility, understated typography.
- **Transferable traits:** Exact border-radii harmony, subtle border highlights (`border-white/[0.08]` to `border-white/20`), crisp pill indicators, muted secondary text contrast.
- **Non-transferable details:** Pure Silicon Valley product-management iconography; we preserve Kondwani's field engineering and Malawian context.
- **Risk:** Can feel sterile if used without warm human storytelling.

### Reference B: Mintlify / Notion (`references/designs/productivity _ saas/mintlify.md`)
- **Why it fits:** Superior long-form reading comfort, editorial pacing, clear section hierarchy, respectful typography.
- **Transferable traits:** Generous text leading, high-contrast headings, quiet inline badges, clear thematic categorization.
- **Risk:** May feel too documentation-heavy if applied to interactive simulators.

---

## 5. Visual Theme & Atmosphere

- **Design Thesis:** *Instrumentation meets Ethnography*—clean engineering precision paired with warm human truth.
- **Emotional Tone:** Quiet confidence, battle-tested resilience, intellectual curiosity, and warmth.
- **First Viewport Message:** A builder who delivers real software under real constraints.
- **Visual Weight Priorities:**
  1. Primary headline & authentic personal bio.
  2. Selected work cards & interactive simulators.
  3. Real-world telemetry & field metrics.
  4. Documentary field photography.

---

## 6. Color Palette & Roles

- **Base Canvas:** Deep Charcoal Ink (`#080A0F`)
- **Elevated Surfaces:** Surface Slate (`#0E131F`), Hover (`#141B2D`)
- **Primary Text:** Crisp White (`#F8FAFC`)
- **Secondary Text:** Slate 300 (`#CBD5E1`)
- **Muted / Technical Text:** Slate 400 (`#94A3B8`) — 7.68:1 on the base canvas. _Deviation: the brief originally specified Slate 500 (`#64748B`), which measures 4.02–4.18:1 across all five section backgrounds and fails WCAG AA 4.5:1 for body text. Slate 500 remains acceptable only for non-text decoration._
- **Accents:**
  - Field Emerald (`#10B981` / `#059669`): Online status, verified production checks.
  - Solar Amber (`#F59E0B` / `#D97706`): Interactive controls, highlighted code tokens.
  - Lake Malawi Sky (`#0EA5E9`): Technical architecture & cloud components.
- **Borders:** Crisp Subtle (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.16)`)

---

## 7. Component Styling Guidelines

- **Cards:** Crisp rounded-2xl with `bg-[#0e131f]/80 backdrop-blur-md border border-white/10`. Hover transitions use subtle border elevation (`hover:border-emerald-500/40`) rather than huge scaling or loud shadows.
- **Buttons:** Solid tactile surfaces with clear states. Primary CTA uses rich gradient (`from-emerald-500 to-teal-500`) with crisp dark text. Secondary buttons use `bg-white/[0.04] hover:bg-white/[0.08] border border-white/10`.
- **Badges:** Compact monospace pills with 1px border and low-opacity matching background.
- **Elimination of Noise:** Remove all giant blurred radial glow circles (`bg-teal-500/5 blur-3xl`, `bg-purple-600/5 blur-3xl`) across sections to let content and photography shine with true contrast.

---

## 8. Implementation Checklist

- [x] Skill installed in global (`~/.gemini/config/skills/tasteful-ui`) and workspace (`.agents/skills/tasteful-ui`).
- [ ] Present Taste Direction Investment Gate to user.
- [ ] Apply refined typography, crisp border systems, and remove generic ambient glow blobs across all views.
- [ ] Verify build and responsive layouts.

### Accessibility & Craft Remediation (2026-09-30)

Correctness fixes applied ahead of the visual-evolution work above. These were
defects, not taste decisions, so they did not require a new investment gate.

- [x] Replaced non-functional `animate-in fade-in` classes (no `tailwindcss-animate`
      installed) with a native `.animate-fade-in` utility in `src/index.css`.
- [x] Added `src/hooks/useDialogA11y.ts`: focus trap, focus restore, Escape
      handling, and background scroll lock. Wired into all three overlays
      (`ProjectModal`, `PhotographyGallery`, `InteractiveTerminal`).
- [x] Added `role="dialog"`, `aria-modal`, `aria-label`, and accessible names to
      icon-only controls across the three overlays.
- [x] Added `prefers-reduced-motion` support: CSS reset in `src/index.css` plus
      `<MotionConfig reducedMotion="user">` in `src/App.tsx`.
- [x] Added `scroll-mt-24` to all seven anchored sections so headings clear the
      fixed navbar.
- [x] Raised the 12px type floor: 50× `text-[10px]` and 33× `text-[11px]` → `text-xs`.
- [x] Swapped 32× `text-slate-500` → `text-slate-400` for AA contrast (see §6).
- [x] Verified: `tsc --noEmit` clean, production build passes, and browser checks
      confirm 0 sub-12px text, no horizontal overflow at 390px, working focus
      traps and focus restore, and working Escape/scroll-lock on all overlays.

### Still Open

- [ ] The banned ambient glow blob remains at `Hero.tsx:14` + `index.css:33-35`.
- [ ] 15 `backdrop-blur` sites remain; §7 calls for crisper surfaces.
- [ ] Bundle is 542 kB with no code splitting.
- [ ] `ProjectCard` preview image is a clickable `<div>` (`ProjectCard.tsx:47`)
      — not keyboard reachable. Needs to become a real `<button>`.
- [ ] `npm run lint` does not exist in `package.json`; only `dev`, `build`, `preview`.

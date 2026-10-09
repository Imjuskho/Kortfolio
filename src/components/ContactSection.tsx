import React, { useState } from 'react';
import { Send, Mail, MapPin, Globe, MessageSquare, CheckCircle2, Check, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { asset } from '../lib/asset';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Collaboration Inquiry')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    }, 800);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-foreground text-xs font-mono focus:outline-none focus:border-accent transition-colors";

  return (
    <section className="py-24 relative bg-surface/40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Intro & Direct Channels */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-mono mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SAY HELLO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Let's Build Something Together.
            </h2>

            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
              Whether you have a technical challenge, a cloud architecture to untangle, an edge project, or just want to connect—I'd love to hear from you.
            </p>

            <a
              href={asset(PERSONAL_INFO.cv)}
              download="Kondwani-Phanga-CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 mb-8 rounded-xl bg-surface hover:bg-surface-2 border border-border hover:border-accent/50 text-foreground text-sm font-medium transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-accent" />
              Download my CV (PDF)
            </a>

            {/* Contact Channels */}
            <div className="space-y-3">
              <ContactRow
                icon={<Mail className="w-4 h-4" />}
                tone="accent"
                label="Email"
                value={PERSONAL_INFO.email}
                href={`mailto:${PERSONAL_INFO.email}`}
                copied={copied === 'email'}
                onCopy={() => handleCopy(PERSONAL_INFO.email, 'email')}
              />
              <ContactRow
                icon={<MapPin className="w-4 h-4" />}
                tone="teal"
                label="Based in"
                value={PERSONAL_INFO.location}
              />
              <ContactRow
                icon={<Globe className="w-4 h-4" />}
                tone="violet"
                label="Focus"
                value="Cloud Architecture • Edge Systems • FinTech"
              />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-border hover:border-accent/50 hover:text-accent text-muted text-xs font-mono transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/40 text-[#0a66c2] dark:text-[#38bdf8] text-xs font-mono transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-border shadow-[0_24px_60px_-24px_var(--shadow-strong)]">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Opening your mail client…</h3>
                  <p className="text-muted text-sm max-w-sm mx-auto">
                    If nothing opens, reach me directly at{' '}
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-accent hover:underline">{PERSONAL_INFO.email}</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-faint uppercase mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-faint uppercase mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-faint uppercase mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project idea, consulting, cloud architecture..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-faint uppercase mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me a bit about what you're working on..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

const toneMap: Record<string, string> = {
  accent: 'bg-accent/10 text-accent',
  teal: 'bg-teal/10 text-teal',
  violet: 'bg-violet/10 text-violet',
};

const ContactRow: React.FC<{
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: string;
  href?: string;
  copied?: boolean;
  onCopy?: () => void;
}> = ({ icon, tone, label, value, href, copied, onCopy }) => {
  const body = (
    <>
      <div className={`p-2 rounded-lg flex-shrink-0 ${toneMap[tone] ?? toneMap.accent}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-faint uppercase">{label}</div>
        <div className="text-foreground font-semibold truncate">{value}</div>
      </div>
    </>
  );

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-surface border border-border transition-colors">
      {href ? (
        <a href={href} className="flex items-center gap-3 min-w-0 flex-1">{body}</a>
      ) : (
        <div className="flex items-center gap-3 min-w-0 flex-1">{body}</div>
      )}
      {onCopy && (
        <button
          onClick={onCopy}
          aria-label={`Copy ${label}`}
          className="p-2 rounded-lg bg-surface-2 border border-border text-faint hover:text-accent hover:border-accent/40 transition-all cursor-pointer flex-shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-accent" /> : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>}
        </button>
      )}
    </div>
  );
};

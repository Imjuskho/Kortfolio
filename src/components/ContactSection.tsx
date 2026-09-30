import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Globe, MessageSquare, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Create mailto fallback link
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Collaboration Inquiry')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#06080e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>INITIATE COLLABORATION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Let's Build Resilient Systems Together.
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                Available for enterprise cloud architecture, data centre operations, FinTech engineering, edge vision systems, and strategic technology consulting.
              </p>

              {/* Direct links list */}
              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Direct Email</div>
                    <div className="text-white font-semibold">{PERSONAL_INFO.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Direct Telephone</div>
                    <div className="text-white font-semibold">{PERSONAL_INFO.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Geographical Base</div>
                    <div className="text-white font-semibold">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Degree & Credentials</div>
                    <div className="text-white font-semibold">BSc Computer Engineering (Univ. of Livingstonia)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social pills */}
            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-white/10">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
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
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel bg-[#0d121e] border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs text-slate-400 font-mono mb-6">
                Direct transmission dispatched to Kondwani Phanga's primary mailbox.
              </p>

              {submitted ? (
                <div className="p-8 text-center rounded-xl bg-emerald-950/30 border border-emerald-500/30 font-mono">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <div className="text-white font-bold text-base">Transmission Prepared</div>
                  <p className="text-slate-300 text-xs mt-1">
                    Opening your default email client to send your message to {PERSONAL_INFO.email}...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Jane Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080b12] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@organization.org"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080b12] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Inquiry Domain / Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Enterprise Cloud Architecture, FinTech Reconciliation, or Edge AI"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080b12] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your inquiry, project scope, or research collaboration..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080b12] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
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

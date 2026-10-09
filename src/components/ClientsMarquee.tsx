import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe2, Landmark } from 'lucide-react';
import { CLIENT_PARTNERS } from '../data/portfolioData';
import { asset } from '../lib/asset';

interface MarqueeRowProps {
  items: typeof CLIENT_PARTNERS;
  reverse?: boolean;
  duration: string;
}

const LogoCard: React.FC<{ client: (typeof CLIENT_PARTNERS)[number] }> = ({ client }) => (
  <div className="group/tile flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-[0_10px_30px_-16px_var(--shadow-strong)] transition-all duration-300 min-w-[264px]">
    {client.logo ? (
      <div className="h-12 w-20 shrink-0 flex items-center justify-start overflow-hidden">
        <img
          src={asset(client.logo)}
          alt=""
          className="max-h-10 max-w-[80px] w-auto object-contain opacity-85 group-hover/tile:opacity-100 transition-opacity"
        />
      </div>
    ) : (
      <div className="w-11 h-11 shrink-0 rounded-xl bg-surface-2 border border-border flex items-center justify-center font-mono text-[11px] font-bold tracking-tight text-muted group-hover/tile:text-accent group-hover/tile:border-accent/40 transition-colors overflow-hidden">
        {client.mark}
      </div>
    )}
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-semibold text-foreground group-hover/tile:text-accent transition-colors whitespace-nowrap">
        {client.name}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-wider text-faint">
        {client.sector}
      </span>
    </div>
  </div>
);

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, reverse, duration }) => (
  <div className="marquee-mask overflow-hidden">
    <div
      className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:[animation-play-state:paused]`}
      style={{ ['--marquee-duration' as string]: duration } as React.CSSProperties}
    >
      {[0, 1].map((dup) =>
        items.map((client) => (
          <div key={`${client.mark}-${dup}`} className="pr-4" aria-hidden={dup === 1}>
            <LogoCard client={client} />
          </div>
        ))
      )}
    </div>
  </div>
);

export const ClientsMarquee: React.FC = () => {
  const partners = CLIENT_PARTNERS;
  const multilateral = partners.filter((c) =>
    ['United Nations', 'Multilateral', 'Development Finance'].includes(c.sector)
  ).length;
  const missions = partners.filter((c) => c.sector === 'Diplomatic Mission').length;

  const stats = [
    { icon: Building2, value: `${partners.length}`, label: 'Institutional partners' },
    { icon: Globe2, value: `${multilateral}`, label: 'UN & multilateral bodies' },
    { icon: Landmark, value: `${missions}`, label: 'Diplomatic missions' },
  ];

  return (
    <section id="clients" className="scroll-mt-24 py-20 relative border-t border-border bg-surface/40 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-radial-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-mono mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            <span>TRUSTED PARTNERS & CLIENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight text-balance">
            Institutions That Trust the Work
          </h2>
          <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
            Multilateral donors, diplomatic missions, national banks, and telcos — partners served across a decade of engineering, production, and field delivery in Malawi.
          </p>
        </motion.div>

        {/* Stat strip */}
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="flex flex-col items-center text-center px-3 py-4 rounded-2xl bg-surface border border-border"
            >
              <stat.icon className="w-4 h-4 text-accent mb-1.5" />
              <span className="text-2xl font-extrabold text-foreground font-mono tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-muted leading-tight mt-0.5">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Dual-direction marquee */}
        <div className="space-y-4">
          <MarqueeRow items={partners} duration="46s" />
          <MarqueeRow items={[...partners].reverse()} reverse duration="56s" />
        </div>

      </div>
    </section>
  );
};

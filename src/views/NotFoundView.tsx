import React from 'react';
import { ArrowLeft, ArrowRight, TriangleAlert } from 'lucide-react';
import { Link } from '../lib/router';

export const NotFoundView: React.FC<{ title?: string; message?: string }> = ({
  title = 'Signal lost',
  message = 'That route is not part of this build. The archive is still online.',
}) => (
  <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-4 py-16 sm:px-6">
    <div className="pixel-panel relative overflow-hidden p-6 sm:p-10">
      <div className="absolute inset-0 grid-floor opacity-40" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 text-amber" aria-hidden="true" />
          <span className="hud-label text-amber">Error 404 / route missing</span>
        </div>
        <h1 className="display-lg mt-4 text-ink">{title}</h1>
        <p className="body-copy mt-4 max-w-xl">{message}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Link to="/missions" className="btn">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Mission select
          </Link>
          <Link to="/" className="btn btn-secondary">
            Start screen <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="btn btn-ghost border border-line">
            Contact
          </Link>
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          If you followed a shared link, the mission may have been renamed.
        </p>
      </div>
    </div>
  </div>
);

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Share2, FileSearch } from 'lucide-react';
import Logo from './Logo.jsx';

const highlights = [
  { icon: FileSearch, text: 'AI reads your tickets & bookings automatically' },
  { icon: Sparkles, text: 'A polished day-by-day itinerary in seconds' },
  { icon: Share2, text: 'Share a beautiful public link with anyone' },
  { icon: ShieldCheck, text: 'Secure JWT auth — your trips stay private' },
];

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-violet-600 to-violet-800 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-sunset-400/20 blur-3xl" />
        <Logo to="/" className="[&_span:last-child]:text-white" />

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-extrabold leading-tight"
          >
            Turn a pile of tickets into the perfect trip plan.
          </motion.h2>
          <p className="mt-4 max-w-md text-white/80">
            Upload your travel documents and let AI build a structured, shareable
            itinerary — so you can stop organising and start travelling.
          </p>
          <ul className="mt-8 space-y-3">
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-white/90"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">© {new Date().getFullYear()} Trrip</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo to="/" />
          </div>
          <h1 className="font-display text-3xl font-extrabold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

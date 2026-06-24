import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Logo({ to = '/', className = '' }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 group ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-soft transition-transform group-hover:-rotate-6">
        <Plane className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-ink">
        Tr<span className="gradient-text">rip</span>
      </span>
    </Link>
  );
}

import { Loader2 } from 'lucide-react';

export default function Spinner({ className = 'h-5 w-5', label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Loader2 className={`animate-spin ${className}`} />
      {label && <span>{label}</span>}
    </span>
  );
}

export function FullPageLoader({ label = 'Loading…' }) {
  return (
    <div className="grid min-h-[60vh] place-items-center text-slate-500">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}

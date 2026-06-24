import { Lightbulb, Luggage, Check } from 'lucide-react';

export default function TipsPacking({ tips = [], packingList = [] }) {
  if (!tips.length && !packingList.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {tips.length > 0 && (
        <div className="card p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-600">
              <Lightbulb className="h-5 w-5" />
            </span>
            Travel tips
          </h3>
          <ul className="space-y-2.5">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {packingList.length > 0 && (
        <div className="card p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
              <Luggage className="h-5 w-5" />
            </span>
            Packing list
          </h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {packingList.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

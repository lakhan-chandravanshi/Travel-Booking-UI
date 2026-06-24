import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { typeMeta } from '../utils/typeMeta.js';
import { formatDate } from '../utils/format.js';

function TimelineItem({ item }) {
  const meta = typeMeta(item.type);
  const Icon = meta.icon;
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="relative flex gap-4 pb-6 last:pb-0"
    >
      {/* node */}
      <div className="relative flex flex-col items-center">
        <span className={`z-10 grid h-10 w-10 place-items-center rounded-full ring-4 ring-white ${meta.bg} ${meta.color}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="flex-1 pt-0.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h4 className="font-bold text-ink">{item.title}</h4>
          {item.time && (
            <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
              {item.time}
            </span>
          )}
        </div>
        {item.description && <p className="mt-0.5 text-sm text-slate-600">{item.description}</p>}
        {item.location && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-slate-400">
            <MapPin className="h-3 w-3" />
            {item.location}
          </p>
        )}
      </div>
    </motion.li>
  );
}

function DayBlock({ day, index }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
      className="card overflow-hidden"
    >
      <header className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-brand-50/80 to-transparent px-5 py-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-600 font-display text-lg font-extrabold text-white shadow-soft">
          {day.dayNumber || index + 1}
        </span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
            Day {day.dayNumber || index + 1}
            {day.date ? ` · ${formatDate(day.date, 'EEE, d MMM')}` : ''}
          </p>
          <h3 className="font-display text-lg font-bold text-ink">{day.title || 'Plans'}</h3>
          {day.summary && <p className="text-sm text-slate-500">{day.summary}</p>}
        </div>
      </header>

      <div className="px-5 py-5">
        <ol className="relative">
          {/* vertical connector */}
          {day.items?.length > 1 && (
            <span className="absolute left-5 top-5 bottom-5 w-px bg-slate-200" aria-hidden />
          )}
          {(day.items || []).map((item, i) => (
            <TimelineItem key={i} item={item} />
          ))}
        </ol>
      </div>
    </motion.section>
  );
}

export default function ItineraryTimeline({ days = [] }) {
  if (!days.length) {
    return <p className="text-center text-slate-500">No day-by-day plan was generated.</p>;
  }
  return (
    <div className="space-y-5">
      {days.map((day, i) => (
        <DayBlock key={i} day={day} index={i} />
      ))}
    </div>
  );
}

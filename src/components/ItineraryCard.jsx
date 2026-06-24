import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Globe, ArrowUpRight, Trash2 } from 'lucide-react';
import { formatRange } from '../utils/format.js';

export default function ItineraryCard({ itinerary, onDelete, index = 0 }) {
  const dayCount = itinerary.days?.length ?? itinerary.dayCount;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card group relative flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-soft"
    >
      <Link to={`/itinerary/${itinerary._id}`} className="flex flex-1 flex-col">
        {/* gradient banner */}
        <div className="relative flex h-28 items-center justify-between overflow-hidden bg-gradient-to-br from-brand-500 to-violet-600 px-5">
          <span className="text-5xl drop-shadow-sm">{itinerary.coverEmoji || '✈️'}</span>
          <ArrowUpRight className="h-5 w-5 text-white/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold leading-snug text-ink line-clamp-2">
            {itinerary.title}
          </h3>
          {itinerary.summary && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">{itinerary.summary}</p>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs font-medium text-slate-500">
            {itinerary.destination && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-400" />
                {itinerary.destination}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5 text-brand-400" />
              {formatRange(itinerary.startDate, itinerary.endDate)}
            </span>
            {dayCount > 0 && <span className="chip !bg-slate-100 !text-slate-600">{dayCount}d</span>}
            {itinerary.share?.isPublic && (
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <Globe className="h-3.5 w-3.5" />
                Shared
              </span>
            )}
          </div>
        </div>
      </Link>

      {onDelete && (
        <button
          onClick={() => onDelete(itinerary)}
          className="absolute right-3 top-3 rounded-lg bg-white/90 p-1.5 text-slate-400 opacity-0 shadow-sm transition hover:text-rose-500 group-hover:opacity-100"
          aria-label="Delete itinerary"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}

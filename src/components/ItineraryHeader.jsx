import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Eye } from 'lucide-react';
import { formatRange } from '../utils/format.js';

/**
 * The hero banner shown at the top of an itinerary (both the private detail
 * page and the public share page). `actions` is an optional node (buttons).
 */
export default function ItineraryHeader({ itinerary, actions, author }) {
  const dayCount = itinerary.days?.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-violet-700 p-6 text-white shadow-glow sm:p-9"
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-sunset-400/20 blur-2xl" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-4xl backdrop-blur">
              {itinerary.coverEmoji || '✈️'}
            </span>
            <div>
              {itinerary.tags?.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {itinerary.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold capitalize backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-4xl">
                {itinerary.title}
              </h1>
            </div>
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
        </div>

        {itinerary.summary && (
          <p className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base">{itinerary.summary}</p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/90">
          {itinerary.destination && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {itinerary.destination}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {formatRange(itinerary.startDate, itinerary.endDate)}
          </span>
          {dayCount > 0 && (
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
              {dayCount} {dayCount === 1 ? 'day' : 'days'}
            </span>
          )}
          {author && (
            <span className="inline-flex items-center gap-1.5">
              by <strong className="font-bold">{author}</strong>
            </span>
          )}
          {itinerary.share?.views > 0 && (
            <span className="inline-flex items-center gap-1.5 text-white/70">
              <Eye className="h-4 w-4" />
              {itinerary.share.views}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Hash, CheckCircle2, AlertTriangle, Trash2 } from 'lucide-react';
import { typeMeta } from '../utils/typeMeta.js';
import { formatDate, formatMoney } from '../utils/format.js';

export default function BookingCard({ booking, onDelete, selectable, selected, onToggle }) {
  const meta = typeMeta(booking.documentType || booking.extractedData?.type);
  const Icon = meta.icon;
  const data = booking.extractedData || {};
  const failed = booking.status === 'failed';

  const route =
    data.from?.city || data.to?.city
      ? `${data.from?.city || data.from?.code || '—'} → ${data.to?.city || data.to?.code || data.location || '—'}`
      : data.location;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card relative flex flex-col gap-3 p-4 transition ${
        selectable ? 'cursor-pointer hover:ring-brand-300' : ''
      } ${selected ? 'ring-2 ring-brand-500' : ''}`}
      onClick={selectable ? onToggle : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-xl ${meta.bg} ${meta.color}`}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{meta.label}</p>
            <h4 className="font-bold leading-tight text-ink">
              {data.title || booking.fileName || 'Document'}
            </h4>
          </div>
        </div>

        {selectable ? (
          <span
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${
              selected ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300'
            }`}
          >
            {selected && <CheckCircle2 className="h-4 w-4" />}
          </span>
        ) : (
          onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(booking._id);
              }}
              className="rounded-lg p-1.5 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
              aria-label="Delete booking"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )
        )}
      </div>

      {failed ? (
        <p className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          <AlertTriangle className="h-4 w-4" />
          We couldn&apos;t auto-read this file, but it&apos;s saved.
        </p>
      ) : (
        <div className="space-y-1.5 text-sm text-slate-600">
          {route && (
            <p className="flex items-center gap-2 font-semibold text-ink">
              {data.from?.city || data.to?.city ? (
                <>
                  <span>{data.from?.city || data.from?.code || data.provider}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-brand-400" />
                  <span>{data.to?.city || data.to?.code || data.location}</span>
                </>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brand-400" />
                  {route}
                </span>
              )}
            </p>
          )}
          {data.provider && <p className="text-slate-500">{data.provider}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {data.startDateTime && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(data.startDateTime, 'd MMM, HH:mm')}
              </span>
            )}
            {data.confirmationNumber && (
              <span className="inline-flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {data.confirmationNumber}
              </span>
            )}
            {formatMoney(data.price) && (
              <span className="font-semibold text-emerald-600">{formatMoney(data.price)}</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

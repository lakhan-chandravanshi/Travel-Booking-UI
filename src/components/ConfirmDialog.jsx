import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Spinner from './Spinner.jsx';

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger,
  busy,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="card w-full max-w-sm p-6 text-center"
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${
                danger ? 'bg-rose-100 text-rose-600' : 'bg-brand-100 text-brand-600'
              }`}
            >
              <AlertTriangle className="h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">{title}</h3>
            {message && <p className="mt-2 text-sm text-slate-500">{message}</p>}
            <div className="mt-6 flex gap-3">
              <button onClick={onCancel} disabled={busy} className="btn-secondary btn-md flex-1">
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={busy}
                className={`btn-md flex-1 ${danger ? 'btn bg-rose-600 text-white hover:bg-rose-700' : 'btn-primary'}`}
              >
                {busy ? <Spinner className="h-4 w-4" /> : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

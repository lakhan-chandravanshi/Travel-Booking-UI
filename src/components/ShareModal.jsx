import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Check, Globe, Lock, Share2, MessageCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from './Spinner.jsx';

export default function ShareModal({ open, onClose, itinerary, onToggle, busy }) {
  const [copied, setCopied] = useState(false);
  const isPublic = itinerary?.share?.isPublic;
  const slug = itinerary?.share?.slug;
  const shareUrl = slug ? `${window.location.origin}/trip/${slug}` : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied!');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Could not copy link');
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: itinerary.title, text: 'Check out my trip plan!', url: shareUrl });
      } catch {
        /* user cancelled */
      }
    } else {
      copy();
    }
  };

  const text = encodeURIComponent(`Check out my trip "${itinerary?.title}" on Trrip: ${shareUrl}`);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card w-full max-w-md p-6"
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-ink">Share this trip</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Public toggle */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    isPublic ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isPublic ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">
                    {isPublic ? 'Public link is on' : 'Private'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isPublic ? 'Anyone with the link can view' : 'Only you can see this trip'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onToggle(!isPublic)}
                disabled={busy}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  isPublic ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
                aria-label="Toggle public sharing"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    isPublic ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {busy && (
              <p className="mt-3 text-center text-sm text-slate-500">
                <Spinner className="h-4 w-4" label="Updating…" />
              </p>
            )}

            {isPublic && shareUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 space-y-3"
              >
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5">
                  <span className="flex min-w-0 flex-1 items-center gap-2 px-2 text-sm text-slate-500">
                    <Link2 className="h-4 w-4 shrink-0" />
                    <span className="truncate">{shareUrl}</span>
                  </span>
                  <button onClick={copy} className="btn-primary btn-md shrink-0 !py-2">
                    {copied ? <Check className="h-4 w-4" /> : 'Copy'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button onClick={nativeShare} className="btn-secondary btn-md flex-col !gap-1 !py-3">
                    <Share2 className="h-5 w-5 text-brand-600" />
                    <span className="text-xs">Share</span>
                  </button>
                  <a
                    href={`https://wa.me/?text=${text}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary btn-md flex-col !gap-1 !py-3"
                  >
                    <MessageCircle className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs">WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(itinerary.title)}&body=${text}`}
                    className="btn-secondary btn-md flex-col !gap-1 !py-3"
                  >
                    <Mail className="h-5 w-5 text-sky-600" />
                    <span className="text-xs">Email</span>
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

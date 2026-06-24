import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileStack, Wand2, ArrowRight, Loader2, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import UploadDropzone from '../components/UploadDropzone.jsx';
import BookingCard from '../components/BookingCard.jsx';
import Spinner from '../components/Spinner.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { bookingsApi } from '../api/bookings.js';
import { itinerariesApi } from '../api/itineraries.js';

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);

  useEffect(() => {
    bookingsApi
      .list()
      .then((list) => {
        setBookings(list);
        setSelected(new Set(list.filter((b) => b.status === 'extracted').map((b) => b._id)));
      })
      .catch(() => {})
      .finally(() => setLoadingExisting(false));
  }, []);

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    setProgress(0);
    try {
      const { bookings: created, failedCount } = await bookingsApi.upload(files, setProgress);
      setBookings((prev) => [...created, ...prev]);
      setSelected((prev) => {
        const next = new Set(prev);
        created.forEach((b) => b.status === 'extracted' && next.add(b._id));
        return next;
      });
      setFiles([]);
      toast.success(
        `Extracted ${created.filter((b) => b.status === 'extracted').length} document(s)` +
          (failedCount ? ` · ${failedCount} need a manual look` : '')
      );
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleGenerate = async () => {
    const ids = [...selected];
    if (!ids.length) {
      toast.error('Select at least one booking to include.');
      return;
    }
    setGenerating(true);
    try {
      const itinerary = await itinerariesApi.generate({ bookingIds: ids });
      toast.success('Your itinerary is ready! 🎉');
      navigate(`/itinerary/${itinerary._id}`);
    } catch (err) {
      toast.error(err.message || 'Could not generate itinerary');
    } finally {
      setGenerating(false);
    }
  };

  const extracted = bookings.filter((b) => b.status === 'extracted');

  return (
    <div className="section py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-ink">Upload travel documents</h1>
        <p className="mt-1 text-slate-500">
          Add your flight tickets, hotel bookings and travel passes — we&apos;ll read them and build your trip.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upload column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="card p-5">
            <UploadDropzone files={files} setFiles={setFiles} disabled={uploading} />

            <AnimatePresence>
              {uploading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="mb-1 flex justify-between text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading & extracting…
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleUpload}
              disabled={!files.length || uploading}
              className="btn-primary btn-lg mt-4 w-full"
            >
              {uploading ? (
                <Spinner label="Processing…" />
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Upload & extract {files.length > 0 && `(${files.length})`}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generate column */}
        <div className="lg:col-span-2">
          <div className="card sticky top-20 p-5">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Wand2 className="h-5 w-5 text-brand-600" />
              Generate itinerary
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {extracted.length
                ? `${selected.size} of ${extracted.length} booking(s) selected.`
                : 'Upload documents first, then generate.'}
            </p>
            <button
              onClick={handleGenerate}
              disabled={generating || !selected.size}
              className="btn-primary btn-lg mt-4 w-full"
            >
              {generating ? (
                <Spinner label="Building your plan…" />
              ) : (
                <>
                  Generate
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            {extracted.length > 1 && (
              <button
                onClick={() => setSelected(new Set(extracted.map((b) => b._id)))}
                className="btn-ghost btn-md mt-2 w-full"
              >
                <CheckCheck className="h-4 w-4" /> Select all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bookings */}
      <div className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
          <FileStack className="h-5 w-5 text-brand-500" />
          Your bookings
          {extracted.length > 0 && (
            <span className="chip">{extracted.length}</span>
          )}
        </h2>

        {loadingExisting ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-28 w-full" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={FileStack}
            title="No bookings yet"
            description="Upload your first travel document above to get started."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {bookings.map((b) => (
              <BookingCard
                key={b._id}
                booking={b}
                selectable={b.status === 'extracted'}
                selected={selected.has(b._id)}
                onToggle={() => toggle(b._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

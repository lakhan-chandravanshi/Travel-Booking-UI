import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Share2, Printer, Trash2, ArrowLeft, FileText, Pencil, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ItineraryHeader from '../components/ItineraryHeader.jsx';
import ItineraryTimeline from '../components/ItineraryTimeline.jsx';
import TipsPacking from '../components/TipsPacking.jsx';
import ShareModal from '../components/ShareModal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { FullPageLoader } from '../components/Spinner.jsx';
import { typeMeta } from '../utils/typeMeta.js';
import { itinerariesApi } from '../api/itineraries.js';
import { resolveAsset } from '../api/client.js';

export default function ItineraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareBusy, setShareBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');

  useEffect(() => {
    setLoading(true);
    itinerariesApi
      .get(id)
      .then(setItinerary)
      .catch((err) => {
        toast.error(err.message || 'Itinerary not found');
        navigate('/history');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleToggleShare = async (isPublic) => {
    setShareBusy(true);
    try {
      const res = await itinerariesApi.share(id, isPublic);
      setItinerary((prev) => ({
        ...prev,
        share: { ...prev.share, isPublic: res.isPublic, slug: res.slug || prev.share?.slug },
      }));
    } catch (err) {
      toast.error(err.message || 'Could not update sharing');
    } finally {
      setShareBusy(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await itinerariesApi.remove(id);
      toast.success('Itinerary deleted');
      navigate('/history');
    } catch (err) {
      toast.error(err.message || 'Could not delete');
      setDeleting(false);
    }
  };

  const saveTitle = async () => {
    const title = titleDraft.trim();
    if (!title || title === itinerary.title) {
      setEditing(false);
      return;
    }
    try {
      const updated = await itinerariesApi.update(id, { title });
      setItinerary((prev) => ({ ...prev, title: updated.title }));
      toast.success('Title updated');
    } catch (err) {
      toast.error(err.message || 'Could not update');
    } finally {
      setEditing(false);
    }
  };

  if (loading) return <FullPageLoader label="Loading your trip…" />;
  if (!itinerary) return null;

  const sourceDocs = itinerary.bookings?.filter((b) => typeof b === 'object') || [];

  const actions = (
    <>
      <button onClick={() => setShareOpen(true)} className="btn-md bg-white/15 text-white backdrop-blur hover:bg-white/25">
        <Share2 className="h-4 w-4" />
        Share
      </button>
      <button onClick={() => window.print()} className="btn-md bg-white/15 text-white backdrop-blur hover:bg-white/25" title="Print / save as PDF">
        <Printer className="h-4 w-4" />
      </button>
      <button onClick={() => setConfirmDelete(true)} className="btn-md bg-white/15 text-white backdrop-blur hover:bg-rose-500/80" title="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  );

  return (
    <div className="section py-8">
      <Link to="/history" className="no-print mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-600">
        <ArrowLeft className="h-4 w-4" />
        Back to trips
      </Link>

      <ItineraryHeader itinerary={itinerary} actions={actions} />

      {/* Inline title editor */}
      <div className="no-print mt-3 flex items-center gap-2">
        {editing ? (
          <>
            <input
              className="input max-w-md"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
            />
            <button onClick={saveTitle} className="btn-primary btn-md !px-3">
              <Check className="h-4 w-4" />
            </button>
            <button onClick={() => setEditing(false)} className="btn-secondary btn-md !px-3">
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setTitleDraft(itinerary.title);
              setEditing(true);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-brand-600"
          >
            <Pencil className="h-3.5 w-3.5" />
            Rename trip
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ItineraryTimeline days={itinerary.days} />
        </div>

        <aside className="space-y-6">
          {sourceDocs.length > 0 && (
            <div className="card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <FileText className="h-5 w-5 text-brand-500" />
                Source documents
              </h3>
              <ul className="space-y-2">
                {sourceDocs.map((b) => {
                  const meta = typeMeta(b.documentType);
                  const Icon = meta.icon;
                  return (
                    <li key={b._id}>
                      <a
                        href={resolveAsset(b.fileUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5 transition hover:border-brand-200 hover:bg-brand-50/40"
                      >
                        <span className={`grid h-9 w-9 place-items-center rounded-lg ${meta.bg} ${meta.color}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">
                            {b.extractedData?.title || b.fileName}
                          </span>
                          <span className="text-xs text-slate-400">{meta.label}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-6">
        <TipsPacking tips={itinerary.tips} packingList={itinerary.packingList} />
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        itinerary={itinerary}
        onToggle={handleToggleShare}
        busy={shareBusy}
      />
      <ConfirmDialog
        open={confirmDelete}
        title="Delete this itinerary?"
        message="This will permanently remove the trip. This can't be undone."
        confirmLabel="Delete"
        danger
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}

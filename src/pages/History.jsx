import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import ItineraryCard from '../components/ItineraryCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { itinerariesApi } from '../api/itineraries.js';

export default function History() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    itinerariesApi
      .list()
      .then(setItineraries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await itinerariesApi.remove(toDelete._id);
      setItineraries((prev) => prev.filter((i) => i._id !== toDelete._id));
      toast.success('Itinerary deleted');
      setToDelete(null);
    } catch (err) {
      toast.error(err.message || 'Could not delete');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = itineraries.filter((i) =>
    `${i.title} ${i.destination || ''}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="section py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">Your trips</h1>
          <p className="mt-1 text-slate-500">All the itineraries you&apos;ve generated.</p>
        </div>
        <Link to="/upload" className="btn-primary btn-md">
          <Plus className="h-4 w-4" />
          New itinerary
        </Link>
      </div>

      {itineraries.length > 0 && (
        <div className="relative mb-6 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            className="input pl-10"
            placeholder="Search by title or destination…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton h-60 w-full" />
          ))}
        </div>
      ) : itineraries.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No itineraries yet"
          description="Once you generate a trip it will show up here for easy access."
          action={
            <Link to="/upload" className="btn-primary btn-md">
              <Plus className="h-4 w-4" /> Create one now
            </Link>
          }
        />
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-slate-500">No trips match “{query}”.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, i) => (
            <ItineraryCard key={it._id} itinerary={it} index={i} onDelete={setToDelete} />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this itinerary?"
        message={`“${toDelete?.title}” will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        danger
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}

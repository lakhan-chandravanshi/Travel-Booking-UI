import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, MapPin, Luggage, Globe, ArrowRight, Sparkles } from 'lucide-react';
import ItineraryCard from '../components/ItineraryCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { itinerariesApi } from '../api/itineraries.js';
import { bookingsApi } from '../api/bookings.js';

function StatCard({ icon: Icon, label, value, tint }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tint}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-2xl font-extrabold text-ink">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([itinerariesApi.list(), bookingsApi.list()])
      .then(([its, bks]) => {
        setItineraries(its);
        setBookingCount(bks.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sharedCount = itineraries.filter((i) => i.share?.isPublic).length;
  const firstName = user?.name?.split(' ')[0] || 'traveller';

  return (
    <div className="section py-8">
      {/* Greeting + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-violet-700 p-7 text-white shadow-glow sm:p-9"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/70">Welcome back 👋</p>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Hi, {firstName}</h1>
            <p className="mt-2 max-w-md text-white/85">
              Upload a booking or generate a fresh itinerary from your documents.
            </p>
          </div>
          <Link to="/upload" className="btn-lg bg-white text-brand-700 hover:-translate-y-0.5 hover:bg-slate-50">
            <Plus className="h-5 w-5" />
            New itinerary
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={MapPin} label="Itineraries" value={itineraries.length} tint="bg-brand-100 text-brand-600" />
        <StatCard icon={Luggage} label="Documents uploaded" value={bookingCount} tint="bg-sunset-100 text-sunset-600" />
        <StatCard icon={Globe} label="Shared publicly" value={sharedCount} tint="bg-emerald-100 text-emerald-600" />
      </div>

      {/* Recent itineraries */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">Recent trips</h2>
          {itineraries.length > 0 && (
            <Link to="/history" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton h-60 w-full" />
            ))}
          </div>
        ) : itineraries.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No itineraries yet"
            description="Upload your travel documents and generate your first AI-powered itinerary."
            action={
              <Link to="/upload" className="btn-primary btn-md">
                <Plus className="h-4 w-4" />
                Create your first trip
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {itineraries.slice(0, 6).map((it, i) => (
              <ItineraryCard key={it._id} itinerary={it} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer, Sparkles, Plane, Frown } from 'lucide-react';
import ItineraryHeader from '../components/ItineraryHeader.jsx';
import ItineraryTimeline from '../components/ItineraryTimeline.jsx';
import TipsPacking from '../components/TipsPacking.jsx';
import Logo from '../components/Logo.jsx';
import { FullPageLoader } from '../components/Spinner.jsx';
import { itinerariesApi } from '../api/itineraries.js';

export default function PublicItinerary() {
  const { slug } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    itinerariesApi
      .getPublic(slug)
      .then(setItinerary)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <FullPageLoader label="Loading trip…" />;

  if (error || !itinerary) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
        <div>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Frown className="h-8 w-8" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">Trip not found</h1>
          <p className="mt-2 text-slate-500">This itinerary is private or no longer exists.</p>
          <Link to="/" className="btn-primary btn-md mt-6">
            <Plane className="h-4 w-4" />
            Explore Trrip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Minimal public top bar */}
      <header className="no-print sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="section flex h-16 items-center justify-between">
          <Logo to="/" />
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="btn-secondary btn-md" title="Print / save as PDF">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Save PDF</span>
            </button>
            <Link to="/register" className="btn-primary btn-md">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Plan your own</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="section py-8 print-full">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 no-print">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Shared itinerary
        </div>

        <ItineraryHeader itinerary={itinerary} author={itinerary.user?.name} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ItineraryTimeline days={itinerary.days} />
          </div>
          <aside>
            <TipsPacking tips={itinerary.tips} packingList={itinerary.packingList} />
          </aside>
        </div>

        {/* Soft CTA footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="no-print mt-12 flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-8 text-center text-white"
        >
          <h3 className="font-display text-2xl font-extrabold">Plan a trip like this in minutes</h3>
          <p className="max-w-md text-white/85">
            Upload your tickets and let Trrip&apos;s AI build a shareable itinerary for you, too.
          </p>
          <Link to="/register" className="btn-lg mt-2 bg-white text-brand-700 hover:bg-slate-50">
            Get started free
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

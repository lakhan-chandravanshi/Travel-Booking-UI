import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  UploadCloud,
  Sparkles,
  Share2,
  FileSearch,
  Plane,
  BedDouble,
  ShieldCheck,
  Clock,
  Wand2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const features = [
  { icon: FileSearch, title: 'Smart extraction', desc: 'AI reads PDFs & images and pulls out routes, dates, providers and confirmation numbers — no manual typing.' },
  { icon: Wand2, title: 'Instant itineraries', desc: 'Your bookings become a clean, chronological day-by-day plan complete with tips and a packing list.' },
  { icon: Share2, title: 'Share beautifully', desc: 'Flip a trip public and send a polished link friends can open anywhere — no account needed.' },
  { icon: ShieldCheck, title: 'Private & secure', desc: 'JWT-secured accounts keep your trips yours. Documents are stored safely in the cloud.' },
];

const steps = [
  { icon: UploadCloud, title: 'Upload documents', desc: 'Drag in your flight tickets, hotel bookings and travel passes.' },
  { icon: Sparkles, title: 'AI does the work', desc: 'We extract the details and assemble a structured itinerary.' },
  { icon: Share2, title: 'View & share', desc: 'Browse your timeline, save it to history, and share a link.' },
];

function FloatCard({ icon: Icon, title, sub, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`absolute flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-card ring-1 ring-slate-100 backdrop-blur ${className}`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="pr-2">
        <p className="text-sm font-bold leading-tight text-ink">{title}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const primaryTo = isAuthenticated ? '/dashboard' : '/register';

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-hero-grid [background-size:22px_22px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-brand-50/70 to-transparent" />
        <div className="section relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chip mb-5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              MERN + AI · Travel itinerary generator
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Your tickets in.
              <br />
              A perfect <span className="gradient-text">itinerary</span> out.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-xl text-lg text-slate-600"
            >
              Upload your flight, hotel and travel documents — Trrip&apos;s AI reads
              them and builds a structured, shareable, day-by-day trip plan in seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to={primaryTo} className="btn-primary btn-lg">
                Start planning free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="btn-secondary btn-lg">
                Log in
              </Link>
            </motion.div>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <Clock className="h-4 w-4" />
              No credit card · works with a built-in demo account
            </p>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative mx-auto h-[420px] w-full max-w-md"
          >
            <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-brand-500 via-violet-500 to-violet-700 shadow-glow" />
            <div className="absolute inset-0 -rotate-2 rounded-[2rem] bg-white p-6 shadow-card">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="text-3xl">🏖️</span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">4 Days in Goa</p>
                  <p className="text-xs text-slate-400">2 bookings · AI generated</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { c: 'bg-sky-100 text-sky-600', i: Plane, t: 'IndiGo · Delhi → Goa', s: '08:15' },
                  { c: 'bg-violet-100 text-violet-600', i: BedDouble, t: 'Taj Holiday Village', s: 'Check-in' },
                  { c: 'bg-sunset-100 text-sunset-600', i: Sparkles, t: 'Sunset at Sinquerim', s: 'Evening' },
                ].map(({ c, i: I, t, s }) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <span className={`grid h-9 w-9 place-items-center rounded-lg ${c}`}>
                      <I className="h-4 w-4" />
                    </span>
                    <p className="flex-1 text-sm font-semibold text-ink">{t}</p>
                    <span className="text-xs font-medium text-slate-400">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <FloatCard
              icon={UploadCloud}
              title="flight.pdf"
              sub="extracted ✓"
              className="-left-6 top-10 animate-float"
              delay={0.4}
            />
            <FloatCard
              icon={Share2}
              title="Link copied"
              sub="ready to share"
              className="-right-4 bottom-8 animate-float [animation-delay:1.5s]"
              delay={0.6}
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Everything you need to plan smarter
          </h2>
          <p className="mt-3 text-slate-600">
            From messy confirmation emails to a trip you can actually follow.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-soft">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Three steps to your itinerary
            </h2>
          </div>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-violet-700 px-8 py-14 text-center text-white shadow-glow">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sunset-400/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-extrabold sm:text-4xl">
            Ready to plan your next trip?
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-white/85">
            Create a free account and turn your bookings into a beautiful itinerary in under a minute.
          </p>
          <Link to={primaryTo} className="btn-lg relative mt-7 inline-flex bg-white text-brand-700 hover:-translate-y-0.5 hover:bg-slate-50">
            Get started — it&apos;s free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

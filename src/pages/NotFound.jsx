import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-100 text-brand-600">
          <Compass className="h-10 w-10 animate-float" />
        </span>
        <p className="mt-6 font-display text-6xl font-extrabold gradient-text">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink">Looks like you&apos;re off the map</h1>
        <p className="mt-2 text-slate-500">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="btn-primary btn-md mt-6">
          Take me home
        </Link>
      </div>
    </div>
  );
}

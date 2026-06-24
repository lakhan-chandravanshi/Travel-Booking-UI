import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="no-print mt-20 border-t border-slate-200 bg-white">
      <div className="section flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <Logo />
        <p className="text-sm text-slate-500">
          Built with the MERN stack + AI · {new Date().getFullYear()}
        </p>
        <p className="text-sm text-slate-400">Upload · Extract · Plan · Share</p>
      </div>
    </footer>
  );
}

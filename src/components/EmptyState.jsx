export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
      {Icon && (
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-500">
          <Icon className="h-8 w-8" />
        </span>
      )}
      <div>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        {description && <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

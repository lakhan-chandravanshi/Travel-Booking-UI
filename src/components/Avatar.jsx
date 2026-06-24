import { initials } from '../utils/format.js';

export default function Avatar({ name, color = '#6366f1', size = 36 }) {
  return (
    <span
      className="grid place-items-center rounded-full font-bold text-white shadow-sm ring-2 ring-white"
      style={{ background: color, width: size, height: size, fontSize: size * 0.4 }}
      title={name}
    >
      {initials(name)}
    </span>
  );
}

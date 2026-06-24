import {
  Plane,
  BedDouble,
  TrainFront,
  Bus,
  Car,
  Ship,
  Ticket,
  Utensils,
  LogIn,
  LogOut,
  MapPin,
  Footprints,
} from 'lucide-react';

/**
 * Visual metadata for every booking / itinerary-item type:
 * an icon, a friendly label, and a Tailwind colour pairing.
 */
export const TYPE_META = {
  flight: { icon: Plane, label: 'Flight', color: 'text-sky-600', bg: 'bg-sky-100' },
  hotel: { icon: BedDouble, label: 'Hotel', color: 'text-violet-600', bg: 'bg-violet-100' },
  train: { icon: TrainFront, label: 'Train', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  bus: { icon: Bus, label: 'Bus', color: 'text-amber-600', bg: 'bg-amber-100' },
  car_rental: { icon: Car, label: 'Car rental', color: 'text-slate-600', bg: 'bg-slate-100' },
  transport: { icon: Car, label: 'Transport', color: 'text-slate-600', bg: 'bg-slate-100' },
  cruise: { icon: Ship, label: 'Cruise', color: 'text-cyan-600', bg: 'bg-cyan-100' },
  activity: { icon: Ticket, label: 'Activity', color: 'text-sunset-600', bg: 'bg-sunset-100' },
  meal: { icon: Utensils, label: 'Meal', color: 'text-rose-600', bg: 'bg-rose-100' },
  checkin: { icon: LogIn, label: 'Check-in', color: 'text-violet-600', bg: 'bg-violet-100' },
  checkout: { icon: LogOut, label: 'Check-out', color: 'text-violet-600', bg: 'bg-violet-100' },
  other: { icon: MapPin, label: 'Booking', color: 'text-brand-600', bg: 'bg-brand-100' },
};

export const typeMeta = (type) => TYPE_META[type] || TYPE_META.other;

export { Footprints };

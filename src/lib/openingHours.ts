const TIME_ZONE = "Asia/Kolkata";

export type OpeningStatus = {
  isOpen: boolean;
  label: string;
};

type KolkataClock = {
  weekday: string;
  minutes: number;
};

function kolkataClock(now: Date): KolkataClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const hour = Number(value("hour"));
  const minute = Number(value("minute"));

  return {
    weekday: value("weekday"),
    minutes: hour * 60 + minute,
  };
}

/**
 * The clinic's weekly hours. This is the single source of truth: the live status, every
 * displayed timing and the structured data are all derived from it.
 * Times are minutes after midnight in Asia/Kolkata.
 */
export const weeklyHours = [
  { days: "Monday to Saturday", dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], open: 600, close: 1200 },
  { days: "Sunday", dayNames: ["Sunday"], open: 600, close: 1020 },
] as const;

function hoursFor(weekday: string) {
  return weekday === "Sun" ? weeklyHours[1] : weeklyHours[0];
}

/** "10:00" style 24-hour time, as used in schema.org openingHoursSpecification. */
export function time24(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** "10:00 AM" when long, "10 AM" when short. */
export function time12(minutes: number, long = false) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  if (!long && minute === 0) return `${display} ${suffix}`;
  return `${display}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** Display labels used by visit/contact pages, e.g. "10:00 AM – 8:00 PM". */
export const openingHoursDisplay = weeklyHours.map((row) => ({
  days: row.days,
  hours: `${time12(row.open, true)} – ${time12(row.close, true)}`,
}));

/** Short labels, e.g. "Monday to Saturday, 10 AM to 8 PM". */
export const openingHoursShort = weeklyHours.map((row) => `${row.days}, ${time12(row.open)} to ${time12(row.close)}`);

/**
 * Live clinic status for Asia/Kolkata, from weeklyHours.
 * Opening is inclusive; closing is exclusive.
 */
export function getOpeningStatus(now: Date): OpeningStatus {
  const { weekday, minutes } = kolkataClock(now);
  const today = hoursFor(weekday);

  if (minutes >= today.open && minutes < today.close) {
    return { isOpen: true, label: `Open now · until ${time12(today.close)}` };
  }

  if (minutes < today.open) {
    return { isOpen: false, label: `Opens today at ${time12(today.open)}` };
  }

  const tomorrowIsSunday = weekday === "Sat";
  const tomorrow = tomorrowIsSunday ? weeklyHours[1] : weeklyHours[0];
  return {
    isOpen: false,
    label: `Closed now · opens ${tomorrowIsSunday ? "Sunday" : "tomorrow"} at ${time12(tomorrow.open)}`,
  };
}

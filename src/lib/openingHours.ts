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

/** Display labels used by visit/contact pages. Keep in sync with getOpeningStatus. */
export const openingHoursDisplay = [
  { days: "Monday to Saturday", hours: "10:00 AM – 8:00 PM" },
  { days: "Sunday", hours: "10:00 AM – 5:00 PM" },
] as const;

/**
 * Live clinic status for Asia/Kolkata.
 * Monday–Saturday 10:00–20:00, Sunday 10:00–17:00.
 * Opening is inclusive; closing is exclusive.
 */
export function getOpeningStatus(now: Date): OpeningStatus {
  const { weekday, minutes } = kolkataClock(now);
  const isSunday = weekday === "Sun";
  const openAt = 10 * 60;
  const closeAt = isSunday ? 17 * 60 : 20 * 60;

  if (minutes >= openAt && minutes < closeAt) {
    return {
      isOpen: true,
      label: isSunday ? "Open now · until 5 PM" : "Open now · until 8 PM",
    };
  }

  if (minutes < openAt) {
    return { isOpen: false, label: "Opens today at 10 AM" };
  }

  if (weekday === "Sat") {
    return { isOpen: false, label: "Closed now · opens Sunday at 10 AM" };
  }

  return { isOpen: false, label: "Closed now · opens tomorrow at 10 AM" };
}

import { addMinutes, format, isBefore, parse, startOfDay } from "date-fns";

export const ISO_DATE = "yyyy-MM-dd";

export function todayISO(): string {
  return format(new Date(), ISO_DATE);
}

export function toISODate(date: Date): string {
  return format(date, ISO_DATE);
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function endTime(start: string, duration: number): string {
  return minutesToTime(timeToMinutes(start) + duration);
}

export function combineDateTime(date: string, time: string): Date {
  return parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());
}

export function rangesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function isPastDate(date: string): boolean {
  return isBefore(parse(date, ISO_DATE, new Date()), startOfDay(new Date()));
}

export function buildTimeSlots(open: string, close: string, step: number): string[] {
  const slots: string[] = [];
  for (let t = timeToMinutes(open); t < timeToMinutes(close); t += step) slots.push(minutesToTime(t));
  return slots;
}

/** Formata data para Google Calendar (UTC compact). */
export function toGoogleCalendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarLink(params: {
  title: string;
  start: Date;
  durationMinutes: number;
  details?: string;
  location?: string;
}): string {
  const end = addMinutes(params.start, params.durationMinutes);
  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: params.title,
    dates: `${toGoogleCalendarDate(params.start)}/${toGoogleCalendarDate(end)}`,
    details: params.details ?? "",
    location: params.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

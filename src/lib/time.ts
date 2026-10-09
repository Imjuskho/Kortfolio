/** HH:MM:SS clock for a given IANA time zone. */
export function formatZoneClock(date: Date, timeZone = 'Africa/Blantyre'): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    return '--:--:--';
  }
}

/** Minutes east of UTC for a time zone at the given instant. */
export function zoneOffsetMinutes(timeZone: string, date = new Date()): number {
  try {
    const part = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset',
    })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value;
    const match = part?.match(/GMT([+-])(\d{2}):(\d{2})/);
    if (!match) return 0;
    return (match[1] === '-' ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3]));
  } catch {
    return 0;
  }
}

/** Human label for how far Malawi time is ahead of the visitor's clock. */
export function formatZoneDelta(minutes: number): string {
  if (minutes === 0) return 'your time';
  const sign = minutes > 0 ? '+' : '−';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}h`;
}

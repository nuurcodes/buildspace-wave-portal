export function getUTCTimeString(date: Date) {
  return date.toLocaleTimeString(undefined, {
    timeZone: 'UTC',
  })
}

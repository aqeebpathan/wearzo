export function getFormattedArrivalRange(
  startOffset = 3,
  endOffset = 7,
): string {
  const today = new Date()

  const startDate = new Date(today)
  startDate.setDate(today.getDate() + startOffset)

  const endDate = new Date(today)
  endDate.setDate(today.getDate() + endOffset)

  const optionsStart: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  }

  const optionsEndSameMonth: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
  }

  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const sameYear = startDate.getFullYear() === endDate.getFullYear()

  const formattedStart = startDate.toLocaleDateString("en-US", optionsStart)

  let formattedEnd: string
  if (sameMonth && sameYear) {
    formattedEnd = endDate.toLocaleDateString("en-US", optionsEndSameMonth) // e.g. Mon, 30
  } else {
    formattedEnd = endDate.toLocaleDateString("en-US", optionsStart) // e.g. Mon, Oct 30
  }

  return `Arrives ${formattedStart} – ${formattedEnd}`
}

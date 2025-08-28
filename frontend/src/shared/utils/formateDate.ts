export function formatEstimatedArrival(date?: string | null): string {
  if (!date) return "Date not available"

  const d = new Date(date)
  if (isNaN(d.getTime())) return "Invalid date"

  const weekday = d.toLocaleString("en-US", { weekday: "short" }) // e.g. "Fri"
  const day = d.getDate().toString().padStart(2, "0") // e.g. "13"
  const month = d.toLocaleString("en-US", { month: "short" }) // e.g. "Nov"
  const year = d.getFullYear() // e.g. 2025

  return `${weekday}, ${day} ${month}, ${year}`
}

export function formatDate(date?: string | null): string {
  if (!date) return "Date not available"

  const d = new Date(date)
  if (isNaN(d.getTime())) return "Invalid date"

  const month = d.toLocaleString("en-US", { month: "short" })
  const day = d.getDate()
  const year = d.getFullYear()

  return `${month} ${day}, ${year}`
}

import { useState, useEffect } from "react"

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 23,
    seconds: 57,
  })

  useEffect(() => {
    // Convert timeLeft to total seconds for easier calculation
    let totalSeconds =
      timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds

    const timer = setInterval(() => {
      if (totalSeconds <= 0) {
        // Reset the timer once it hits 0
        setTimeLeft({ hours: 8, minutes: 23, seconds: 57 })
        totalSeconds = 8 * 3600 + 23 * 60 + 57 // Resetting time in total seconds
      } else {
        totalSeconds -= 1
        setTimeLeft({
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        })
      }
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="text-center text-sm font-bold sm:text-start">
      <span>{String(timeLeft.hours).padStart(2, "0")}H : </span>
      <span>{String(timeLeft.minutes).padStart(2, "0")}M : </span>
      <span>{String(timeLeft.seconds).padStart(2, "0")}S</span>
    </div>
  )
}

export default CountdownTimer

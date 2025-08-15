import { useState, useEffect } from 'react'

const quotes = [
  "The secret to getting ahead is getting started. - Mark Twain",
  "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "It always seems impossible until it's done. - Nelson Mandela",
  "Quality is not an act, it is a habit. - Aristotle",
  "A goal is a dream with a deadline. - Napoleon Hill",
  "You are never too old to set another goal. - C.S. Lewis"
]

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsVisible(true)
      }, 500)
    }, 8000) // Change quote every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`text-center transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <p className="text-gray-400 italic text-sm md:text-base max-w-md mx-auto">
        "{quotes[currentQuote]}"
      </p>
      <div className="flex justify-center mt-2 space-x-1">
        {quotes.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentQuote ? 'bg-purple-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default MotivationalQuote

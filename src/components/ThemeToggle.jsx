import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('todo-theme')
    return saved ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem('todo-theme', JSON.stringify(isDark))
    // Apply theme to document if needed
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm border border-purple-200/60 dark:border-slate-600/50 rounded-full p-3 text-gray-700 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white hover:border-purple-400/70 transition-all duration-300 hover:scale-110 shadow-lg shadow-purple-500/10"
        title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default ThemeToggle

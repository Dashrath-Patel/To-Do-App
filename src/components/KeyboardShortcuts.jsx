import { useState, useEffect } from 'react'

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Show shortcuts on '?' key press
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setIsVisible(true)
      }
      // Hide shortcuts on Escape
      if (e.key === 'Escape') {
        setIsVisible(false)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200/60 dark:border-gray-600 rounded-full p-3 text-gray-700 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white hover:border-purple-400/70 dark:hover:border-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/10"
          title="Keyboard shortcuts (Press ?)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-800 border border-purple-200/50 dark:border-gray-600 rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 shadow-xl shadow-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Keyboard Shortcuts</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Add new task</span>
            <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 border border-purple-200/50 dark:border-gray-600">Enter</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Search tasks</span>
            <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 border border-purple-200/50 dark:border-gray-600">Ctrl + F</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Edit task</span>
            <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 border border-purple-200/50 dark:border-gray-600">Click</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Save edit</span>
            <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 border border-purple-200/50 dark:border-gray-600">Enter</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Cancel edit</span>
            <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 border border-purple-200/50 dark:border-gray-600">Esc</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Show shortcuts</span>
            <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 border border-purple-200/50 dark:border-gray-600">?</kbd>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-purple-200/50 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-500 text-sm text-center">
            Press <kbd className="px-1 py-0.5 bg-purple-100/70 dark:bg-gray-700 rounded text-xs border border-purple-200/50 dark:border-gray-600">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}

export default KeyboardShortcuts

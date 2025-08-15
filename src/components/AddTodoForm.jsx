import { useState } from 'react'
import MotivationalQuote from './MotivationalQuote'

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText('')
      setIsExpanded(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`bg-white/90 dark:bg-slate-800/80 backdrop-blur-lg border border-purple-200/60 dark:border-slate-600/50 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden shadow-xl shadow-purple-500/10 ${
          isExpanded ? 'border-purple-400/70 shadow-2xl shadow-purple-500/20' : 'hover:border-purple-300/80 dark:hover:border-slate-500/70 hover:shadow-xl hover:shadow-purple-500/15'
        }`}>
          {/* Enhanced grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <div className="flex items-start space-x-6 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                onBlur={() => !text && setIsExpanded(false)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done today?"
                className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 resize-none focus:outline-none focus:ring-0 focus:border-0 outline-none border-none text-xl leading-relaxed font-medium"
                rows={isExpanded ? 4 : 1}
                style={{ minHeight: '48px', outline: 'none', border: 'none', boxShadow: 'none' }}
              />
              
              {isExpanded && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-purple-200/50 dark:border-slate-700/50">
                  <div className="text-sm text-gray-600 dark:text-slate-500">
                    <span className="flex items-center space-x-2">
                      <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-slate-700/50 rounded text-xs border border-purple-200/50 dark:border-slate-600/50">Enter</kbd>
                      <span>to add</span>
                      <span className="text-gray-400 dark:text-slate-600">•</span>
                      <kbd className="px-2 py-1 bg-purple-100/70 dark:bg-slate-700/50 rounded text-xs border border-purple-200/50 dark:border-slate-600/50">Shift+Enter</kbd>
                      <span>for new line</span>
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setText('')
                        setIsExpanded(false)
                      }}
                      className="px-6 py-3 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 rounded-lg hover:bg-purple-50/50 dark:hover:bg-slate-700/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!text.trim()}
                      className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Quick add button for non-expanded state */}
        {!isExpanded && text.trim() && (
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </form>
      
      {/* Motivational quotes when no input */}
      {!isExpanded && !text && (
        <div className="mt-8">
          <MotivationalQuote />
        </div>
      )}
    </div>
  )
}

export default AddTodoForm

import { useState, useEffect } from 'react'

const TodoItem = ({ todo, onDelete, onToggle, onUpdate, index }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isVisible, setIsVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

  const handleUpdate = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onUpdate(todo.id, editText)
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdate()
    } else if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => onDelete(todo.id), 300)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-300/70 dark:border-red-500/30 bg-red-50/40 dark:bg-red-500/5'
      case 'medium': return 'border-yellow-300/70 dark:border-yellow-500/30 bg-yellow-50/40 dark:bg-yellow-500/5'
      case 'low': return 'border-green-300/70 dark:border-green-500/30 bg-green-50/40 dark:bg-green-500/5'
      default: return 'border-purple-200/60 dark:border-gray-600'
    }
  }

  return (
    <div 
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${
        isDeleting ? 'scale-95 opacity-0 -translate-x-full' : ''
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className={`group bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/15 hover:border-purple-300/50 dark:hover:border-purple-500/30 hover:-translate-y-1 relative overflow-hidden shadow-lg shadow-purple-500/5 ${
        todo.completed 
          ? 'opacity-75 bg-purple-50/50 dark:bg-slate-800/30 border-purple-200/40 dark:border-slate-700/30' 
          : getPriorityColor(todo.priority || 'medium')
      }`}>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }}></div>
        </div>
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              todo.completed
                ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-500 text-white shadow-lg shadow-green-500/25'
                : 'border-purple-300 dark:border-gray-500 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-purple-50/50 dark:hover:bg-slate-700/30'
            }`}
          >
            {todo.completed && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {!todo.completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300 hover:scale-110"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 hover:scale-110"
              title="Delete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4 relative z-10">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleUpdate}
                onKeyDown={handleKeyPress}
                className="w-full bg-purple-50/70 dark:bg-gray-700/50 border border-purple-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none shadow-sm"
                rows="3"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setEditText(todo.text)
                    setIsEditing(false)
                  }}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p 
              className={`text-lg leading-relaxed break-words cursor-pointer transition-all duration-300 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => !todo.completed && setIsEditing(true)}
            >
              {todo.text}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm relative z-10">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDate(todo.createdAt)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {todo.priority && todo.priority !== 'medium' && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                todo.priority === 'high' 
                  ? 'bg-red-200/50 dark:bg-red-500/20 text-red-600 dark:text-red-400' 
                  : 'bg-green-200/50 dark:bg-green-500/20 text-green-600 dark:text-green-400'
              }`}>
                {todo.priority}
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              todo.completed 
                ? 'bg-green-200/50 dark:bg-green-500/20 text-green-600 dark:text-green-400' 
                : 'bg-orange-200/50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400'
            }`}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
        </div>

        {/* Progress indicator for completed tasks */}
        {todo.completed && (
          <div className="mt-3 w-full bg-gray-300/50 dark:bg-slate-700/50 rounded-full h-1 relative z-10">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full w-full transition-all duration-1000"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoItem

import { useState, useEffect, useRef } from 'react'
import TodoItem from './components/TodoItem'
import AddTodoForm from './components/AddTodoForm'
import StatsCard from './components/StatsCard'
import ProgressCircle from './components/ProgressCircle'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import ThemeToggle from './components/ThemeToggle'
import storage from './utils/storage'

function App() {
  const [todos, setTodos] = useState(() => {
    return storage.getTodos()
  })
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const searchInputRef = useRef(null)

  // Save to localStorage whenever todos change
  useEffect(() => {
    storage.saveTodos(todos)
  }, [todos])

  // Animation on load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Focus search with Ctrl+F
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now() + Math.random(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }
    setTodos([newTodo, ...todos])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      setTodos([])
    }
  }

  const exportTodos = () => {
    storage.exportTodos(todos)
  }

  const handleImportTodos = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const importedTodos = await storage.importTodos(file)
        setTodos([...importedTodos, ...todos])
      } catch (error) {
        alert('Error importing todos: ' + error.message)
      }
    }
  }

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed)
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    completionRate: todos.length > 0 
      ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100)
      : 0
  }

  const getEmptyStateContent = () => {
    if (searchTerm) {
      return {
        icon: '🔍',
        title: 'No matching tasks',
        description: 'Try adjusting your search terms'
      }
    }
    
    switch (filter) {
      case 'completed':
        return {
          icon: '🎉',
          title: 'No completed tasks yet',
          description: 'Complete some tasks to see them here'
        }
      case 'active':
        return {
          icon: '⚡',
          title: 'No active tasks',
          description: 'All caught up! Add a new task or check completed ones'
        }
      default:
        return {
          icon: '📝',
          title: 'No tasks yet',
          description: 'Add your first task to get started!'
        }
    }
  }

  const emptyState = getEmptyStateContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950 text-gray-900 dark:text-white overflow-hidden relative transition-colors duration-300">
      {/* Enhanced Animated Grid Background */}
      <div className="absolute inset-0 enhanced-grid opacity-40 dark:opacity-60"></div>
      
      {/* Additional Grid Layer */}
      <div className="absolute inset-0 grid-background opacity-25 dark:opacity-30"></div>
      
      {/* Dot Grid Overlay */}
      <div className="absolute inset-0 dot-grid-background opacity-20 dark:opacity-25"></div>
      
      {/* Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-100/60 via-transparent to-blue-50/50 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/40 via-transparent to-purple-100/40 dark:from-slate-950/50 dark:via-transparent dark:to-slate-950/50"></div>
      
      {/* Animated background blobs with better colors */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/25 dark:bg-pink-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      {/* Subtle glow lines */}
      <div className="absolute inset-0 opacity-15 dark:opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/60 dark:via-purple-500/50 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 dark:via-blue-500/50 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 dark:via-purple-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/40 dark:via-blue-500/30 to-transparent"></div>
      </div>
      
      <div className={`relative z-10 container mx-auto px-4 py-8 max-w-6xl transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
            Todo Master
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl mb-4">
            Organize your life with style
          </p>
          {stats.total > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-500">
              {stats.completionRate}% completion rate • {stats.active} tasks remaining
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Tasks" 
            value={stats.total} 
            icon="📋" 
            color="from-blue-500 to-blue-600"
          />
          <StatsCard 
            title="Active Tasks" 
            value={stats.active} 
            icon="⚡" 
            color="from-orange-500 to-orange-600"
          />
          <StatsCard 
            title="Completed" 
            value={stats.completed} 
            icon="✅" 
            color="from-green-500 to-green-600"
          />
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 flex items-center justify-center">
            <ProgressCircle percentage={stats.completionRate} size={80} strokeWidth={6} />
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="mb-8">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          {todos.length > 0 && (
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks... (Ctrl+F)"
                  className="w-full bg-white/80 dark:bg-slate-800/50 border border-purple-200/50 dark:border-slate-600/50 rounded-xl px-4 py-3 pl-12 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-purple-500/10"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {['all', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                  filter === filterType
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                    : 'bg-white/70 dark:bg-slate-700/50 hover:bg-purple-50 dark:hover:bg-slate-600/60 text-gray-700 dark:text-slate-300 border border-purple-200/50 dark:border-slate-600/30 shadow-md hover:shadow-lg hover:shadow-purple-500/10'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'all' && todos.length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {todos.length}
                  </span>
                )}
                {filterType === 'active' && stats.active > 0 && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {stats.active}
                  </span>
                )}
                {filterType === 'completed' && stats.completed > 0 && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {stats.completed}
                  </span>
                )}
              </button>
            ))}
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="px-6 py-2 rounded-full font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105"
              >
                Clear Completed ({stats.completed})
              </button>
            )}

            {todos.length > 0 && (
              <button
                onClick={clearAll}
                className="px-6 py-2 rounded-full font-medium bg-red-700 hover:bg-red-800 text-white transition-all duration-300 hover:scale-105 border-2 border-red-500/30 shadow-lg shadow-red-500/25"
              >
                Clear All ({todos.length})
              </button>
            )}
            
            {todos.length > 0 && (
              <>
                <button
                  onClick={exportTodos}
                  className="px-6 py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
                >
                  Export
                </button>
                <label className="px-6 py-2 rounded-full font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 cursor-pointer">
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportTodos}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Todo List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4 animate-bounce">
                {emptyState.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                {emptyState.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                {emptyState.description}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-white/80 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg transition-colors duration-300 border border-purple-200/50 dark:border-gray-600 shadow-md hover:shadow-lg"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{stats.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span>Built by</span>
            <a 
              href="https://github.com/Dashrath-Patel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 flex items-center space-x-2 hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Dashrath Patel</span>
            </a>
          </div>
          <div className="flex justify-center space-x-4 text-sm">
            <span>Press Enter to add tasks</span>
            <span>•</span>
            <span>Click to edit</span>
            <span>•</span>
            <span>Press ? for shortcuts</span>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <KeyboardShortcuts />
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  )
}

export default App

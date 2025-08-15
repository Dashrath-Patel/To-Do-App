// Local storage utilities for the Todo app

const STORAGE_KEY = 'todo-master-data'

export const storage = {
  // Get todos from localStorage
  getTodos: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading todos from localStorage:', error)
      return []
    }
  },

  // Save todos to localStorage
  saveTodos: (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      return true
    } catch (error) {
      console.error('Error saving todos to localStorage:', error)
      return false
    }
  },

  // Clear all todos
  clearTodos: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing todos from localStorage:', error)
      return false
    }
  },

  // Export todos as JSON
  exportTodos: (todos) => {
    const dataStr = JSON.stringify(todos, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  // Import todos from JSON file
  importTodos: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const todos = JSON.parse(e.target.result)
          resolve(todos)
        } catch (error) {
          reject(new Error('Invalid JSON file'))
        }
      }
      reader.onerror = () => reject(new Error('Error reading file'))
      reader.readAsText(file)
    })
  }
}

export default storage

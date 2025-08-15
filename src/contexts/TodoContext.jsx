import { createContext, useContext, useReducer, useEffect } from 'react'

const TodoContext = createContext()

// Action types
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  SET_FILTER: 'SET_FILTER',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  LOAD_TODOS: 'LOAD_TODOS'
}

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      }
    
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    
    case ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      }
    
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    
    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    
    default:
      return state
  }
}

// Initial state
const initialState = {
  todos: [],
  filter: 'all'
}

// Provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      dispatch({
        type: ACTIONS.LOAD_TODOS,
        payload: JSON.parse(savedTodos)
      })
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state.todos])

  // Actions
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now() + Math.random(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }
    dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo })
  }

  const deleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: id })
  }

  const toggleTodo = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id })
  }

  const updateTodo = (id, newText) => {
    dispatch({
      type: ACTIONS.UPDATE_TODO,
      payload: { id, text: newText.trim() }
    })
  }

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter })
  }

  const clearCompleted = () => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED })
  }

  // Computed values
  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  const stats = {
    total: state.todos.length,
    completed: state.todos.filter(todo => todo.completed).length,
    active: state.todos.filter(todo => !todo.completed).length,
    completionRate: state.todos.length > 0 
      ? Math.round((state.todos.filter(todo => todo.completed).length / state.todos.length) * 100)
      : 0
  }

  const value = {
    ...state,
    filteredTodos,
    stats,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    setFilter,
    clearCompleted
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

// Custom hook to use the context
export const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}

export default TodoContext

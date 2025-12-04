import { useState, useCallback } from 'react'

/**
 * Custom hook for error handling in components
 * Provides consistent error state management
 */
export const useErrorHandler = () => {
  const [error, setError] = useState(null)

  const handleError = useCallback((err) => {
    // Extract error message from various error formats
    const errorMessage = err?.response?.data?.message 
      || err?.message 
      || 'Ha ocurrido un error. Por favor, intenta nuevamente.'
    
    setError(errorMessage)
    console.error('Error:', err)
    
    // Auto-clear error after 5 seconds
    setTimeout(() => setError(null), 5000)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}


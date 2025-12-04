import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook for handling async operations with loading and error states
 * Prevents state updates on unmounted components
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFunction(...args)
      if (mountedRef.current) {
        setData(result)
        setError(null)
      }
      return result
    } catch (err) {
      if (mountedRef.current) {
        setError(err)
        setData(null)
      }
      throw err
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, []) // Only run on mount if immediate

  return { data, loading, error, execute }
}


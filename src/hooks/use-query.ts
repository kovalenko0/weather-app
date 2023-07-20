import {useEffect, useRef, useState} from 'react'

export function useQuery<TResult, TParams extends any[]>(
  query: (...params: TParams) => Promise<TResult>,
  params: TParams
) {
  const [result, setResult] = useState<TResult | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown | undefined>(undefined)
  const counter = useRef(0)
  const performQuery = () => {
    counter.current += 1
    const count = counter.current
    query(...params)
      .then(r => {
        if (counter.current !== count) return
        setError(undefined)
        setResult(r)
      })
      .catch(e => {
        if (counter.current !== count) return
        setError(e)
      })
      .finally(() => {
        if (counter.current !== count) return
        setLoading(false)
      })
  }

  useEffect(performQuery, params)

  return {
    result,
    loading,
    error
  }
}
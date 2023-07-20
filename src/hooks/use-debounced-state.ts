import {useEffect, useRef, useState} from 'react'

export function useDebouncedState<T>(initial: T, delayMilliseconds: number) {
  const [immediateState, setImmediateState] = useState(initial)
  const [debouncedState, setDebouncedState] = useState(initial)
  const timeOutId = useRef<number | undefined>(undefined)
  const clearTimeout = () => {
    if (timeOutId.current) window.clearTimeout(timeOutId.current)
  }
  const enqueueSetState = (newValue: T) => {
    setImmediateState(newValue)
    clearTimeout()
    timeOutId.current = window.setTimeout(() => {
      setDebouncedState(newValue)
    }, delayMilliseconds)
  }

  useEffect(() => clearTimeout, [])

  return [immediateState, enqueueSetState, debouncedState] as const
}

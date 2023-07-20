import {useDebouncedState} from './use-debounced-state'
import {act, renderHook} from '@testing-library/react'
jest.useFakeTimers()
describe(useDebouncedState, () => {
  it('records immediate state without a delay', () => {
    const {result} = renderHook(() => useDebouncedState(0, 500))
    expect(result.current[0]).toBe(0)
    act(() => result.current[1](10))
    expect(result.current[0]).toBe(10)
  })
  it('updates debounced state after a delay', () => {
    const {result} = renderHook(() => useDebouncedState(0, 500))
    expect(result.current[0]).toBe(0)
    act(() => {
      result.current[1](10)
    })
    expect(result.current[0]).toBe(10)
    expect(result.current[2]).toBe(0)
    act(() => {
      jest.runAllTimers()
    })
    expect(result.current[2]).toBe(10)
  })
})
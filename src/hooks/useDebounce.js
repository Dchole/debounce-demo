import { useEffect, useRef } from "react"

/**
 * @callback requestCallback
 * @param {any[]} args - arguments passed into callback
 * @returns {void}
 */

/**
 * Debounce function to reduce number executions
 * @param {requestCallback} cb - callback function to be executed
 * @param {number} wait - number of milliseconds to delay function execution
 * @param {any[]} args - arguments passed into callback
 * @returns {void}
 */
const useDebounce = (cb, wait = 800, args = []) => {
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      cb.apply(this, args)
    }, wait)

    return () => clearTimeout(timerRef.current)
    /* eslint-disable react-hooks/exhaustive-deps */
    // used args.join(",") instead of just args
    // because passing an array as a dependency causes useEffect re-render infinitely
  }, [cb, wait, args])
}

export default useDebounce

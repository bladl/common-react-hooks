import { useEffect } from 'react'
import useVariable from './useVariable'

const useTimeout = (callback: () => void, delay: number | null) => {

	const callbackRef = useVariable(callback)
	useEffect(() => {
		if (delay === null) {
			return
		}
		const timeout = setTimeout(() => {
			callbackRef.current()
		}, delay)
		return () => {
			clearTimeout(timeout)
		}
	}, [callbackRef, delay])
}
export default useTimeout

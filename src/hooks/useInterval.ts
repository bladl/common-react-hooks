import { useEffect } from 'react'
import useVariable from './useVariable'

const useInterval = (callback: () => void, time: number): void => {
	const callbackRef = useVariable(callback)
	useEffect(() => {
		const interval = setInterval(() => {
			callbackRef.current()
		}, time)
		return () => {
			clearInterval(interval)
		}
	}, [time, callbackRef])
}
export default useInterval

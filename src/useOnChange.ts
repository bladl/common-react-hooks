import { useEffect } from 'react'
import usePrev from './usePrev'

const useOnChange = <T>(
	callback: (previous: T) => void | (() => void),
	value: T,
): void => {
	const previous = usePrev(value)
	useEffect(() => {
		if (previous !== value) {
			return callback(previous)
		}
		return undefined
	})
}
export default useOnChange

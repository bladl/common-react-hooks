import { useEffect } from 'react'
import usePrevious from './usePrevious'

const useOnChange = <T>(
	callback: (previous: T) => void | (() => void),
	value: T,
): void => {
	const previous = usePrevious(value)
	useEffect(() => {
		if (previous !== value) {
			return callback(previous)
		}
		return undefined
	})
}
export default useOnChange

import { KeyboardEventHandler, useCallback } from 'react'
import useVariable from './useVariable'

const useOnEnterDown = <T>(
	callback: KeyboardEventHandler<T>,
): KeyboardEventHandler<T> => {
	const ref = useVariable(callback)
	return useCallback(
		(e) => {
			if (e.key === 'Enter') {
				ref.current(e)
			}
		},
		[ref],
	)
}
export default useOnEnterDown

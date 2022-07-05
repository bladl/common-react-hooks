import { useCallback, useEffect, useState } from 'react'
import useWindow from './useWindow'

export interface WindowSize {
	width: number
	height: number
}

const useWindowSize = (): WindowSize=> {
	const window = useWindow()
	const getWindowSize = useCallback((): WindowSize => ({
		width: window?.innerWidth ?? 0,
		height: window?.innerHeight ?? 0
	}), [window])
	const [windowSize, setWindowSize] = useState<WindowSize | null>(null)

	useEffect(() => {
		if (window) {
			const listener = () => {
				setWindowSize(getWindowSize())
			}
			window.addEventListener('resize', listener)
			return () => {
				window.removeEventListener('resize', listener)
			}
		}
		return undefined
	}, [getWindowSize, window])
	return windowSize || getWindowSize()
}

export default useWindowSize

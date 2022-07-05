import { MutableRefObject, useEffect, useMemo, useRef } from 'react'
import useBool from './useBool'
import useWindow from './useWindow'

interface Options extends IntersectionObserverInit {
	fallbackInView?: boolean
	ssrInView?: boolean
}

/**
 * Once element was in viewport TRUE state is memoized
 */
const useWasInView = (
	options: Options
): [MutableRefObject<HTMLElement | null>, boolean] => {
	const { fallbackInView = false, ssrInView = false } = options
	const window = useWindow()

	const intersectionSupported = useMemo(() => window && 'IntersectionObserver' in window, [window])
	const [wasVisible, setWasVisible] = useBool(
		window
			? (intersectionSupported ? false : fallbackInView)
			: ssrInView
	)
	const ref = useRef<HTMLElement>(null)
	useEffect(() => {
		const elem = ref.current
		if (elem && !wasVisible && intersectionSupported) {
			const clear = () => {
				observer.unobserve(elem)
			}
			const observer = new IntersectionObserver((entries) => {
				if (
					entries.some(
						(entry) =>
							entry.isIntersecting ||
							entry.isIntersecting === undefined //Fix for UC browser
					)
				) {
					setWasVisible(true)
					clear()
				}
			}, options)
			observer.observe(elem)
			return clear
		}
		return undefined
	})
	return [ref, wasVisible]
}
export default useWasInView

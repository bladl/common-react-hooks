import { RefObject, useEffect, useMemo, useRef } from 'react'
import useBool from './useBool'
import useWindow from './useWindow'

interface Options extends IntersectionObserverInit {
	readonly fallbackInView?: boolean
	readonly ssrInView?: boolean
	readonly onInView?: (element: HTMLElement) => void
}

/**
 * Once element was in viewport TRUE state is memoized
 */
const useWasInView = <T extends HTMLElement, >(
	options: Options
): [RefObject<T>, boolean] => {
	const { fallbackInView = false, ssrInView = false, onInView } = options
	const window = useWindow()

	const intersectionSupported = useMemo(() => window && 'IntersectionObserver' in window, [window])
	const [wasVisible, setWasVisible] = useBool(
		window
			? (intersectionSupported ? false : fallbackInView)
			: ssrInView
	)
	const ref = useRef<T>(null)
	useEffect(() => {
		const elem = ref.current
		if (elem && !wasVisible && intersectionSupported) {
			const clear = () => {
				observer.unobserve(elem)
			}
			const observer = new IntersectionObserver((entries) => {
				if (
					entries.find(
						(entry) =>
							entry.isIntersecting ||
							entry.isIntersecting === undefined //Fix for UC browser
					)
				) {
					setWasVisible(true)
					if (onInView) {
						onInView(elem)
					}
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

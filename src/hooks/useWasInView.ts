import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react'
import useBool from './useBool'
import useVariable from './useVariable'
import useWindow from './useWindow'

interface Options extends IntersectionObserverInit {
	readonly fallbackInView?: boolean
	readonly ssrInView?: boolean
	readonly onInView?: (element: HTMLElement) => void
}

/**
 * Once element was in viewport TRUE state is memoized
 */
const useWasInView = <T extends HTMLElement>(
	{ ssrInView = false, fallbackInView = false, onInView, root, rootMargin, threshold }: Options = {}
): [RefObject<T>, boolean] => {

	const window = useWindow()
	const intersectionSupported = useMemo(() => window && 'IntersectionObserver' in window, [window])

	const [wasVisible, setWasVisible] = useBool(
		window
			? (intersectionSupported ? false : fallbackInView)
			: ssrInView
	)
	const isInViewRef = useVariable(onInView)
	const handleVisible = useCallback((element: HTMLElement) => {
		if (isInViewRef.current) {
			isInViewRef.current(element)
		}
		setWasVisible(true)
	}, [isInViewRef, setWasVisible])

	const ref = useRef<T>(null)
	useEffect(() => {
		const input = ref.current
		if (!intersectionSupported && fallbackInView && input) {
			handleVisible(input)
		}
	}, [fallbackInView, handleVisible, intersectionSupported])
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
					handleVisible(elem)
					clear()
				}
			}, { root, rootMargin, threshold })
			observer.observe(elem)
			return clear
		}
		return undefined
	}, [handleVisible, intersectionSupported, root, rootMargin, threshold, wasVisible])
	return [ref, wasVisible]
}
export default useWasInView

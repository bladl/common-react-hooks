import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
export type PromiseHandlerError = string | Error
export type PromiseHandlerHook<D> = PromiseState<D> & {
	readonly setPromise: (promise: Promise<D>) => void
	readonly getPromise: () => Promise<D> | null
}
export type PromiseRef<T> = MutableRefObject<Promise<T> | null>
const normalizeError = (err: unknown): PromiseHandlerError => {
	if (err instanceof Error) {
		return err
	}
	if (typeof err === 'string') {
		return err
	}
	console.error('Unexpected promise error format', err)
	return 'Unexpected error format'
}
type StateStalled = {
	readonly error: null
	readonly result: null
	readonly success: null
	readonly loading: false
	readonly promise: null
}
type StateError<T> = {
	readonly error: PromiseHandlerError
	readonly result: null
	readonly success: false
	readonly loading: false
	readonly promise: Promise<T>
}
type StateOk<T> = {
	readonly error: null
	readonly result: T
	readonly success: true
	readonly loading: false
	readonly promise: Promise<T>
}
type StateLoading<T> = {
	readonly error: null
	readonly result: null
	readonly success: null
	readonly loading: true
	readonly promise: Promise<T>
}
const defaultState: StateStalled = {
	error: null,
	result: null,
	success: null,
	loading: false,
	promise: null,
} as const
type PromiseState<T> =
	| StateStalled
	| StateOk<T>
	| StateError<T>
	| StateLoading<T>
const usePromiseHandler = <T>(): PromiseHandlerHook<T> => {
	const [state, setState] = useState<PromiseState<T>>(defaultState)
	const promiseRef: PromiseRef<T> = useRef(null)

	const setPromise = useCallback((promise: Promise<T> | null) => {
		promiseRef.current = promise
		if (promise === null) {
			setState(defaultState)
			return
		}
		setState({
			...defaultState,
			loading: true,
			promise,
		})
		const executeIsActual = (): boolean => promise === promiseRef.current

		promise
			.then((resp) => {
				setState((prev) => {
					if (executeIsActual()) {
						return {
							error: null,
							loading: false,
							success: true,
							result: resp,
							promise: promise,
						}
					}
					return prev
				})
			})
			.catch((err: unknown) => {
				setState((prev) => {
					if (executeIsActual()) {
						return {
							error: normalizeError(err),
							loading: false,
							success: false,
							result: null,
							promise: promise,
						}
					}
					return prev
				})
			})
	}, [])
	return useMemo<PromiseHandlerHook<T>>(() => {
		return {
			...state,
			setPromise,
			getPromise: () => promiseRef.current,
		}
	}, [state, setPromise])
}
export default usePromiseHandler

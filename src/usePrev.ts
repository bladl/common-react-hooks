import { useEffect, useRef } from 'react'

const usePrev = <T>(value: T): T => {
	const ref = useRef<T>(value)
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
export default usePrev

import {RefObject, useCallback} from 'react'

const useFocusInput = (ref:RefObject<HTMLInputElement>)=>{
	return useCallback(()=>{
		const input = ref.current
		if (input) {
			input.focus()
		}
	},[ref])
}
export default useFocusInput

import { RefObject, useRef } from 'react'

const useHTMLInputRef = ():RefObject<HTMLInputElement> => {
	return useRef<HTMLInputElement>(null)
}
export default useHTMLInputRef

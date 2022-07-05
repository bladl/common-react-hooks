import { useRef } from 'react'

const useHTMLInputRef = () => {
	return useRef<HTMLInputElement>(null)
}
export default useHTMLInputRef

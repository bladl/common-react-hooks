import { useCallback } from 'react'
type FunctionType = (value:boolean)=>void
const useCallFalse = (func:FunctionType ) => {
	return useCallback(() => {
		func(false)
	}, [func])
}
export default useCallFalse

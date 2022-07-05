import { useCallback } from 'react'
type FunctionType = (value:boolean)=>void

const useCallTrue = (state: FunctionType) => {
	return useCallback(() => {
		state(true)
	}, [state])
}
export default useCallTrue

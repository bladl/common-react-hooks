import { PromiseHandlerResult } from './usePromiseHandler'

export const enum PromiseHandlerState {
	Idle='idle',
	Ok='ok',
	Error='error',
	Loading='loading'
}
const usePromiseState = <T>({ error,loading,promise }:PromiseHandlerResult<T>):PromiseHandlerState=>{
	if (loading) {
		return PromiseHandlerState.Loading
	}
	if (error !== null) {
		return PromiseHandlerState.Error
	}
	if (promise !== null) {
		return PromiseHandlerState.Ok
	}
	return PromiseHandlerState.Idle
}
export default usePromiseState

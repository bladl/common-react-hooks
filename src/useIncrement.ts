import { Dispatch, SetStateAction, useCallback } from 'react'

type SetState = Dispatch<SetStateAction<number>>
const useIncrement = (setValue: SetState): () => void => {
	return useCallback(() => {
		setValue((prev) => prev + 1)
	}, [setValue])
}
export default useIncrement

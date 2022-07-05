import { Dispatch, SetStateAction, useCallback } from 'react'

type SetState = Dispatch<SetStateAction<number>>
const useDecrement = (setValue: SetState): () => void => {
	return useCallback(() => {
		setValue((prev) => prev - 1)
	}, [setValue])
}
export default useDecrement

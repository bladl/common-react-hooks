import { Dispatch, SetStateAction, useCallback } from 'react'

type SetBooleanState = Dispatch<SetStateAction<boolean>>
const useToggle = (setState: SetBooleanState) => {

	return useCallback(() => {
		setState((prev) => !prev)
	}, [setState])
}

export default useToggle

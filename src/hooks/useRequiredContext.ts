import { Context, useContext } from 'react'
import useRequired from './useRequired'
const useRequiredContext = <T>(context: Context<T | undefined>): T =>
	useRequired(useContext(context))
export default useRequiredContext

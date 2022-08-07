import { useEffect, useState } from 'react'
import useWindow from './useWindow'

const useWindowHost = (): string | null => {
	const [host,setHost] = useState<string|null>(null)
	const window = useWindow()
	useEffect(()=>{
		setHost(window?.location.host??null) //Fix for Server content do not match
	},[window])
	return host
}
export default useWindowHost

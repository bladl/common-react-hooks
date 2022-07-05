import { useState } from 'react'
import useOnChange from './useOnChange'
export const getTodayMidnight = (): Date => {
	const todayMidnight = new Date()
	todayMidnight.setHours(0, 0, 0, 0)
	return todayMidnight
}
const useTodayMidnight = (): Date => {
	const todayMidnight = getTodayMidnight()
	const [memoized, setMemoized] = useState(todayMidnight)
	useOnChange(() => setMemoized(todayMidnight), todayMidnight.getDay())
	return memoized
}

export default useTodayMidnight

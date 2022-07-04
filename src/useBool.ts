import { useState } from 'react'
export type BooleanState = ReturnType<typeof useBool>
const useBool = (defaultValue = false) => useState(defaultValue)
export default useBool

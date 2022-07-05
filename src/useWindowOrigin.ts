import useWindow from './useWindow'

const useWindowOrigin = (): string | null => useWindow()?.location.origin??null
export default useWindowOrigin

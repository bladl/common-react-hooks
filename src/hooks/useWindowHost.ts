import useWindow from './useWindow'

const useWindowHost = (): string | null => useWindow()?.location.host??null
export default useWindowHost

const useWindow = (): Window|null=> {
	return typeof window !== 'undefined' && window?window:null
}
export default useWindow

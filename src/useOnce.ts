import { useEffect, useRef } from "react";

type OnceCallback = () => void;
const useOnce = (callback: OnceCallback) => {
  const triggered = useRef(false);
  useEffect(() => {
    if (!triggered.current) {
      callback();
    }
  });
};
export default useOnce;

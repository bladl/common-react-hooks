import { useCallback } from "react";
import { BooleanState } from "./useBool";

const useToggle = (state: BooleanState) => {
  const [, setValue] = state;

  return useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);
};

export default useToggle;

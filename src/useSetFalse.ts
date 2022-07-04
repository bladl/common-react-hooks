import { useCallback } from "react";
import { BooleanState } from "./useBool";

const useSetFalse = (state: BooleanState) => {
  const [, setValue] = state;
  return useCallback(() => {
    setValue(false);
  }, [setValue]);
};
export default useSetFalse;

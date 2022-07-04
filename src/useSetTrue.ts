import { useCallback } from "react";
import { BooleanState } from "./useBool";

const useSetTrue = (state: BooleanState) => {
  const [, setValue] = state;
  return useCallback(() => {
    setValue(true);
  }, [setValue]);
};
export default useSetTrue;

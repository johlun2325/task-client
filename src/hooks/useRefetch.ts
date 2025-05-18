import { useContext } from "react";
import { RefetchContext, RefetchContextType } from "../context/RefetchContext";

export const useRefetch = (): RefetchContextType => {
  const context = useContext(RefetchContext);
  if (!context) throw new Error("useRefetch måste användas inom RefetchProvider");
  return context;
};

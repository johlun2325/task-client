import { createContext, useContext } from "react";

export type RefetchContextType = {
  trigger: number;
  refetchAll: () => Promise<void>;
};

export const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const useRefetch = (): RefetchContextType => {
  const context = useContext(RefetchContext);
  if (!context) throw new Error("useRefetch måste användas inom RefetchProvider");
  return context;
};

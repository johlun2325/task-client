import { useState, ReactNode } from "react";
import { RefetchContext, RefetchContextType } from "./RefetchContext";

export const RefetchProvider = ({ children }: { children: ReactNode }) => {
  const [trigger, setTrigger] = useState(0);

  const refetchAll = async () => {
    setTrigger((prev) => prev + 1);
    return Promise.resolve();
  };

  const value: RefetchContextType = { trigger, refetchAll };

  return (
    <RefetchContext.Provider value={value}>
      {children}
    </RefetchContext.Provider>
  );
};

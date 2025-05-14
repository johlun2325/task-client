import { createContext, useContext, useState } from "react";

type RefetchContextType = {
  trigger: number;
  refetchAll: () => Promise<void>;  // Ändra till att returnera en Promise
};

const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const RefetchProvider = ({ children }: { children: React.ReactNode }) => {
  const [trigger, setTrigger] = useState(0);

  const refetchAll = async () => {
    setTrigger((prev) => prev + 1);
    return Promise.resolve();
  };

  return (
    <RefetchContext.Provider value={{ trigger, refetchAll }}>
      {children}
    </RefetchContext.Provider>
  );
};

export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (!context) throw new Error("useRefetch måste användas inom RefetchProvider");
  return context;
};

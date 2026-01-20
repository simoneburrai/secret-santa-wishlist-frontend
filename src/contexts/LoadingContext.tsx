import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import LoadingModal from "../components/LoadingModal";

interface LoadingContextType {
  setIsLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Caricamento...");

  const setIsLoading = (state: boolean, msg?: string) => {
    if (msg) setMessage(msg);
    setLoading(state);
  };

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {/* Il Modal viene renderizzato qui a livello globale */}
      <LoadingModal isOpen={loading} message={message} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading deve essere usato all'interno di un LoadingProvider");
  }
  return context;
};
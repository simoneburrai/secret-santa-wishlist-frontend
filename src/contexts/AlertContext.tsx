import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import CustomAlert from "../components/CustomAlert";

interface AlertContextType {
  showAlert: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState({ isOpen: false, message: "" });

  const showAlert = (message: string) => {
    setAlert({ isOpen: true, message });
  };

  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert 
        isOpen={alert.isOpen} 
        message={alert.message} 
        onClose={closeAlert} 
      />
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert deve essere usato dentro AlertProvider");
  return context;
};
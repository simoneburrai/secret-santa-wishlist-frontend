import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import authService from "../services/authService";
import type { User } from "../types/wishlists";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; }) => Promise<any>,
  logout: ()=> void,
  register: (credentials: { name: string; email: string; password: string; })=> Promise<any>
  user: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider(props: { children: ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });


    const login = async (credentials: {email: string, password: string}) => {
    try {
      const data = await authService.login(credentials);
      
      if(data && data.token){
          localStorage.setItem("token", data.token); 
          localStorage.setItem("user", JSON.stringify(data.user));
          
          setIsAuthenticated(true); 
          setUser(data.user);
          
          return data; 
      }
    } catch (error) {
      throw error; 
    }
  };

const register = async (credentials: {name: string, email: string, password: string}) => {
    try {
        const data = await authService.register(credentials);
        
        if (data && data.token) { // <-- Qui data.token è undefined perché il backend non lo inviava
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsAuthenticated(true);
            setUser(data.user);
        } else {
            throw new Error("Dati di registrazione non validi");
        }
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        throw error;
    }
};

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // <--- Aggiungi questo!
  setIsAuthenticated(false);
  setUser(null);
};

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register
  };

  useEffect(() => {
}, [isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}


function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export {
  useAuth, 
  AuthProvider
}

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import authService from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; }) => Promise<any>,
  logout: ()=> void,
  register: (credentials: { name: string; email: string; password: string; })=> Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider(props: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<any | null>(null);


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
    const data = await authService.register(credentials);
    if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    register
  };

  useEffect(() => {
  console.log("Stato AUTH cambiato:", isAuthenticated);
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

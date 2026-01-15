import type { JSX } from "react"
import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "../contexts/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email è obbligatoria")
    .email("Formato email non valido"),
  password: z
    .string()
    .min(6, "La password deve avere almeno 6 caratteri")
});


export default function Login(): JSX.Element {

  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [dataError, setDataError] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");



  const validate = () => {
  // Puliamo gli errori precedenti prima di validare
  setDataError({ email: "", password: "" });

  const result = loginSchema.safeParse(formData);

  if (!result.success) {
  
    const formattedErrors: any = {};
    
    result.error.issues.forEach((issue) => {
      formattedErrors[issue.path[0]] = issue.message;
    });

    setDataError(prev => ({ ...prev, ...formattedErrors }));
    return false;
  }

  return true; 
};



 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const user = await login(formData);
        console.log(user);
      } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          }else {
            setError("Si È verificato un errore imprevisto");
          }
      }
    }
    return;
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 border-2 border-primary rounded-3xl bg-white/5 backdrop-blur-sm w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Bentornato!</h2>
        
        <div className="flex flex-col gap-1">
          {error && (
            <div className="bg-primary/20 border border-primary p-3 rounded-xl text-center mb-2">
              <p className="text-sm font-bold text-primary">{error}</p>
            </div>
          )}
          <label className="font-semibold" htmlFor="email">Email</label>
          <input 
            className="p-3 rounded-xl border border-primary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="babbonatale@polo.nord"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            onBlur={validate}
          />
          {dataError.email && <span className="text-xs text-primary font-bold">{dataError.email}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="password">Password</label>
          <input 
            className="p-3 rounded-xl border border-primary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            onBlur={validate}
          />
          {dataError.password && <span className="text-xs text-primary font-bold">{dataError.password}</span>}
        </div>

        <button type="submit" className="btn-santa mt-4 w-full hover:cursor-pointer">
          Accedi
        </button>
        <div className="text-center">Non hai ancora un accont? <Link to="/register" className="font-bold hover:underline hover:scale-105">Clicca qui</Link></div>
      </form>
    </div>
  );
}
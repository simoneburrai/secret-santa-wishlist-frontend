import { useState, type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";

export default function Register(): JSX.Element {
  const { register } = useAuth();
  const navigate = useNavigate();
  const {setIsLoading} = useLoading()
  
  // Stato locale per gestire gli input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true, "Registazione in corso");

    try {
      // Chiamata alla funzione register del context
      await register(formData);
      // Se la registrazione va a buon fine, reindirizziamo alla creazione wishlist
      navigate("/wishlists/create");
    } catch (err: any) {
      setError(err.message || "Errore durante la registrazione");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 border-2 border-primary rounded-3xl bg-white/5 backdrop-blur-sm w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Inizia a creare la tua wishlist!</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="name">Name</label>
          <input 
            className="p-3 rounded-xl border border-primary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Babbo Natale"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">Email</label>
          <input 
            className="p-3 rounded-xl border border-primary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="babbonatale@polo.nord"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-santa mt-4 w-full hover:cursor-pointer">
          Registrati
        </button>
        <div className="text-center">
          Hai già un account? <Link to="/login" className="font-bold hover:underline text-secondary">Clicca qui</Link>
        </div>
      </form>
    </div>
  );
}
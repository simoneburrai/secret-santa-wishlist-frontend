import type { JSX } from "react"
import { Link } from "react-router-dom";

export default function Register() : JSX.Element{
    return (
    <div className="flex-1 flex justify-center items-center">
      <form className="flex flex-col gap-4 p-8 border-2 border-primary rounded-3xl bg-white/5 backdrop-blur-sm w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Inizia a creare la tua wishlist!</h2>
        
         <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="name">Name</label>
          <input 
            className="p-3 rounded-xl border border-secondary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Babbo Natale"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">Email</label>
          <input 
            className="p-3 rounded-xl border border-secondary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="babbonatale@polo.nord"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="password">Password</label>
          <input 
            className="p-3 rounded-xl border border-secondary/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-santa mt-4 w-full hover:cursor-pointer">
          Registrati
        </button>
        <div className="text-center">Hai già un accont? <Link to="/login" className="font-bold hover:underline hover:scale-105">Clicca qui</Link></div>
      </form>
    </div>
  );
}
import type { JSX } from "react";
import { createPortal } from "react-dom"; // Necessario per il Portal
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps): JSX.Element | null {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token.trim()) {
      onClose(); // Chiudi la modale
      navigate(`/wishlists/view/${token.trim()}`); // Naviga alla rotta pubblica
    }
  };


  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Overlay: Sfondo scuro che chiude al click */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl border-2 border-secondary shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors"
        >
          <CircleX size={28} />
        </button>

        <h1 className="text-2xl font-bold text-primary mb-2">Cerca una wishlist</h1>
        <p className="text-sm text-gray-600 mb-6">Inserisci il token univoco per accedere alla lista regali dei tuoi amici.</p>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="token" className="font-semibold text-sm">Token della Wishlist</label>
          <input 
            type="text" 
            name="token" 
            id="token" 
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="p-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none"
            placeholder="Esempio: 550e8400-e29b-41d4-a716-446655440000"
            autoFocus
          />
        </div>

        <button 
          type="submit" 
          className="btn-santa mt-6 w-full py-3 font-bold uppercase tracking-wider"
        >
          Cerca Wishlist
        </button>
      </form>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
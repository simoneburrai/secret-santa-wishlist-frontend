import { useEffect } from "react";
import { X } from "lucide-react";

interface CustomAlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  autoClose?: boolean; // Opzionale: per decidere se farlo sparire da solo
}

export default function CustomAlert({ isOpen, message, onClose, autoClose = true }: CustomAlertProps) {
  
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 secondi per dare il tempo di leggere
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-[2.5rem] bg-white dark:bg-zinc-900 border-2 border-secondary/50 shadow-2xl p-8 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sfumatura decorativa interna light/dark */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

        <div className="flex flex-col items-center text-center gap-6">
          
          {/* Messaggio Dinamico - Colore adattivo */}
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-relaxed relative z-10">
            {message}
          </p>

          {/* Bottone di chiusura - Usa Secondary per coerenza */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-secondary text-white font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-secondary/20 uppercase tracking-widest text-xs"
          >
            Continua
          </button>
        </div>

        {/* Tasto X in alto a destra */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-gray-400 hover:text-secondary transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Overlay cliccabile per chiudere */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
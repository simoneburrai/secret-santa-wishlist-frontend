import { X, Info } from "lucide-react";

interface CustomAlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function CustomAlert({ isOpen, message, onClose }: CustomAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-[2.5rem] bg-white dark:bg-gray-900 border border-white/20 shadow-2xl p-8 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-6">
          {/* Icona Neutra */}
          <div className="p-4 rounded-3xl bg-current/5 text-primary">
            <Info size={32} />
          </div>
          
          {/* Messaggio Dinamico */}
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
            {message}
          </p>

          {/* Bottone di chiusura */}
          <button
            onClick={onClose}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
          >
            Continua
          </button>
        </div>

        {/* Tasto X in alto a destra */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-gray-400 hover:text-current transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Overlay cliccabile per chiudere */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
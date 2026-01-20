import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Gift, X } from "lucide-react";

interface ReserveGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  giftName: string;
  isSubmitting: boolean;
}

export const ReserveGiftModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  giftName, 
  isSubmitting 
}: ReserveGiftModalProps) => {
  const noteRef = useRef<HTMLTextAreaElement>(null);

  // Scroll Lock: impedisce lo scroll della pagina quando la modale è aperta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Chiudi con il tasto ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-10000 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-[#1a1a1a] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200 relative"
      >
        {/* Tasto chiusura veloce */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift size={32} />
          </div>
          <h3 className="text-2xl font-black text-white leading-tight">
            Vuoi prenotare <span className="text-green-500">"{giftName}"</span>?
          </h3>
          <p className="text-sm text-white/50 mt-2">
            Gli altri utenti vedranno che il regalo è già stato scelto.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 ml-1">
            Messaggio per la lista (opzionale)
          </label>
          <textarea 
            ref={noteRef}
            rows={3}
            placeholder="Es: Ci penso io! 🎁"
            className="w-full p-4 rounded-2xl bg-white/5 border-2 border-white/5 focus:border-green-500 outline-none transition-all resize-none text-sm text-white"
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 rounded-2xl font-bold bg-white/5 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Annulla
          </button>
          <button 
            onClick={() => onConfirm(noteRef.current?.value || "")}
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-600/20 transition-transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Prenotazione..." : "Conferma"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
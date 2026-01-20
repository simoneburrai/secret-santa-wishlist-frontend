import { Gift, SquarePen, Trash2, ExternalLink, Link as LinkIcon, FileText} from "lucide-react";
import { useState } from "react";
import { giftService } from "../services/giftService";
import { ReserveGiftModal } from "./ReserveGiftModal";

interface GiftCardProps {
  gift: any;
  index: number;
  isEditMode: boolean;
  isOwner: boolean;
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export const GiftCard = ({ gift, index, isEditMode, isOwner, onUpdate, onRemove }: GiftCardProps) => {

    const [isOpenReserveMode, setIsOpenReserveMode] = useState(false);  
    const [isSubmitting, setIsSubmitting] = useState(false);

   const handleReserveConfirm = async (message: string) => {
        setIsSubmitting(true);
        try {
            await giftService.reserve(gift.id, message);
            // Aggiorna lo stato locale per nascondere il bottone e mostrare il blocco rosso
            onUpdate(index, "is_reserved", true);
            onUpdate(index, "reserve_message", message);
            setIsOpenReserveMode(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };



  return (
    <div className={`group flex flex-col sm:flex-row gap-6 p-6 rounded-4xl bg-white/5 border transition-all relative ${
      isEditMode ? 'border-secondary/40 shadow-inner ring-1 ring-secondary/20' : 'border-current/5 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1'
    }`}>
      
      {/* SEZIONE IMMAGINE */}
      <div className="w-full sm:w-40 h-40 shrink-0 relative overflow-hidden rounded-2xl bg-current/5 border border-current/10">
        {gift.image ? (
          <img 
            src={typeof gift.image === 'string' ? gift.image : URL.createObjectURL(gift.image)} 
            alt={gift.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <Gift size={48} />
          </div>
        )}
        
        {isEditMode ? (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <input 
              type="file" className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => onUpdate(index, "image", e.target.files ? e.target.files[0] : null)}
            />
            <SquarePen className="text-white" />
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase">
            Priorità {gift.priority}
          </div>
        )}
      </div>

      {/* SEZIONE INFO */}
      <div className="flex-1 flex flex-col gap-3 py-1">
        <div className="space-y-3">
          {isEditMode ? (
            <div className="flex flex-col gap-3">
              {/* Nome e Prezzo */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  className="text-xl font-bold flex-1 bg-white/10 border-b-2 border-secondary/30 outline-none p-1 focus:border-secondary transition-colors"
                  value={gift.name} 
                  onChange={(e) => onUpdate(index, "name", e.target.value)} 
                  placeholder="Cosa desideri?"
                />
                <div className="flex items-center gap-1">
                    <input 
                    type="number" 
                    className="text-xl font-black text-secondary w-24 bg-white/10 border-b-2 border-secondary/30 outline-none p-1 focus:border-secondary"
                    value={gift.price} 
                    onChange={(e) => onUpdate(index, "price", e.target.value)}
                    placeholder="0.00"
                    />
                    <span className="font-bold text-secondary">€</span>
                </div>
              </div>

              {/* Priorità e Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-current/5">
                    <span className="text-[10px] font-black opacity-50 uppercase">Priorità:</span>
                    <select 
                        className="bg-transparent outline-none text-sm font-bold flex-1"
                        value={gift.priority}
                        onChange={(e) => onUpdate(index, "priority", Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} className="text-black">Livello {n}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-current/5">
                    <LinkIcon size={14} className="opacity-50" />
                    <input 
                        className="bg-transparent outline-none text-xs flex-1"
                        placeholder="Link prodotto (Amazon, etc)"
                        value={gift.link || ""}
                        onChange={(e) => onUpdate(index, "link", e.target.value)}
                    />
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-current/5">
                <FileText size={14} className="opacity-50 mt-1" />
                <textarea 
                    className="bg-transparent outline-none text-sm italic flex-1 resize-none h-16"
                    placeholder="Aggiungi dettagli, taglia, colore..."
                    value={gift.notes || ""}
                    onChange={(e) => onUpdate(index, "notes", e.target.value)}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold opacity-90">{gift.name}</h3>
                <p className="text-2xl font-black text-secondary">{gift.price} €</p>
              </div>
              {gift.notes && (
                <p className="text-sm opacity-70 italic bg-current/5 p-3 rounded-2xl border-l-4 border-primary/30">
                    "{gift.notes}"
                </p>
              )}
            </>
          )}
        </div>

        {/* AZIONI (NON EDIT MODE) */}
        {!isEditMode && (
          <div className="mt-auto flex gap-2">
            {gift.link && (
              <a href={gift.link} target="_blank" rel="noreferrer" className="flex-1 btn-santa text-sm flex justify-center items-center gap-2 py-3">
                <ExternalLink size={16} /> Vedi Prodotto
              </a>
            )}
            {gift.isReserved && (
              <div className="mt-4 overflow-hidden rounded-3xl border border-red-500/30 bg-linear-to-br from-red-500/10 to-transparent backdrop-blur-md">
                  <div className="flex items-center gap-3 p-4 bg-red-500/5">
                      {/* Icona minimalista */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-500">
                          <Gift size={20} className="opacity-80" />
                      </div>
                      
                      <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-500/60">
                              Stato Lista
                          </span>
                          <span className="text-sm font-bold text-red-500">
                              Regalo già scelto
                          </span>
                      </div>
              </div>

                  {gift.reserveMessage && (
                      <div className="px-5 pb-5 pt-2">
                          <div className="relative rounded-2xl bg-black/20 p-4 border border-white/5">
                              {/* Virgolette decorative */}
                              <span className="absolute -top-2 -left-1 text-3xl font-serif text-red-500/20">"</span>
                              <p className="text-sm italic text-red-200/70 leading-relaxed relative z-10">
                                  {gift.reserveMessage}
                              </p>
                              <span className="absolute -bottom-5 -right-1 text-3xl font-serif text-red-500/20">"</span>
                          </div>
                      </div>
                  )}
              </div>
)}
            {!isOwner && !gift.isReserved && (
              <button onClick={()=>setIsOpenReserveMode(true)} className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Prenota Regalo
              </button>
            )}
          </div>
        )}
      </div>

      {/* TASTO ELIMINA REGALO */}
      {isEditMode && (
        <button 
          onClick={() => onRemove(index)}
          className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-20"
          title="Rimuovi regalo"
        >
          <Trash2 size={16} />
        </button>
      )}

      <ReserveGiftModal
                isOpen={isOpenReserveMode}
                onClose={() => setIsOpenReserveMode(false)}
                onConfirm={handleReserveConfirm}
                giftName={gift.name}
                isSubmitting={isSubmitting}
            />
    </div>
  );
};
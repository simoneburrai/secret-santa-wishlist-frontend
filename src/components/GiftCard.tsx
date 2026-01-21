import { Gift, SquarePen, Trash2, ExternalLink, Link as LinkIcon, FileText} from "lucide-react";
import { useState } from "react";
import { giftService } from "../services/giftService";
import { ReserveGiftModal } from "./ReserveGiftModal";
import { useLoading } from "../contexts/LoadingContext";
import PriorityBadge from "./PriorityBadge";
import { PRIORITY_LEVELS } from "../utils/priorityConstants";

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
    const {setIsLoading} = useLoading();

   const handleReserveConfirm = async (message: string) => {
        setIsSubmitting(true);
        setIsLoading(true, "Prenotazione regalo in corso");
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
            setIsLoading(false);
        }
    };



  return (
    <div className={`group flex flex-col sm:flex-row gap-6 p-6 rounded-4xl bg-white/5 border transition-all relative ${isEditMode ? 'border-secondary/40 shadow-inner ring-1 ring-secondary/20' : 'border-current/5 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1'
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
          <div className="absolute top-2 left-2 text-[10px] font-black px-2 py-1 rounded-lg uppercase">
            <PriorityBadge level={gift.priority} />
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
                  className={`text-xl font-bold flex-1 bg-white/10 border-b-2 outline-none p-1 transition-colors ${!gift.name || gift.name.trim() === ""
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-secondary/30 focus:border-secondary'
                    }`}
                  value={gift.name}
                  onChange={(e) => onUpdate(index, "name", e.target.value)}
                  placeholder="Cosa desideri? (Obbligatorio)"
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
                {/* Sezione Priorità */}
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-current/5">
                  <span className="text-[10px] font-black opacity-50 uppercase shrink-0">Priorità:</span>
                  <select
                    className={`bg-transparent outline-none text-sm font-bold flex-1 cursor-pointer ${PRIORITY_LEVELS[gift.priority]?.color || "text-current"
                      }`}
                    value={gift.priority}
                    onChange={(e) => onUpdate(index, "priority", Number(e.target.value))}
                  >
                    {Object.entries(PRIORITY_LEVELS).map(([val, { label }]) => (
                      <option key={val} value={val} className="text-black bg-white">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sezione Link */}
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-current/5">
                  <LinkIcon size={14} className="opacity-50 shrink-0" />
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
          <div className="mt-auto space-y-3">
            {/* Pulsanti principali: Link e Prenotazione */}
            <div className="flex flex-col sm:flex-row gap-2">
              {gift.link && (
                <a href={gift.link} target="_blank" rel="noreferrer" className="flex-1 btn-santa text-sm flex justify-center items-center gap-2 py-3">
                  <ExternalLink size={16} /> Vedi Prodotto
                </a>
              )}
              {!isOwner && !gift.isReserved && (
                <button onClick={() => setIsOpenReserveMode(true)} className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                  Prenota Regalo
                </button>
              )}
            </div>

            {/* Stato Prenotazione: appare solo se riservato */}
            {gift.isReserved && (
              <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-500">
                    <Gift size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-500/60 leading-none mb-1">
                      Stato Lista
                    </p>
                    <p className="text-sm font-bold text-red-500">
                      Regalo già scelto
                    </p>
                  </div>

                  {/* Note di chi ha prenotato */}
                  {gift.reserveMessage && (
                    <div className="max-w-[50%] bg-black/20 px-3 py-2 rounded-lg border border-white/5">
                      <p className="text-[11px] italic text-red-200/80 leading-tight">
                        {gift.reserveMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
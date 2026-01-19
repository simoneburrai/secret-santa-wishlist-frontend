import { Calendar, Check, Copy, GiftIcon, SquarePen, Trash2, UserIcon, X } from "lucide-react";

interface WishlistHeaderProps {
    wishlist: any;
    editData: any;
    isEditMode: boolean;
    isOwner: boolean;
    copied: boolean;
    setEditData: (data: any) => void;
    setIsEditMode: (value: boolean) => void;
    handleSaveChanges: () => Promise<void>;
    handleCopyLink: () => void;
    handleDelete: () => Promise<void>;
}

export default function WishlistHeader({
    wishlist,
    editData,
    isEditMode,
    isOwner,
    copied,
    setEditData,
    setIsEditMode,
    handleSaveChanges,
    handleCopyLink,
    handleDelete
}: WishlistHeaderProps) {
    return <header className="relative p-8 rounded-[2.5rem] bg-white/5 border-2 border-primary/20 backdrop-blur-md mb-10 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <GiftIcon size={200} className="rotate-12 text-primary" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-primary mb-2 opacity-80 uppercase tracking-widest text-xs font-black">
                            <Calendar size={14} /> Secret Santa
                        </div>
                        {isEditMode ? (
                            <input 
                                className="text-4xl md:text-5xl font-black bg-white/10 border-b-2 border-secondary/30 outline-none rounded px-2 w-full"
                                value={editData.name}
                                onChange={(e) => setEditData({...editData, name: e.target.value})}
                            />
                        ) : (
                            <h1 className="text-4xl md:text-5xl font-black text-current leading-tight">{wishlist.name}</h1>
                        )}
                        <p className="opacity-60 flex items-center gap-2 mt-2">
                            <UserIcon size={16} /> Creato da {wishlist.owner_name}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {/* Bottone Condividi sempre visibile */}
                        <button 
                            onClick={handleCopyLink}
                            className="flex items-center gap-2 bg-white/10 border border-current/10 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all font-bold backdrop-blur-sm"
                        >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy
                             size={18} />}
                            {copied ? "Copiato!" : "Condividi"}
                        </button>

                        {isOwner && (
                            <div className="flex gap-2">
                                {isEditMode ? (
                                    <>
                                        <button onClick={handleSaveChanges} className="btn-santa bg-green-600 hover:bg-green-700 flex items-center gap-2">
                                            <Check size={18} /> Salva
                                        </button>
                                        <button onClick={() => setIsEditMode(false)} className="px-6 py-3 rounded-2xl bg-white/10 border border-current/10 hover:bg-white/20">
                                            <X size={18} /> Annulla
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setIsEditMode(true)} className="btn-santa flex items-center gap-2">
                                            <SquarePen size={18} /> Edit Mode
                                        </button>
                                        <button 
                                            onClick={handleDelete}
                                            className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-2xl border border-red-500/20"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
}
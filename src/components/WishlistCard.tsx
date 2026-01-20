import { Gift, Trash2, ExternalLink, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import type { Wishlist } from "../types/wishlists";

interface WishlistCardProps {
    wishlist: Wishlist;
    isOwner: boolean;
    onDelete?: () => void;
    onRemoveFavorite?: (id: number) => Promise<void>;
}

export default function WishlistCard({ wishlist, isOwner, onDelete, onRemoveFavorite }: WishlistCardProps) {
    return (
        <div className="group relative rounded-4xl bg-white/70 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isOwner ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-secondary/10 text-secondary'}`}>
                            <Gift size={28} />
                        </div>
                        <div>
                            <h4 className="font-black text-2xl text-gray-800 tracking-tight leading-tight uppercase">
                                {wishlist.name}
                            </h4>
                            <p className="text-xs font-bold text-gray-400 flex items-center gap-1 mt-1">
                                <User size={12} /> {isOwner ? "La tua lista" : `Di ${wishlist.owner_name || 'Amico'}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100/50">
                    {/* Link Unificato: Porta alla pagina dove l'owner può editare o l'amico visualizzare */}
                    <Link 
                        to={`/wishlists/view/${wishlist.share_token}`} 
                        className="group/link flex items-center gap-2 text-sm font-black uppercase tracking-tighter text-primary hover:text-primary-dark transition-colors"
                    >
                        <span>{isOwner ? "Visualizza / Edita" : "Apri Lista"}</span>
                        <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2">
                        {isOwner ? (
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete?.();
                                }}
                                className="p-3 text-gray-400 hover:text-red-500 transition-all rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100"
                                title="Elimina lista"
                            >
                                <Trash2 size={20} />
                            </button>
                        ) : (
                            onRemoveFavorite && (
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRemoveFavorite(wishlist.id);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                >
                                    <Heart size={16} className="fill-current" />
                                    Rimuovi
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
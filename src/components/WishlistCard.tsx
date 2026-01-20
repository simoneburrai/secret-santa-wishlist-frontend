import { Gift, SquarePen, Trash2, ExternalLink, Heart, User } from "lucide-react"; // Aggiunto Heart
import { Link } from "react-router-dom";
import type { Wishlist } from "../types/wishlists";

interface WishlistCardProps {
    wishlist: Wishlist;
    isOwner: boolean;
    onDelete?: () => void;
    onRemoveFavorite?: (id: number) => Promise<void>; // Prop opzionale
}


export default function WishlistCard({ wishlist, isOwner, onDelete, onRemoveFavorite }: WishlistCardProps) {
    return (
        <div className="group relative rounded-4xl bg-white/70 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden">
            
            {/* Decorazione di sfondo soffusa */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl shadow-inner ${isOwner ? 'bg-primary text-white' : 'bg-secondary/10 text-secondary'}`}>
                            <Gift size={28} className={isOwner ? "animate-pulse" : ""} />
                        </div>
                        <div>
                            <h4 className="font-black text-2xl text-gray-800 tracking-tight leading-none mb-1">
                                {wishlist.name}
                            </h4>
                            <p className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                <User size={12} /> {isOwner ? "Tua lista" : `Di ${wishlist.owner_name || 'Amico'}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100/50">
                    <Link 
                        to={`/wishlists/view/${wishlist.share_token}`} 
                        className="group/link flex items-center gap-2 text-sm font-black uppercase tracking-tighter text-primary hover:text-primary-dark transition-colors"
                    >
                        <span>Apri Lista</span>
                        <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2">
                        {isOwner ? (
                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-white">
                                    <SquarePen size={18} />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete?.();
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-white"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ) : (
                            onRemoveFavorite && (
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRemoveFavorite(wishlist.id);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
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
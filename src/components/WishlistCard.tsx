import { Gift, SquarePen, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Wishlist } from "../types/wishlists";

interface WishlistCardProps {
    wishlist: Wishlist;
    isOwner: boolean;
    onDelete?: () => void;
}

export default function WishlistCard({ wishlist, isOwner, onDelete }: WishlistCardProps) {
    return (
        <div className="rounded-2xl bg-white shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Gift size={24} />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800 leading-tight">{wishlist.name}</h4>
                </div>
            </div>

            <div className="flex justify-between items-center mt-2">
                {/* Link alla vista pubblica */}
                <Link 
                    to={`/wishlists/view/${wishlist.share_token}`} 
                    className="flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                >
                    <ExternalLink size={14} /> Visualizza
                </Link>

                <div className="flex gap-2">
                    {isOwner && (
                        <>
                            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors">
                                <SquarePen size={20} />
                            </button>
                            <button 
                                onClick={onDelete}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
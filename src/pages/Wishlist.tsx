import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { wishlistService } from "../services/wishlistService";
import { useAuth } from "../contexts/AuthContext";
import { SquarePen, Trash2, Heart, Gift } from "lucide-react";

export default function Wishlist() {
    const { token } = useParams<{ token: string }>();
    const { user } = useAuth(); // Recuperiamo l'utente loggato
    const navigate = useNavigate();
    
    const [wishlist, setWishlist] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (token) {
                    const data = await wishlistService.getPublicWishlist(token);
                    setWishlist(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, [token]);

    if (loading) return <div className="text-center p-10">Caricamento... ❄️</div>;
    if (!wishlist) return <div className="text-center p-10">Wishlist non trovata.</div>;

  
    const isOwner = user && Number(user.id) === Number(wishlist.owner_id);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-8 border-b-2 border-primary pb-4">
                <h1 className="text-4xl font-bold text-primary">{wishlist.name}</h1>
                
                <div className="flex gap-2">
                    {isOwner ? (
                        <>
                            {/* Se è il proprietario, mostra Edit e Delete */}
                            <button 
                                onClick={() => navigate(`/wishlists/edit/${wishlist.id}`)}
                                className="btn-santa flex items-center gap-2"
                            >
                                <SquarePen size={20} /> Modifica
                            </button>
                            <button 
                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                                onClick={() => {/* logica delete */}}
                            >
                                <Trash2 size={24} />
                            </button>
                        </>
                    ) : (
                        /* Se è un visitatore, mostra il tasto "Aggiungi ai Preferiti" */
                        <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl hover:opacity-90">
                            <Heart size={20} /> Salva nei Preferiti
                        </button>
                    )}
                </div>
            </div>

            {/* Lista dei Regali */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlist.gifts.map((gift: any) => (
                    <div key={gift.id} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex gap-4">
                        {gift.image && (
                            <img src={gift.image} alt={gift.name} className="w-24 h-24 object-cover rounded-xl" />
                        )}
                        <div className="flex-1">
                            <h3 className="font-bold text-xl">{gift.name}</h3>
                            <p className="text-secondary font-semibold">{gift.price} €</p>
                            {gift.link && (
                                <a href={gift.link} target="_blank" className="text-xs text-blue-500 underline">Link al regalo</a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
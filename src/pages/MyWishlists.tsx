import { CandyCane, Heart } from "lucide-react";
import { useState, useEffect, type JSX } from "react";
import type { Wishlist } from "../types/wishlists";
import { wishlistService } from "../services/wishlistService";
import {useNavigate } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
import { useLoading } from "../contexts/LoadingContext";

export default function MyWishlists(): JSX.Element {
    const [myWishlists, setMyWishlists] = useState<Wishlist[]>([]);
    const [favorites, setFavorites] = useState<Wishlist[]>([]);
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true, "Caricamento Wishlist in corso");
            try {
                const data = await wishlistService.getMyWishlists();
                setMyWishlists(data.wishlists);
                setFavorites(data.favorites);
            } catch (error) {
                console.error("Errore nel caricamento delle liste:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Sei sicuro di voler eliminare questa wishlist?")) return;
        setIsLoading(true, "Rimozione in corso")
        try {
            await wishlistService.deleteWishlist(id);
            setMyWishlists(prev => prev.filter(w => w.id !== id));
        } catch (error) {
            alert("Errore durante l'eliminazione");
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row flex-1 gap-6 p-4">
            {/* --- SEZIONE MIE WISHLIST --- */}
            <div className="flex-2 border-4 rounded-3xl border-primary p-4 bg-white/5 backdrop-blur-sm">
                <h2 className="font-bold text-3xl md:text-4xl text-primary text-center mb-6">
                    My wishlists <CandyCane className="inline ml-2" />
                </h2>
                
                {myWishlists.length === 0 ? (
                    <div className="text-center p-10">
                        <div className="opacity-60 italic">Non hai ancora creato nessuna lista.</div>
                        <button onClick={()=>navigate("/wishlists/create")}
                        className="m-2 btn-santa">Crea</button></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {myWishlists.map((w) => (
                            <WishlistCard 
                                key={w.id} 
                                wishlist={w} 
                                isOwner={true} 
                                onDelete={() => handleDelete(w.id)} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* --- SEZIONE PREFERITI --- */}
            <div className="flex-1 border-4 rounded-3xl border-secondary p-4 bg-white/5 backdrop-blur-sm">
                <h2 className="font-bold text-3xl text-secondary text-center mb-6">
                    Favorites <Heart className="inline ml-2 fill-secondary" />
                </h2>
                <div className="flex flex-col gap-4">
                    {favorites.length === 0 ? (
                         <div className="text-center p-10 opacity-60 italic text-sm">Nessun preferito salvato.</div>
                    ) : (
                        favorites.map((w) => (
                            <WishlistCard key={w.id} wishlist={w} isOwner={false} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}




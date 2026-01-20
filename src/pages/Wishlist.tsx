import { GiftCard } from "../components/GiftCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { wishlistService } from "../services/wishlistService";
import WishlistHeader from "../components/WishlistHeader";
import { Plus } from "lucide-react";
import { useLoading } from "../contexts/LoadingContext";

export default function Wishlist() {
    const { token } = useParams<{ token: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    
    const [wishlist, setWishlist] = useState<any>(null);
    const [editData, setEditData] = useState<any>(null);
    const  {setIsLoading} = useLoading();
    const [isEditMode, setIsEditMode] = useState(false);
    const [copied, setCopied] = useState(false);



    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setIsLoading(true, "Caricamento Wishlist in Corso");
                if (token) {
                    const data = await wishlistService.getPublicWishlist(token);
                    setWishlist(data);
                    setIsFavorite(data.is_favorite);
                    setEditData(JSON.parse(JSON.stringify(data)));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWishlist();
    }, [token]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        if (!window.confirm("Sei sicuro? Questa azione eliminerà l'intera lista.")) return;
        try {

            await wishlistService.deleteWishlist(wishlist.id);
            navigate("/wishlists/me");
        } catch (err) { alert("Errore durante l'eliminazione"); }
    };

    const addGift = () => {
        const newGift = { name: "", price: 0, priority: 3, notes: "", link: "", image: null };
        setEditData({ ...editData, gifts: [...editData.gifts, newGift] });
    };

    const updateGift = (index: number, field: string, value: any) => {
        const newGifts = [...editData.gifts];
        newGifts[index] = { ...newGifts[index], [field]: value };
        setEditData({ ...editData, gifts: newGifts });
    };

    const removeGift = (index: number) => {
        const newGifts = editData.gifts.filter((_: any, i: number) => i !== index);
        setEditData({ ...editData, gifts: newGifts });
    };

    const handleSaveChanges = async () => {
    try {
        setIsLoading(true, "Aggiornamento Wishlist in Corso");
        const formData = new FormData();
        
        // 1. Aggiungiamo il nome della wishlist
        formData.append("name", editData.name);

        // 2. Prepariamo i regali pulendo i path delle immagini esistenti
        const sanitizedGifts = editData.gifts.map((g: any) => {
            let imagePath = g.image_url || g.image;

            // Se l'immagine è una stringa (URL), rimuoviamo il dominio 
            // per salvare nel DB solo "uploads/nomefile.jpg"
            if (typeof imagePath === "string" && imagePath.includes('/uploads/')) {
                imagePath = imagePath.split('/uploads/')[1];
                imagePath = `uploads/${imagePath}`;
            }

            return {
                id: g.id || null,
                name: g.name,
                price: g.price,
                priority: g.priority,
                link: g.link,
                notes: g.notes,
                image_url: typeof imagePath === "string" ? imagePath : null
            };
        });

        // Aggiungiamo la stringa JSON dei regali
        formData.append("gifts", JSON.stringify(sanitizedGifts));

        // 3. Aggiungiamo i FILE REALI (Blob/File) se presenti
        editData.gifts.forEach((gift: any, index: number) => {
            if (gift.image instanceof File) {
                formData.append(`gift_image_${index}`, gift.image);
            }
        });

        // 4. Invio al service (che ora riceve il formData)
        await wishlistService.updateWishlist(wishlist.id, formData);
        
        // 5. Refresh dei dati per allineare lo stato locale con il DB
        const updatedWishlist = await wishlistService.getPublicWishlist(token!);
        setWishlist(updatedWishlist);
        setEditData(JSON.parse(JSON.stringify(updatedWishlist)));
        setIsEditMode(false);
        
        alert("Lista aggiornata con successo! 🎁");
    } catch (err) {
        console.error("Errore salvataggio:", err);
        alert("Si è verificato un errore durante il salvataggio.");
    }finally {
        setIsLoading(false);
    }
};

    if (!wishlist) return <div className="text-center p-20 opacity-60">Non trovata.</div>;

    const isOwner = user && wishlist && String(user.id) === String(wishlist.owner_id);
    const displayGifts = isEditMode ? editData.gifts : wishlist.gifts;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            {/* --- HEADER --- */}
            <WishlistHeader
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            wishlist={wishlist}
            editData={editData}
            isEditMode={isEditMode}
            isOwner={isOwner}
            copied={copied}
            setEditData={setEditData}
            setIsEditMode={setIsEditMode}
            handleSaveChanges={handleSaveChanges}
            handleCopyLink={handleCopyLink}
            handleDelete={handleDelete}
        />

            {/* --- LISTA --- */}
            <div className="grid grid-cols-1 mb-10">
                {displayGifts.map((gift: any, index: number) => (
                    <GiftCard
                        key={gift.id || index}
                        gift={gift}
                        index={index}
                        isEditMode={isEditMode}
                        isOwner={isOwner}
                        onUpdate={updateGift}
                        onRemove={removeGift}
                    />
                ))}
            </div>

            {/* --- AZIONI IN FONDO --- */}
            {isEditMode && (
                <button 
                    onClick={addGift}
                    className="w-full p-8 rounded-4xl border-2 border-dashed border-primary/30 text-primary/60 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3 font-bold"
                >
                    <Plus size={24} /> Aggiungi un altro desiderio alla lista
                </button>
            )}
        </div>
    );
}
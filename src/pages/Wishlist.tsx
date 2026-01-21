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
        // 1. Validazione Nome Wishlist (quella che hai già intuito)
        if (!editData.name || editData.name.trim() === "") {
            alert("Il nome della wishlist è obbligatorio!");
            return;
        }

        // 2. Validazione Regali: controlliamo che ogni regalo abbia almeno un nome
        const hasInvalidGifts = editData.gifts.some((g: any) => !g.name || g.name.trim() === "");
        
        if (hasInvalidGifts) {
            alert("Tutti i regali inseriti devono avere almeno un nome!");
            return;
        }

        setIsLoading(true, "Aggiornamento Wishlist in Corso");
        const formData = new FormData();
        formData.append("name", editData.name);

        // 3. Prepariamo i regali (Resto della logica invariata...)
        const sanitizedGifts = editData.gifts.map((g: any) => {
            // ... tua logica esistente per le immagini ...
            return {
                id: g.id || null,
                name: g.name.trim(), // Usiamo trim() per sicurezza
                price: g.price || 0,
                priority: g.priority || 3,
                link: g.link || "",
                notes: g.notes || "",
                image_url: g.image_url || null
            };
        });

        formData.append("gifts", JSON.stringify(sanitizedGifts));
        // ... invio dei file e chiamata al service ...

    } catch (err) {
        console.error("Errore salvataggio:", err);
        alert("Si è verificato un errore durante il salvataggio.");
    } finally {
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { wishlistService } from "../services/wishlistService";
import { Gift, PackageOpen } from "lucide-react";

export default function PublicWishlist() {
  // 1. Cattura il token dall'URL (es. /wishlists/public/:token)
  const { token } = useParams<{ token: string }>();
  
  const [wishlist, setWishlist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicData = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        // 2. Chiamata al servizio (che non richiede token JWT nell'header)
        const data = await wishlistService.getPublicWishlist(token);
        setWishlist(data);
      } catch (err: any) {
        setError(err.message || "Impossibile trovare questa wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, [token]);

  if (loading) return <div className="text-center mt-20 text-white">Caricamento regali... 🎁</div>;
  if (error) return <div className="text-center mt-20 text-primary font-bold">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black text-primary flex items-center justify-center gap-3">
          <PackageOpen size={40} /> {wishlist?.name}
        </h1>
        <p className="text-gray-600 mt-2">Ecco cosa vorrebbe ricevere il tuo amico!</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {wishlist?.gifts.map((gift: any, index: number) => (
          <div key={index} className="bg-white p-6 rounded-3xl shadow-xl border-2 border-primary/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{gift.name}</h3>
              {gift.price && <p className="text-primary font-bold">{gift.price} €</p>}
              {gift.notes && <p className="text-sm text-gray-500 mt-2 italic">"{gift.notes}"</p>}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${gift.priority === 1 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                Priorità: {gift.priority}
              </span>
              {gift.link && (
                <a 
                  href={gift.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-secondary font-bold hover:underline"
                >
                  Vedi link <Gift size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
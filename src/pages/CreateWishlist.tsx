import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Gift, Save, Image as ImageIcon, FileText } from "lucide-react";
import { wishlistService } from "../services/wishlistService";

export default function CreateWishlist() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gifts, setGifts] = useState([
    { name: "", price: "", priority: 3, link: "", notes: "", image: null as File | null }
  ]);
  const [error, setError] = useState("");

  const addGiftField = () => {
    setGifts([...gifts, { name: "", price: "", priority: 3, link: "", notes: "", image: null }]);
  };

  const removeGiftField = (index: number) => {
    setGifts(gifts.filter((_, i) => i !== index));
  };

  const handleGiftChange = (index: number, field: string, value: any) => {
    const updatedGifts = [...gifts];
    updatedGifts[index] = { ...updatedGifts[index], [field]: value };
    setGifts(updatedGifts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gifts", JSON.stringify(gifts.map(gift => ({
        name: gift.name,
        price: gift.price,
        priority: gift.priority,
        link: gift.link,
        notes: gift.notes
    }))));

    gifts.forEach((gift, index) => {
        if (gift.image) {
            formData.append(`gift_image_${index}`, gift.image);
        }
    });

    try {
        await wishlistService.createWishlist(formData);
        navigate("/wishlists/me");
    } catch (err: any) {
        setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black text-primary mb-8 flex items-center gap-2">
        <Gift size={32} /> Crea la tua Lista dei Desideri
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* TITOLO WISHLIST */}
        <div className="p-6 rounded-3xl shadow-lg border-2 border-primary/20 bg-white/5 backdrop-blur-sm">
          <label className="font-bold block mb-2 uppercase text-xs tracking-widest opacity-80">
            Titolo Wishlist *
          </label>
          <input
            type="text"
            className="w-full p-4 rounded-xl border-2 border-primary/10 focus:border-primary outline-none text-lg bg-transparent transition-all"
            placeholder="Es: Lista di Natale"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold px-2 opacity-90">I Regali</h2>
          
          {gifts.map((gift, index) => (
            <div key={index} className="p-6 rounded-3xl shadow-md border border-primary/10 bg-white/5 backdrop-blur-sm flex flex-col gap-4 relative">
              <div className="flex justify-between items-center border-b pb-3 border-primary/10">
                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full">
                  REGALO #{index + 1}
                </span>
                {gifts.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeGiftField(index)} 
                    className="text-red-500/70 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold uppercase opacity-60">Nome Regalo *</label>
                  <input
                    type="text"
                    className="w-full p-2 border-b-2 border-primary/10 focus:border-secondary outline-none font-bold bg-transparent text-current"
                    value={gift.name}
                    onChange={(e) => handleGiftChange(index, "name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase opacity-60">Prezzo *</label>
                  <input
                    type="number"
                    className="w-full p-2 border-b-2 border-primary/10 focus:border-secondary outline-none bg-transparent text-current"
                    value={gift.price}
                    onChange={(e) => handleGiftChange(index, "price", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold uppercase opacity-60">Link Prodotto (Opzionale)</label>
                  <input
                    type="text"
                    className="w-full p-2 border-b-2 border-primary/10 focus:border-secondary outline-none text-sm bg-transparent"
                    value={gift.link}
                    onChange={(e) => handleGiftChange(index, "link", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase opacity-60">Priorità *</label>
                  <select
                    className="w-full p-2 border-b-2 border-primary/10 focus:border-secondary outline-none bg-transparent font-medium"
                    value={gift.priority}
                    onChange={(e) => handleGiftChange(index, "priority", Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n} className="bg-white dark:bg-gray-800">
                        Priorità {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="opacity-40" />
                  <input
                    type="text"
                    placeholder="Note (Opzionale)"
                    className="w-full p-2 border-b-2 border-primary/10 focus:border-secondary outline-none text-sm italic bg-transparent"
                    value={gift.notes}
                    onChange={(e) => handleGiftChange(index, "notes", e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon size={18} className="opacity-40" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold opacity-60">Immagine (Opzionale)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-xs opacity-80"
                      onChange={(e) => handleGiftChange(index, "image", e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addGiftField}
            className="flex items-center justify-center gap-2 p-5 rounded-3xl border-2 border-dashed border-primary/20 text-current opacity-60 hover:opacity-100 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Plus /> Aggiungi un altro desiderio
          </button>
        </div>

        {error && <p className="text-white bg-primary p-4 rounded-2xl text-center font-bold animate-pulse">{error}</p>}

        <button type="submit" className="btn-santa w-full py-5 text-xl font-black shadow-2xl flex items-center justify-center gap-3">
          <Save size={24} /> PUBBLICA LA MIA LISTA
        </button>
      </form>
    </div>
  );
}
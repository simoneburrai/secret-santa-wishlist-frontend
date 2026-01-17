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
    
    if (!name.trim()) return setError("Il titolo della wishlist è obbligatorio");
    
    for (const [index, gift] of gifts.entries()) {
      if (!gift.name.trim()) return setError(`Il nome del regalo #${index + 1} è obbligatorio`);
      if (!gift.price) return setError(`Il prezzo del regalo #${index + 1} è obbligatorio`);
    }

    const formData = new FormData();
    formData.append("name", name);

    gifts.forEach((gift, index) => {
      formData.append(`gifts[${index}][name]`, gift.name);
      formData.append(`gifts[${index}][price]`, gift.price);
      formData.append(`gifts[${index}][priority]`, String(gift.priority));
      
      if (gift.link) formData.append(`gifts[${index}][link]`, gift.link);
      if (gift.notes) formData.append(`gifts[${index}][notes]`, gift.notes);
      if (gift.image) formData.append("images", gift.image); 
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
        <div className="p-6 rounded-3xl shadow-lg border-2 border-primary/10">
          <label className="font-bold text-gray-700 block mb-2 uppercase text-xs tracking-widest">Titolo Wishlist *</label>
          <input
            type="text"
            className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-primary outline-none text-lg bg-transparent"
            placeholder="Es: Lista di Natale"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-gray-800 px-2">I Regali</h2>
          
          {gifts.map((gift, index) => (
            <div key={index} className="p-6 rounded-3xl shadow-md border border-gray-100 flex flex-col gap-4 relative">
              <div className="flex justify-between items-center border-b pb-3 border-gray-50">
                <span className="bg-primary text-white text-xs font-black px-3 py-1 rounded-full">REGALO #{index + 1}</span>
                {gifts.length > 1 && (
                  <button type="button" onClick={() => removeGiftField(index)} className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full">
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Nome Regalo *</label>
                  <input
                    type="text"
                    className="w-full p-2 border-b-2 border-gray-100 focus:border-secondary outline-none font-bold text-gray-800 bg-transparent"
                    value={gift.name}
                    onChange={(e) => handleGiftChange(index, "name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Prezzo *</label>
                  <input
                    type="number"
                    className="w-full p-2 border-b-2 border-gray-100 focus:border-secondary outline-none bg-transparent"
                    value={gift.price}
                    onChange={(e) => handleGiftChange(index, "price", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Link Prodotto (Opzionale)</label>
                  <input
                    type="text"
                    className="w-full p-2 border-b-2 border-gray-100 focus:border-secondary outline-none text-sm bg-transparent"
                    value={gift.link}
                    onChange={(e) => handleGiftChange(index, "link", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Priorità *</label>
                  <select
                    className="w-full p-2 border-b-2 border-gray-100 focus:border-secondary outline-none bg-transparent font-medium"
                    value={gift.priority}
                    onChange={(e) => handleGiftChange(index, "priority", Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>Priorità {n}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Note (Opzionale)"
                    className="w-full p-2 border-b-2 border-gray-100 focus:border-secondary outline-none text-sm italic bg-transparent"
                    value={gift.notes}
                    onChange={(e) => handleGiftChange(index, "notes", e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon size={18} className="text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Immagine (Opzionale)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-xs"
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
            className="flex items-center justify-center gap-2 p-5 rounded-3xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-primary hover:text-primary transition-all"
          >
            <Plus /> Aggiungi un altro desiderio
          </button>
        </div>

        {error && <p className="text-white bg-primary p-4 rounded-2xl text-center font-bold animate-bounce">{error}</p>}

        <button type="submit" className="btn-santa w-full py-5 text-xl font-black shadow-2xl flex items-center justify-center gap-3">
          <Save size={24} /> PUBBLICA LA MIA LISTA
        </button>
      </form>
    </div>
  );
}
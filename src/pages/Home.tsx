import { Gift, Share2, MousePointerClick, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";
import StepCard from "../components/StepCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-10">
      {/* --- HERO SECTION --- */}
      <section className="text-center flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-black text-primary animate-bounce-slow">
          Organizza il tuo <br /> Secret Santa 🎄
        </h1>
        <p className="text-xl max-w-2xl opacity-80 font-medium">
          Crea la tua lista dei desideri, condividila con gli amici e rendi lo scambio dei regali magico e senza stress.
        </p>
        <NavLink to="/wishlists/create" className="btn-santa text-lg px-10 py-4 shadow-2xl">
          Inizia Ora
        </NavLink>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <StepCard 
          icon={<MousePointerClick size={40} />}
          title="Crea la Lista"
          desc="Aggiungi i regali che sogni di ricevere con link, foto e prezzi."
          step="1"
        />
        <StepCard 
          icon={<Share2 size={40} />}
          title="Condividi il Link"
          desc="Invia il link privato della tua wishlist ad amici o parenti."
          step="2"
        />
        <StepCard 
          icon={<Gift size={40} />}
          title="Ricevi Sorprese"
          desc="I tuoi amici prenotano i regali (restando anonimi!) e tu ricevi ciò che ami."
          step="3"
        />
      </section>

      {/* --- FEATURES MINI-SECTION --- */}
      <div className="bg-secondary/5 dark:bg-secondary/10 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto border border-secondary/20 backdrop-blur-sm">
  <div className="flex-1 space-y-6">
    <div className="space-y-2">
      <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
        Lo spirito del regalo, <br />senza complicazioni.
      </h2>
      <p className="text-lg opacity-80 italic">
        "Perché a Natale l'unica sorpresa deve essere l'emozione, non un doppione."
      </p>
    </div>

    <ul className="space-y-5">
      <li className="flex items-start gap-4">
        <div className="mt-1 bg-primary/20 p-1.5 rounded-lg">
          <Heart className="text-primary" size={18} fill="currentColor" />
        </div>
        <div>
          <span className="font-bold block text-primary">Liste Pensate con Amore</span>
          <span className="text-sm opacity-75">Crea uno spazio dedicato ai tuoi desideri e a quelli delle persone che contano davvero.</span>
        </div>
      </li>

      <li className="flex items-start gap-4">
        <div className="mt-1 bg-primary/20 p-1.5 rounded-lg">
          <Heart className="text-primary" size={18} fill="currentColor" />
        </div>
        <div>
          <span className="font-bold block text-primary">Sincronia Perfetta</span>
          <span className="text-sm opacity-75">Tutti sanno cosa manca, ma nessuno sa chi lo ha preso. La magia della sorpresa rimane intatta.</span>
        </div>
      </li>

      <li className="flex items-start gap-4">
        <div className="mt-1 bg-primary/20 p-1.5 rounded-lg">
          <Heart className="text-primary" size={18} fill="currentColor" />
        </div>
        <div>
          <span className="font-bold block text-primary">Libertà e Semplicità</span>
          <span className="text-sm opacity-75">Nessun catalogo obbligatorio: aggiungi link da qualsiasi negozio o descrivi il tuo regalo ideale.</span>
        </div>
      </li>
    </ul>
  </div>

  {/* Icona con un piccolo effetto di galleggiamento */}
  <div className="text-8xl md:text-9xl animate-bounce-slow drop-shadow-2xl select-none">
    🎁
  </div>
</div>
    </div>
  );
}


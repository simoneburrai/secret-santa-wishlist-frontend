import type { JSX } from "react";
import { Link } from "react-router-dom";
import { Gift, Home, Search } from "lucide-react";

export default function NotFound(): JSX.Element {
    return (
        <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Elementi decorativi di sfondo (Sfumature natalizie) */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-md w-full text-center space-y-8">
                {/* Icona Centrale con Effetto Glass */}
                <div className="relative inline-block">
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <Gift size={80} className="text-primary animate-bounce" />
                        <div className="absolute -top-2 -right-2 bg-secondary p-2 rounded-full shadow-lg">
                            <Search size={20} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Testo 404 */}
                <div className="space-y-2">
                    <h1 className="text-8xl font-black tracking-tighter text-white/20">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Regalo Smarrito!
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Sembra che Babbo Natale abbia perso l'indirizzo di questa pagina. Forse è stata spostata o non è mai esistita.
                    </p>
                </div>

                {/* Bottone d'azione */}
                <div className="pt-4">
                    <Link 
                        to="/" 
                        className="btn-santa group inline-flex items-center gap-3 px-8 py-4 text-lg"
                    >
                        <Home size={20} className="group-hover:-translate-y-1 transition-transform" />
                        Torna alla Home
                    </Link>
                </div>

                {/* Footerino ironico */}
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-300">
                    Secret Santa Wishlist Project
                </p>
            </div>
        </div>
    );
}
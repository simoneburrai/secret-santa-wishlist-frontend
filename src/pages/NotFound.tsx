import type { JSX } from "react";
import { Link } from "react-router-dom";
import { Gift, Home } from "lucide-react";

export default function NotFound(): JSX.Element {
    return (
        <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh]">
            <div className="max-w-md w-full text-center space-y-8">
                
                {/* Icona Centrale - Semplice e pulita */}
                <div className="flex justify-center">
                    <div className="p-8 rounded-[2.5rem] bg-current/5 border border-current/10 backdrop-blur-md shadow-xl">
                        <Gift size={80} className="text-primary" />
                    </div>
                </div>

                {/* Testo 404 - Colori adattivi */}
                <div className="space-y-3">
                    <h1 className="text-8xl font-black tracking-tighter opacity-20 dark:text-white">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                        Pagina non trovata
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-4">
                        Il link che hai seguito potrebbe essere rotto o la pagina è stata rimossa.
                    </p>
                </div>

                {/* Bottone d'azione */}
                <div className="pt-4">
                    <Link 
                        to="/" 
                        className="btn-santa inline-flex items-center gap-3 px-10 py-4 text-lg"
                    >
                        <Home size={20} />
                        Torna alla Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
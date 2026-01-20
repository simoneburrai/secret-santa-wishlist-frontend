import type { JSX } from "react"
import { useTheme } from "../contexts/ThemeContext"
import {Moon, Sun } from "lucide-react" // Aggiungiamo qualche icona

export default function Settings(): JSX.Element {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="h-full flex flex-1 flex-col items-center p-4 md:p-10">
            {/* Titolo con gradiente e ombra */}
            <h1 className="text-5xl md:text-7xl font-black text-primary drop-shadow-2xl mb-10 tracking-tighter">
                Settings <span className="inline-block animate-spin-slow">⚙️</span>
            </h1>

            <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h2 className="text-3xl font-black text-secondary uppercase tracking-widest">Tema</h2>
                        <p className="text-current opacity-60 font-medium">Personalizza l'atmosfera della tua lista</p>
                    </div>

                    <div className="flex bg-black/20 p-2 rounded-2xl border border-white/5 gap-2">
                        {/* Bottone LIGHT */}
                        <button 
                            onClick={toggleTheme} 
                            disabled={theme === "light"}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                                theme === "light" 
                                ? "bg-white text-black shadow-xl scale-105" 
                                : "text-white/40 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <Sun size={18} />
                            <span>LIGHT</span>
                        </button>

                        {/* Bottone DARK */}
                        <button 
                            onClick={toggleTheme} 
                            disabled={theme === "dark"}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                                theme === "dark" 
                                ? "bg-secondary text-white shadow-xl scale-105" 
                                : "text-white/40 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <Moon size={18} />
                            <span>DARK</span>
                        </button>
                    </div>
                </div>

                {/* Un piccolo tocco decorativo in basso */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-[10px] uppercase font-black tracking-[0.3em] opacity-20">
                        Secret Santa Wishlist Tool • v1.0
                    </p>
                </div>
            </div>
        </div>
    )
}
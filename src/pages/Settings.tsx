import type { JSX } from "react"

import { useTheme } from "../contexts/ThemeContext"



export default function Settings() : JSX.Element{

    const {theme, toggleTheme} = useTheme();

    return <div className="h-full flex flex-1 flex-col items-center m-7">
        <h1 className="text-4xl md:text-6xl font-black text-primary animate-bounce-slow mb-5">Settings ⚙️</h1>
        <div className="border-2 rounded-3xl border-secondary/60 p-5 flex justify-between gap-5 items-center my-3">
            <div className="text-2xl font-bold">Scegli Il tema che preferisci!</div>
            <div>
                <button onClick={toggleTheme} disabled={theme === "light"} className="btn-christmas mx-2 border border-secondary bg-white text-black">LIGHT</button>
                <button onClick={toggleTheme} disabled={theme === "dark"} className="btn-christmas mx-2 border border-secondary bg-black text-white">DARK</button>
            </div>
            
        </div>
    </div>
}
import type { JSX } from "react"

import { useTheme } from "../contexts/ThemeContext"



export default function Settings() : JSX.Element{

    const {theme, toggleTheme} = useTheme();

    return <div>
        <h1>Settings</h1>
        <div>
            <button onClick={toggleTheme} disabled={theme === "light"} className="btn-christmas bg-xmas-text text-xmas-bg">LIGHT</button>
            <button onClick={toggleTheme} disabled={theme === "dark"} className="btn-forest"  >DARK</button>
        </div>
    </div>
}
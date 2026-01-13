import type { JSX } from "react"

import { useTheme } from "../contexts/ThemeContext"



export default function Settings() : JSX.Element{

    const {theme, toggleTheme} = useTheme();

    return <div>
        <h1>Settings</h1>
        <div>
            <button onClick={toggleTheme} disabled={theme === "light"} className="btn-xmas">LIGHT</button>
            <button onClick={toggleTheme} disabled={theme === "dark"} className="btn-primary"  >DARK</button>
        </div>
    </div>
}
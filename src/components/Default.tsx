import type { JSX } from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Default() :JSX.Element{
   return <>
    <header>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registrati</NavLink>
            <NavLink to="/wishlist/me">Le mie wishlist</NavLink>
            <button className="search-btn">
                🔍 Cerca Lista
            </button>
        </nav>
    </header>
    <main><Outlet/></main>
    <footer></footer>
    </>
}
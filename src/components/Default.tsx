import type { JSX } from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Default() :JSX.Element{
   return <>
    <header>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/settings">Settings</NavLink>
        </nav>
    </header>
    <main><Outlet/></main>
    <footer></footer>
    </>
}
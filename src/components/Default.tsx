import type { JSX } from "react"
import { NavLink, Outlet } from "react-router-dom"
import Footer from "./Footer"
import { Gift, LogIn, Search, Settings, UserPlus } from "lucide-react"

export default function Default() : JSX.Element {
   return (
    <div className="flex flex-col min-h-screen bg-xmas-bg text-xmas-text transition-colors duration-500">
        <header className="p-5 bg-primary shadow-md">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <div>            
                    <NavLink to="/">
                        <h3 className="text-2xl font-extrabold hover:scale-105 transition-transform">
                            🎅 Secret Santa Wishlist
                        </h3>
                    </NavLink>
                </div>
                <div className="flex font-bold gap-4">
                    <button className="nav-link"><Search /></button>
                    <NavLink className="nav-link flex gap-2" to="/wishlist/me"><Gift/> My Wishlists</NavLink>
                    <NavLink className="nav-link flex gap-2" to="/settings"><Settings/></NavLink>
                    <NavLink className="nav-link flex gap-2" to="/login"><LogIn /> Sign in</NavLink>
                    <NavLink className="nav-link flex gap-2" to="/register"><UserPlus/> Sign up</NavLink>
                </div>
            </nav>
        </header>
        <main className="flex-1 flex flex-col p-6">
            <Outlet />
        </main>

        <Footer />
    </div>
   )
}
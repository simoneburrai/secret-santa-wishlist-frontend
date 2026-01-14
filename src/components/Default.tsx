import type { JSX } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Gift, LogIn, Search, Settings, UserPlus } from "lucide-react"

export default function Default(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-xmas-bg text-xmas-text transition-colors duration-500">
      <header className="sticky top-0 z-50 p-5 bg-primary shadow-lg">
  
        <nav className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4 md:gap-0">
          
          <div className="text-center md:text-left">
            <NavLink to="/">
              <h3 className="text-xl sm:text-2xl font-extrabold hover:scale-105 transition-transform text-white">
                🎅 <span className="hidden sm:inline">Secret Santa Wishlist</span>
                <span className="sm:hidden text-lg">Secret Santa</span>
              </h3>
            </NavLink>
          </div>

          <div className="flex font-bold gap-3 sm:gap-6 items-center">
            
            <button className="nav-link text-white"><Search size={20}/></button>
            
            <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/wishlists/me">
              <Gift size={20}/> 
              <span className="hidden lg:block">My Wishlists</span>
            </NavLink>

            <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/settings">
              <Settings size={20}/> 
              <span className="hidden lg:block">Settings</span>
            </NavLink>

            <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/login">
              <LogIn size={20}/> 
              <span className="hidden lg:block">Sign in</span>
            </NavLink>

            <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/register">
              <UserPlus size={20}/> 
              <span className="hidden lg:block">Sign up</span>
            </NavLink>
            
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col p-6">
        <Outlet />
      </main>
    </div>
  );
}
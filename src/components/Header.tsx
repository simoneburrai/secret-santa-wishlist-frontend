import { NavLink } from "react-router-dom"
import { Gift, LogIn, LogOut, Search, UserPlus, Settings } from "lucide-react"
import type { JSX } from "react"
import { useAuth } from "../contexts/AuthContext"
 
export default function Header(): JSX.Element {

    const {isAuthenticated, logout} = useAuth();
    console.log("Header IsAuthenticated:", isAuthenticated);

    return <header className="sticky top-0 z-50 p-5 bg-primary shadow-lg">
  
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

            {isAuthenticated ?

              <>

              <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/wishlists/me">
              <Gift size={20}/> 
              <span className="hidden lg:block">My Wishlists</span>
              </NavLink>

              <button 
                onClick={logout} 
                className="nav-link flex items-center gap-1 md:gap-2 text-white hover:cursor-pointer"
              >
                <LogOut size={20}/> 
                <span className="hidden lg:block">Logout</span>
              </button>

              </>
            : <>
                <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/login">
                  <LogIn size={20}/> 
                  <span className="hidden lg:block">Sign in</span>
                </NavLink>

                <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/register">
                  <UserPlus size={20}/> 
                  <span className="hidden lg:block">Sign up</span>
                </NavLink>
            </>} 
            
            <button className="nav-link text-white"><Search size={20}/></button>
            
            

            <NavLink className="nav-link flex items-center gap-1 md:gap-2 text-white" to="/settings">
              <Settings size={20}/> 
              <span className="hidden lg:block">Settings</span>
            </NavLink>

           
            
          </div>
        </nav>
      </header>

}
 
import { NavLink, useNavigate } from "react-router-dom"
import { Gift, LogIn, LogOut, Search, UserPlus, Settings, FilePlus } from "lucide-react"
import { useState, type JSX } from "react"
import { useAuth } from "../contexts/AuthContext"
import SearchModal from "./SearchModal";
import InstallPWA from "./InstallPWA";
 
export default function Header(): JSX.Element {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
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

                {/* 2. AZIONI E NAVIGAZIONE */}
                <div className="flex font-bold gap-3 sm:gap-5 items-center">
                    
                    {/* Link "My Wishlists" visibile solo se loggato - Navigazione Core */}
                    {isAuthenticated && (<>
                        <NavLink className="nav-link flex items-center gap-2 text-white border-r border-white/20 pr-4 mr-1" to="/wishlists/me">
                            <Gift size={20}/> 
                            <span className="hidden lg:block">My Wishlists</span>
                        </NavLink>
                         <NavLink className="nav-link flex items-center gap-2 text-white border-r border-white/20 pr-4 mr-1" to="/wishlists/create">
                            <FilePlus size={20}/> 
                            <span className="hidden lg:block">Create Wishlist</span>
                        </NavLink>
                    </>)}

                    {/* Utilità: Search & Settings sempre visibili o raggruppate */}
                    <div className="flex items-center gap-3">
                        <button onClick={()=>setIsOpen(true)} className="nav-link text-white p-2 hover:bg-white/10 rounded-full transition-colors" title="Search">
                            <Search size={20}/>
                        </button>
                        <NavLink className="nav-link text-white p-2 hover:bg-white/10 rounded-full transition-colors" to="/settings" title="Settings">
                            <Settings size={20}/>
                        </NavLink>
                        <InstallPWA />
                    </div>

                    {/* 3. AREA ACCOUNT (Estrema Destra) */}
                    <div className="flex items-center gap-2 ml-2 pl-4 border-l border-white/20">
                        {isAuthenticated ? (
                            <button 
                                onClick={()=>{
                                  logout();
                                  navigate("/");
                                }} 
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white transition-all active:scale-95"
                            >
                                <LogOut size={18}/> 
                                <span className="hidden sm:block text-sm">Logout</span>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <NavLink className="text-white hover:underline text-sm px-2" to="/login">
                                   <LogIn size={18}/>  Sign in
                                </NavLink>
                                <NavLink className="bg-white text-primary px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-md" to="/register">
                                    <UserPlus size={18}/> Sign up
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <SearchModal
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)} 
            />
        </header>
    );
}
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MyWihslists from "./pages/MyWishlists";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateWishlist from "./pages/CreateWishlist";
import Wishlist from "./pages/Wishlist";
import Default from "./components/Default";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {

  return <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default/>}>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/wishlists/view/:token" element={<Wishlist/>}/>
          <Route path="/wishlists/me" element={<MyWihslists/>}/>
          <Route path="/wishlists/create" element={<CreateWishlist />} />
          <Route path="/wishlists/me/:id" element={<Wishlist/>}/>
          <Route path="/*" element={<NotFound/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
  </ThemeProvider>
}

export default App

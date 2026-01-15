import { CandyCane, Heart, SquarePen, Trash2 } from "lucide-react"
import { useState, type JSX } from "react"
import type { Wishlist } from "../types/wishlists"

export default function MyWihslists() : JSX.Element{

    const [wishlists, setWishlists] = useState<Wishlist[]>([]);

    return <div className="flex flex-1 gap-3">
        <div className="flex-2 border-4 rounded-3xl border-primary">
            <h2 className="font-bold text-4xl text-primary text-center m-3 ">My wishlists <CandyCane className="inline" /></h2>
            <div className="card-container">
               { wishlists.map((w : Wishlist) => <WishlistCard key={w.id} wishlist={w}/>)};
            </div>
        </div>
        <div className="flex-1 w-[40%] border-4 rounded-3xl border-primary">
            <h2 className="font-bold text-4xl text-primary text-center m-3">Favorites <Heart className="inline"/></h2>
        </div>
        </div>
}


interface WishlistCardProps {
    wishlist: Wishlist;
}

function WishlistCard ({ wishlist }: WishlistCardProps){
    return <div className="rounded-2xl bg-secondary/50">
        <h4>{wishlist.name}</h4>
        <div>
            <button><SquarePen /></button>
            <button><Trash2 /></button>
        </div>
        
    </div>
}
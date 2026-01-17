 interface Wishlist {
    id: number;
    name: string;
    user_id: number;
    share_token: string; // <-- Aggiungi questa riga
    is_published: boolean;
    created_at?: string;
    gifts?: Gift[]; 
}

interface User {
    email: string,
    id: string
    password?: string
}
type Priority  = 1 | 2 | 3 | 4 | 5;

interface Gift {
    name: string,
    image?: string,
    link?: string,
    price: number,
    priority: Priority
    notes?: string
};

interface FullWishlist extends Wishlist {
    gifts: Gift[]
}

export type {
    Wishlist,
    FullWishlist,
    Priority,
    Gift,
    User
}
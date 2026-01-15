interface Wishlist {
    id: number,
    name: string,
    userId: number
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
    Gift
}
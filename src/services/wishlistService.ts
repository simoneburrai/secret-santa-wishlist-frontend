import apiClient from "../api/apiClient";
import axios from "axios";

// Helper per gestire gli errori (puoi spostarlo in un file utils se preferisci)
const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.msg || "Errore di comunicazione con il server";
        throw new Error(serverMessage);
    }
    throw new Error("Errore imprevisto");
};

export const wishlistService = {

    getMyWishlists: async () => {
        try {
            const { data } = await apiClient.get("/wishlists/me");
            return data; 
        } catch (error) {
            handleApiError(error);
        }
    },


    createWishlist: async (wishlistData: { name: string; gifts: any[] }) => {
        try {
            const { data } = await apiClient.post("/wishlists", wishlistData);
            return data;
        } catch (error) {
            handleApiError(error);
        }
    },


    deleteWishlist: async (id: number) => {
        try {
            const { data } = await apiClient.delete(`/wishlists/${id}`);
            return data;
        } catch (error) {
            handleApiError(error);
        }
    },


    updateWishlist: async (id: number, wishlistData: { name: string; gifts: any[] }) => {
        try {
            const { data } = await apiClient.put(`/wishlists/${id}`, wishlistData);
            return data;
        } catch (error) {
            handleApiError(error);
        }
    },


    getPublicWishlist: async (token: string) => {
        try {
            const { data } = await apiClient.get(`/wishlists/public/${token}`);
            return data;
        } catch (error) {
            handleApiError(error);
        }
    },


    addFavorite: async (wishlistId: number) => {
        try {
      
            const { data } = await apiClient.post("/wishlists/favorites", { wishlistId });
            return data;
        } catch (error) {
            handleApiError(error);
        }
    }
};
import axios from "axios";
import apiClient from "../api/apiClient";

// Aggiungiamo ': never' perché questa funzione lancia sempre un'eccezione
const catchFunction = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.msg || "Errore di connessione al server";
        throw new Error(serverMessage);
    }

    if (error instanceof Error) {
        throw error;
    }
    
    throw new Error("Si è verificato un errore inaspettato");
}

const wishlistService = {
    getByUserId: async (userId: number) => {
        try {
            const { data } = await apiClient.get(`/whislists/me/${userId}`);
      
            if (!data) {
                throw new Error(data.msg || "Errore sconosciuto");
            }
            return data.user;
        } catch (error) {
            catchFunction(error);
        }
    },
    getByToken: async (token: string) => {
        try {
            const { data } = await apiClient.get(`/wishlists/public/${token}`);
      
            if (!data.name) {
                throw new Error(data.msg || "Errore sconosciuto");
            }
            return data.user;
        } catch (error) {
            catchFunction(error);
        }
    }
}

export default wishlistService;
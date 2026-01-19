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

export const giftService = {

    
    reserve: async (id: number, note: string) => { 
        try {
            const { data } = await apiClient.patch(`/gifts/${id}`, { 
                reserveMessage: note ,
            });
            return data;
        } catch (error) {
            handleApiError(error);
        }
    },


};
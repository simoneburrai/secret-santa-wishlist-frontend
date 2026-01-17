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

const authService = {
    login: async (credentials: {email: string, password: string}) => {
    try {
        // Tipizziamo la risposta includendo il token
        const { data } = await apiClient.post<{ user: any, token: string, msg?: string }>("/login", credentials);
  
        if (!data.user || !data.token) {
            throw new Error(data.msg || "Dati ricevuti incompleti");
        }
        return data; // Restituiamo tutto l'oggetto { user, token }
    } catch (error) {
        catchFunction(error);
    }
},
    register: async (credentials: {name: string, email: string, password: string}) => {
    try {
        const { data } = await apiClient.post<{ user: any, token?: string, msg?: string }>("/register", credentials);
  
        if (!data.user) {
            throw new Error(data.msg || "Errore sconosciuto");
        }
        return data; 
    } catch (error) {
        catchFunction(error);
    }
}
}

export default authService;
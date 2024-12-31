// Definimos las credenciales necesarias para la API de Trello
const API_KEY = ""; 
const TOKEN = ""

// La URL base de la API de Trello
const BASE_URL = "https://api.trello.com/1";

// Función para obtener los tableros de Trello del usuario
export const getBoards = async () => {
    try {
        // Realizamos una solicitud GET a la API de Trello para obtener los tableros
        const response = await fetch(`${BASE_URL}/members/me/boards?key=${API_KEY}&token=${TOKEN}`);
        // Si la respuesta no es exitosa, vota error
        if (!response.ok) {
            throw new Error("Error al obtener los tableros");
        }
        // Convertimos la respuesta en formato JSON
        const data = await response.json();
        // Imprimir respuesta  en consola para ver los datos de los tableros
        console.log("Tableros obtenidos: ", data);

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Función para obtener las listas de un tablero
export const getLists = async (boardId) => {
    try{
        // Realizamos una solicitud GET a la API de Trello para obetener las listas de un tablero
        const response = await fetch(`${BASE_URL}/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`);
        // Verificamos si la respuesta fue exitosa
        if(!response.ok){
            throw new Error("Error al obtener las listas del tablero");
        }
        // Convertimos la respuesta en formato JSON
        const data = await response.json();
        // Imprimimos la respuesta en consola para ver los datos de las listas
        console.log("Listas obtenidas: ", data);
        // Retornamos los datos obtenidos
        return data;
    }catch(error) {
        console.error(error);
        return [];
    }
}

// Función para crear una tarjeta
export const createCard = async (listId, cardName) => {
    try {
        const response = await fetch(`${BASE_URL}/cards?key=${API_KEY}&token=${TOKEN}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idList: listId,
                name: cardName,
            }),
        });
        if (!response.ok) {
            throw new Error("Error al crear la tarjeta");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


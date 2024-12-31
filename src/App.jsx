import { useState, useEffect } from 'react'
import './App.css'

// Importamos la función getBoards de api.js
import { getBoards, getLists, createCard } from './services/api';

const App = () => {
  // Creamos el estado boards para almacenar los tableros obtenidos
  const [boards, setBoards] = useState([]);
  // Creamos el estado lists para almacenar las listas obtenidas
  const [lists, setLists] = useState({});

  const [selectedBoard, setSelectedBoard] = useState("");
    const [selectedList, setSelectedList] = useState("");
    const [cardName, setCardName] = useState("");

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Definimos una función asíncrona dentro de useEffect para obtener los tableros
      const fetchBoards = async () => {
          // Llamamos a la función getBoards para obtener los tableros de Trello
          const data = await getBoards();
          // Imprimimos en consola los datos obtenidos para verificar que todo está funcionando
          console.log("Datos de los tableros:", data);
            
          // Actualizamos el estado boards con los datos obtenidos
          setBoards(data);
      };
      // Llamamos a la función fetchBoards
      fetchBoards();
  }, []);// El array vacío [] asegura que esto solo se ejecute una vez al montar el componente


  // Función para manejar la obtención de las listas de un tablero
  const fetchLists = async (boardId) => {
    const data = await getLists(boardId);
    setLists(prevLists => ({
        ...prevLists,
        [boardId]: data
    }));
};

  // Cargar listas cuando se selecciona un tablero
  useEffect(() => {
    if (selectedBoard) {
        const fetchLists = async () => {
            const listsData = await getLists(selectedBoard);
            setLists(prevLists => ({
                ...prevLists,
                [selectedBoard]: listsData,
            }));
        };
        fetchLists();
    }
}, [selectedBoard]);

  // Manejar la creación de tarjetas
  const handleCreateCard = async (e) => {
    e.preventDefault();
    if (!selectedList || !cardName) {
        alert("Selecciona una lista e ingresa un nombre para la tarjeta.");
        return;
    }
    const card = await createCard(selectedList, cardName);
    if (card) {
        alert(`Tarjeta "${card.name}" creada con éxito.`);
        setCardName(""); // Limpiar el campo de texto
    }
};


  return (
      <div>
          <h1>Mis Tableros de Trello</h1>

          {/* Imprimimos una lista de los tableros obtenidos */}
          <ul>
              {boards.map((board) => (
                  <li key={board.id}>
                    {board.name} {/* Mostramos el nombre de cada tablero */}
                    <button onClick={() => fetchLists(board.id)}>
                      Ver Listas
                    </button>

                    {/* Mostrar las listas si existen */}
                    {lists[board.id] && (
                      <ul>
                          {lists[board.id].map((list) => (
                              <li key={list.id}>{list.name}</li>
                          ))}
                      </ul>
                    )}
                  </li>
                  
              ))}
              {
                console.log()
              }
          </ul>

          <h1>Crear Tarjeta en Trello</h1>

            {/* Selección del tablero */}
            <div>
                <label htmlFor="boards">Selecciona un tablero:</label>
                <select
                    id="boards"
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                >
                    <option value="">--Selecciona un tablero--</option>
                    {boards.map((board) => (
                        <option key={board.id} value={board.id}>
                            {board.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selección de la lista */}
            {selectedBoard && (
                <div>
                    <label htmlFor="lists">Selecciona una lista:</label>
                    <select
                        id="lists"
                        value={selectedList}
                        onChange={(e) => setSelectedList(e.target.value)}
                    >
                        <option value="">--Selecciona una lista--</option>
                        {(lists[selectedBoard] || []).map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}


            {/* Formulario para crear tarjeta */}
            {selectedList && (
                <form onSubmit={handleCreateCard}>
                    <div>
                        <label htmlFor="cardName">Nombre de la tarjeta:</label>
                        <input
                            type="text"
                            id="cardName"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                    </div>
                    <button type="submit">Crear Tarjeta</button>
                </form>
            )}
      </div>
  );
};

export default App

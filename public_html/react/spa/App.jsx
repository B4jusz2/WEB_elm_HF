import { useState } from 'react';
import ToDoList from './ToDoList.jsx';
import RPS from "./RPS.jsx"

function App() {
  const [page, setPage] = useState("rps")
   return (
    <div>
      <h1>SPA alkalmazás</h1>

      <button onClick={() => setPage("rps")}>
        Kő-Papír-Olló
      </button>

      <button onClick={() => setPage("ToDoList")}>
        Todolist
      </button>

      <hr />

      {page === "rps" && <RPS />}
      {page === "ToDoList" && <ToDoList />}
    </div>
  );
}

export default App

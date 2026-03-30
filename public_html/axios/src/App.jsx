import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [nyeremenyek, setNyeremenyek] = useState([]);
  const [message, setMessage] = useState("");

  const [huzasid, setHuzasid] = useState("");
  const [talalat, setTalalat] = useState("");
  const [darab, setDarab] = useState("");
  const [ertek, setErtek] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNyeremenyek();
  }, []);

  const fetchNyeremenyek = async () => {
    const res = await axios.get("api.php");
    setNyeremenyek(res.data.readData);
    setMessage(a => a + " " + res.data.status);
  };

  const submit = async () => {
    let res;

    if (editId) {
      res = await axios.put("api.php", {
        id: editId,
        huzasid,
        talalat,
        darab,
        ertek
      });
      setEditId(null);
    } else {
      res = await axios.post("api.php", {
        huzasid,
        talalat,
        darab,
        ertek
      });
    }

    setMessage(res.data.status);
    setHuzasid("");
    setTalalat("");
    setDarab("");
    setErtek("");

    fetchNyeremenyek();
  };

  const editNyeremeny = (nyeremeny) => {
    setEditId(nyeremeny.id);
    setHuzasid(nyeremeny.huzasid);
    setTalalat(nyeremeny.talalat);
    setDarab(nyeremeny.darab);
    setErtek(nyeremeny.ertek);
  };

  const deleteNyeremeny = async (id) => {
    if (!confirm("Törli ezt a rekordot?")) return;

    const res = await axios.delete("api.php", { data: { id } });
    setMessage(res.data.status);
    fetchNyeremenyek();
  };

  return (
    <div>
      <p>{message}</p>
      <h3>React + Axios CRUD</h3>

      <div>
        <input
          value={huzasid}
          onChange={(e) => setHuzasid(e.target.value)}
          placeholder="Húzás ID"
        />
        <input
          value={talalat}
          onChange={(e) => setTalalat(e.target.value)}
          placeholder="Találat"
        />
        <input
          value={darab}
          onChange={(e) => setDarab(e.target.value)}
          placeholder="Darab"
        />
        <input
          value={ertek}
          onChange={(e) => setErtek(e.target.value)}
          placeholder="Érték"
        />

        <button onClick={submit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Húzás ID</th>
            <th>Találat</th>
            <th>Darab</th>
            <th>Érték</th>
            <th width="150">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nyeremenyek.map((nyeremeny) => (
            <tr key={nyeremeny.id}>
              <td>{nyeremeny.id}</td>
              <td>{nyeremeny.huzasid}</td>
              <td>{nyeremeny.talalat}</td>
              <td>{nyeremeny.darab}</td>
              <td>{nyeremeny.ertek}</td>
              <td>
                <button onClick={() => editNyeremeny(nyeremeny)}>Edit</button>
                <button onClick={() => deleteNyeremeny(nyeremeny.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
import { useState } from "react";

export default function App() {
  const [nyeremenyek, setNyeremenyek] = useState([
    { id: "1", huzasid: "547", talalat: "7", darab: "1", ertek: "10767529" },
    { id: "2", huzasid: "886", talalat: "4", darab: "2843", ertek: "5085" }
  ]);

  const [formData, setFormData] = useState({
    id: "",
    huzasid: "",
    talalat: "",
    darab: "",
    ertek: ""
  });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function resetForm() {
    setFormData({
      id: "",
      huzasid: "",
      talalat: "",
      darab: "",
      ertek: ""
    });
    setSelectedIndex(null);
    setError("");
  }

  function validate() {
    if (formData.id.trim() === "") {
      setError("Az ID mező kötelező.");
      return false;
    }
    setError("");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    if (selectedIndex === null) {
      setNyeremenyek([
        ...nyeremenyek,
        {
          id: formData.id,
          huzasid: formData.huzasid,
          talalat: formData.talalat,
          darab: formData.darab,
          ertek: formData.ertek
        }
      ]);
    } else {
      const ujTomb = [...nyeremenyek];
      ujTomb[selectedIndex] = {
        id: formData.id,
        huzasid: formData.huzasid,
        talalat: formData.talalat,
        darab: formData.darab,
        ertek: formData.ertek
      };
      setNyeremenyek(ujTomb);
    }

    resetForm();
  }

  function handleEdit(index) {
    setFormData(nyeremenyek[index]);
    setSelectedIndex(index);
    setError("");
  }

  function handleDelete(index) {
    if (window.confirm("Biztosan törölni szeretnéd ezt a rekordot?")) {
      const ujTomb = nyeremenyek.filter((_, i) => i !== index);
      setNyeremenyek(ujTomb);

      if (selectedIndex === index) {
        resetForm();
      }
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Nyeremények</h1>
      <hr />

      <div className="nyeremeny-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID*</label>
            {error && <div className="validation-error">{error}</div>}
            <input type="text" name="id" value={formData.id} onChange={handleChange} />
          </div>

          <div>
            <label>Húzás Id</label>
            <input type="text" name="huzasid" value={formData.huzasid} onChange={handleChange} />
          </div>

          <div>
            <label>Találat</label>
            <input type="text" name="talalat" value={formData.talalat} onChange={handleChange} />
          </div>

          <div>
            <label>Darab</label>
            <input type="text" name="darab" value={formData.darab} onChange={handleChange} />
          </div>

          <div>
            <label>Érték</label>
            <input type="text" name="ertek" value={formData.ertek} onChange={handleChange} />
          </div>

          <div className="form-action-buttons">
            <button type="submit">
              {selectedIndex === null ? "Submit" : "Update"}
            </button>
          </div>
        </form>
      </div>

      <br />

      <div className="nyeremeny-table">
        <table className="list" id="nyeremenyList">
          <thead>
            <tr>
              <th>ID</th>
              <th>Húzás Id</th>
              <th>Találat</th>
              <th>Darab</th>
              <th>Érték</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {nyeremenyek.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.huzasid}</td>
                <td>{item.talalat}</td>
                <td>{item.darab}</td>
                <td>{item.ertek}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(index)}>
                    Edit
                  </button>{" "}
                  <button type="button" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://69a2a199be843d692bd1dc32.mockapi.io/students";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [editId, setEditId] = useState(null);

  // GET DATA
  const getStudents = async () => {
    const response = await axios.get(API_URL);
    setStudents(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // ADD DATA
  const addStudent = async () => {
    if (!name || !email || !kelas) return alert("Isi semua field!");

    await axios.post(API_URL, { name, email, kelas });
    setName("");
    setEmail("");
    setKelas("");
    getStudents();
  };

  // DELETE DATA
  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    getStudents();
  };

  // EDIT (AMBIL DATA KE FORM)
  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setKelas(student.kelas);
  };

  // UPDATE DATA
  const updateStudent = async () => {
    await axios.put(`${API_URL}/${editId}`, {
      name,
      email,
      kelas,
    });

    setEditId(null);
    setName("");
    setEmail("");
    setKelas("");
    getStudents();
  };

  return (
    <div style={{
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
  fontFamily: "Arial"
}}>
      <h2>CRUD React + MockAPI</h2>

      <input
  style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
  placeholder="Nama"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
      <input
  style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
      <input
  style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
  placeholder="Kelas"
  value={kelas}
  onChange={(e) => setKelas(e.target.value)}
/>

      {editId ? (
        <button onClick={updateStudent}>Update</button>
      ) : (
        <button onClick={addStudent}>Tambah</button>
      )}
      <button style={{ padding: "8px 15px", marginRight: "5px" }}></button>

      <hr />

      <ul>
        {students.map((item) => (
          <li key={item.id}>
            {item.name} - {item.email} - {item.kelas}
            <button onClick={() => editStudent(item)}>Edit</button>
            <button onClick={() => deleteStudent(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

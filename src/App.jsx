import { useState } from "react";
import StudentForm from "./components/StudentForm";
import ListView from "./components/ListView";

function App() {
  const [editItem, setEditItem] = useState(null);

  return (
    <div>
      <h2>Redux CRUD Clean Architecture</h2>

      <StudentForm
        editDataItem={editItem}
        setEditItem={setEditItem}
      />

      <ListView
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
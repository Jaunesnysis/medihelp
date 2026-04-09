import { useState, useEffect } from "react";
import MedicineCard from "../components/MedicineCard";

function Saved() {
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState(null);

  const fetchSaved = async () => {
    try {
      const res = await fetch("http://localhost:3000/medicines/saved");
      const data = await res.json();
      setSaved(data);
    } catch (err) {
      setError("Could not load saved medicines.");
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/medicines/saved/${id}`, {
        method: "DELETE",
      });
      setSaved(saved.filter((m) => m.id !== id));
    } catch (err) {
      setError("Could not delete medicine.");
    }
  };

  return (
    <div>
      <div className="hero-title">
        Išsaugoti <em>vaistai</em>
      </div>
      <div className="hero-sub" style={{ marginBottom: "1.5rem" }}>
        Tavo asmeninis vaistų sąrašas.
      </div>

      {error && <div className="error">{error}</div>}

      {saved.length === 0 && (
        <div className="card" style={{ color: "#aaa", textAlign: "center" }}>
          Nėra išsaugotų vaistų.
        </div>
      )}

      {saved.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Saved;

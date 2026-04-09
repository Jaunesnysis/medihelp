import { useState } from "react";
import MedicineCard from "../components/MedicineCard";

function Search() {
  const [name, setName] = useState("");
  const [lang, setLang] = useState("en");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [interactions, setInteractions] = useState(null);
  const [loadingInteractions, setLoadingInteractions] = useState(false);

  const handleSearch = async () => {
    if (!name) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);
    setInteractions(null);

    try {
      const res = await fetch(`http://localhost:3000/medicines/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lang }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError("Medicine not found. Try a different name.");
    } finally {
      setLoading(false);
    }
  };

  const handleInteractions = async () => {
    setLoadingInteractions(true);
    try {
      const res = await fetch(
        `http://localhost:3000/medicines/${name}/interactions?lang=${lang}`,
      );
      const data = await res.json();
      setInteractions(data.interactions);
    } catch (err) {
      setError("Could not fetch interactions.");
    } finally {
      setLoadingInteractions(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("http://localhost:3000/medicines/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      setSaved(true);
    } catch (err) {
      setError("Could not save medicine.");
    }
  };

  return (
    <div>
      <div className="hero-title">
        Rask <em>vaistą</em>
        <br />
        greitai ir paprastai
      </div>
      <div className="hero-sub">
        Įvesk vaisto pavadinimą ir gauk dozavimą ir šalutinius poveikius.
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        {["en", "lt", "de", "pl"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "6px 14px",
              borderRadius: "99px",
              border: "1.5px solid #2D6A4F",
              background: lang === l ? "#2D6A4F" : "transparent",
              color: lang === l ? "white" : "#2D6A4F",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <input
        placeholder="pvz. ibuprofen, aspirin, paracetamol..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="btn" onClick={handleSearch} disabled={loading}>
        {loading ? "Ieškoma..." : "Ieškoti"}
      </button>

      {error && <div className="error">{error}</div>}

      {result && (
        <MedicineCard
          medicine={result}
          onSave={handleSave}
          saved={saved}
          onInteractions={handleInteractions}
          interactions={interactions}
          loadingInteractions={loadingInteractions}
        />
      )}
    </div>
  );
}

export default Search;

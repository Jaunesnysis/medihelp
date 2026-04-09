function MedicineCard({
  medicine,
  onSave,
  onDelete,
  saved,
  onInteractions,
  interactions,
  loadingInteractions,
}) {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="med-name">{medicine.name}</div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {onDelete && (
            <button
              className="btn-delete"
              onClick={() => onDelete(medicine.id)}
            >
              Ištrinti
            </button>
          )}
          {onSave && (
            <button className="btn-small" onClick={onSave} disabled={saved}>
              {saved ? "✓ Išsaugota" : "+ Išsaugoti"}
            </button>
          )}
        </div>
      </div>

      {medicine.purpose && (
        <>
          <div className="label">Paskirtis</div>
          <div className="text">{medicine.purpose}</div>
        </>
      )}

      {medicine.dosage && (
        <>
          <div className="label">Dozavimas</div>
          <div className="text">{medicine.dosage}</div>
        </>
      )}

      {medicine.sideEffects && (
        <>
          <div className="label">Šalutinis poveikis</div>
          <div className="text">{medicine.sideEffects}</div>
        </>
      )}

      {medicine.warnings && (
        <>
          <div className="label">Įspėjimai</div>
          <ul style={{ paddingLeft: "1rem", marginTop: "4px" }}>
            {medicine.warnings.map((w, i) => (
              <li key={i} className="text">
                {w}
              </li>
            ))}
          </ul>
        </>
      )}

      {onInteractions && (
        <button
          className="btn-small"
          onClick={onInteractions}
          disabled={loadingInteractions}
          style={{ marginTop: "10px", background: "#1a1a1a" }}
        >
          {loadingInteractions
            ? "Kraunama..."
            : "⚠ Sąveikos su kitais vaistais"}
        </button>
      )}

      {interactions && (
        <>
          <div className="label" style={{ marginTop: "12px" }}>
            Sąveikos
          </div>
          <ul style={{ paddingLeft: "1rem", marginTop: "4px" }}>
            {interactions.map((i, idx) => (
              <li key={idx} className="text" style={{ color: "#e53e3e" }}>
                {i}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MedicineCard;

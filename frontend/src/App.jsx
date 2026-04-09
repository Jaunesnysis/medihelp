import { useState } from "react";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import "./App.css";

function App() {
  const [page, setPage] = useState("search");

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">
          Medi<span>Help</span>
        </div>
        <div className="nav-links">
          <button
            className={page === "search" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("search")}
          >
            Paieška
          </button>
          <button
            className={page === "saved" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("saved")}
          >
            Išsaugoti
          </button>
        </div>
      </nav>

      {page === "search" ? <Search /> : <Saved />}
    </div>
  );
}

export default App;

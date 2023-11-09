import { useState } from "react";
import "./Search.css";

export const Search = ({ searchSuperHeros, getMySuperHeros }) => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="search">
      <input value={keyword} onChange={e => setKeyword(e.target.value)} />
      <button type="button" onClick={() => searchSuperHeros(keyword)}>
        Search
      </button>
      <button type="button" onClick={getMySuperHeros}>
        Get my super heros
      </button>
    </div>
  );
};

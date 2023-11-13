import "./Search.css";
import { searchSuperheroes } from "../../graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";

const Search = ({ handleSearch }) => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="search">
      <input value={keyword} onChange={e => setKeyword(e.target.value)} />
      <button type="button" onClick={() => handleClick(keyword, handleSearch)}>
        Search
      </button>
    </div>
  );
};

const handleClick = async (keyword, handleSearch) => {
  console.log(`start to search super heros by: ${keyword}`);
  if (!keyword || keyword.length === 0) {
    console.log("no search key provided.");
    handleSearch([]);
    return;
  }

  try {
    const searchResult = await API.graphql(graphqlOperation(searchSuperheroes, { name: keyword }));
    handleSearch(searchResult.data.searchSuperheroes);
    console.log(`Search: search by ${keyword}, result size is ${searchResult.data.searchSuperheroes.length}`);
  } catch (err) {
    console.log("error searching super heros", err);
  }
};

export default Search;

import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      { children }
    </SearchContext.Provider>
  );
};

//! custome Hooks
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };

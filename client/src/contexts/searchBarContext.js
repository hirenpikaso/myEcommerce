import { createContext, useState } from "react";

export const SearchBarContext = createContext();

const SearchBarContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  return (
    <SearchBarContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarContextProvider;

import React from "react";

const InputSearch = ({ query, setQuery, className }) => {
  return (
    <div>
      <input
        className={className}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default InputSearch;

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React from "react";
const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => (
  <>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      value={searchQuery}
      label="Search for products"
      variant="outlined"
      placeholder="Search..."
    />
    <IconButton aria-label="search" onClick={handleSearch}>
      <i className="bi bi-search" />
    </IconButton>
  </>
);

export default SearchBar;

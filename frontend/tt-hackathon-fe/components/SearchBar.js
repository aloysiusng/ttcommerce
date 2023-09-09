import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React from "react";
const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <form>
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
    <IconButton type="submit" aria-label="search">
      <i className="bi bi-search" />
    </IconButton>
  </form>
);

export default SearchBar;

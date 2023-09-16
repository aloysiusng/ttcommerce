import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import * as React from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleClear,
}) => (
  <Paper
    component="form"
    sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "90%" }}
    elevation={3}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search for products"
      inputProps={{ "aria-label": "search products" }}
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      value={searchQuery}
    />
    <IconButton
      type="button"
      sx={{ p: "10px" }}
      aria-label="clear"
      onClick={handleClear}
    >
      <ClearIcon />
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    <IconButton
      color="primary"
      sx={{ p: "10px" }}
      aria-label="search"
      onClick={handleSearch}
    >
      <SearchIcon />
    </IconButton>
  </Paper>
);

// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import React from "react";
// const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => (
//   <>
//     <TextField
//       id="search-bar"
//       className="text"
//       onInput={(e) => {
//         setSearchQuery(e.target.value);
//       }}
//       value={searchQuery}
//       label="Search for products"
//       variant="outlined"
//       placeholder="Search..."
//     />
//     <IconButton aria-label="search" onClick={handleSearch}>
//       <i className="bi bi-search" />
//     </IconButton>

//   </>

// );

export default SearchBar;

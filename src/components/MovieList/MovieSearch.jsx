import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";

export default function MovieSearch() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <SearchBar setSearchResults={setSearchResults} />
      <MovieList searchResults={searchResults} />
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
  } from "@mui/material";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovie = async () => {
    const response = axios.get(
      `http://localhost:3000/api/v2/movie/search?name=${searchQuery}`,
      {
        method: "GET",
      }
    );
    if (response) {
      setSearchResults(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMovie();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="cursor-pointer rounded-full border border-collapse bg-transparent w-[300px] p-5 mb-0 mt-1  h-[30px] pl-10 focus:cursor-text"
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={1}
        margin={1}
      >
        {searchResults &&
          searchResults.map((movie, index) => (
            <Box
              key={index}
              backgroundColor={"blue"}
              borderRadius={1}
              textAlign="center"
            >
              <h1>Movie</h1>
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default Search;

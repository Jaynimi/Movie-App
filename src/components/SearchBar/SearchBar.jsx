import React, {useState, useEffect} from "react";
import { Input } from "@chakra-ui/react";
import tmdbApi from "../../services/api";
import {  FaSearch, FaAlignJustify } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function(...args) {
  //       clearTimeout(timeoutId);
  //       timeoutId = setTimeout(() => func(...args), delay);
  //   }
  // }

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // debouncedSearch(newSearchTerm);
  }

  // const debouncedSearch = debounce(async (query) => {
  //   try {
  //     const response = await tmdbApi.get(`/search/movie?query=${query}`);
  //     setSearchResults(response.data.results);
  //   } catch (error) {
  //     console.error(`Error fetching movie details for ID ${query}:`, error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, 300)


  // Get movie from list of movies in the api upon search

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const response = await tmdbApi.get(`/search/movie?query=${searchTerm}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error(`Error fetching movie details for ID ${searchTerm}:`, error);
      } finally {
        setIsLoading(false);
      }
    }

    if (searchTerm) {
      fetchMovieDetails();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, setSearchResults]);

  return (
    <>
      <nav>
        <div className="navWrapper flex justify-between px-10 py-6">
          <div className="logo">
            <img src="../images/moviebox_logo.png" alt="Movie box logo" />
          </div>
          <div className="search-bar">
            <form action="" method="get" className="inline-flex relative">
              <input placeholder="What do you want to search?" size='md' width='auto'
              className="w-96 px-[1%] py-2 bg-transparent border-[#D1D5DB] border-2 rounded-md"
              // type="text" name="search" id="search"
              onChange={handleChange}
              value={searchTerm}
              />
              <div className="flex items-center absolute right-2 bottom-0 top-0">
                <FaSearch className="text-center" />
              </div>
            </form>
            {isLoading && <p>Loading...</p>}
          </div>
          <div className="menu inline-flex justify-between">
            <p className="text-white mr-4">Sign In</p>
            <div className="bg-pink-600 rounded-3xl h-[40px] w-[40px] relative"><FaAlignJustify className='absolute text-white m-[0 auto] cursor-pointer m-[0 auto] block right-0 bottom-4 left-3'/></div>
          </div>
        </div>
      </nav>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import tmdbApi from "../../services/api";
import "./MovieList.css";

export default function MovieCard({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [rating, getRating] = useState([]);
  const [genres, getGenres] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    async function fetchMovieDetails(movieId) {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
        return null;
      }
    }

    async function getMoviesWithDetails() {
      const top10Movies = await tmdbApi.get("/movie/popular");
      const top10MovieIds = top10Movies.data.results
        .slice(0, 10)
        .map((movie) => movie.id);

      const movieDetailsPromises = top10MovieIds.map(fetchMovieDetails);
      const movieDetails = await Promise.all(movieDetailsPromises);
      setMovies(movieDetails.filter(Boolean));
    }

    getMoviesWithDetails();
  }, []);

  function getCountryAbbreviation(countryName) {
    const countryAbbreviations = {
      "United States of America": "USA",
      "United Kingdom": "UK",
    };

    return countryAbbreviations[countryName] || countryName;
  }

  return (
    <div className="mx-12 my-20">
      <div className="flex justify-between">
        <h2 className="font-bold">Featured Movie</h2>
        <div className="font-medium text-pink-600 inline-flex cursor-pointer">
          <p>See more</p>
          <FaAngleRight className="block my-0 mx-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <Card className="bg-gray-100" data-testid="movie-card">
              <CardHeader>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className=""
                  data-testid="movie-poster"
                />
              </CardHeader>
              <CardBody>
                <Text>
                  {movie.production_countries
                    .map((country) => getCountryAbbreviation(country.name))
                    .join(", ")}
                  ,{" "}
                  <Text className="" data-testid="movie-release-date">
                    {new Date(movie.release_date).getFullYear()}
                  </Text>
                </Text>
                <Text className="text-md font-bold" data-testid="movie-title">
                  {movie.title}
                </Text>
                <div className="flex justify-between gap-4">
                  <div className="flex">
                    <img
                      src="../images/imdb.png"
                      alt="imdb rating"
                      className=" rating-logo"
                    />
                    <Text className="text-md font-bold">
                      {Math.floor(movie.vote_average * 10)} / 100
                    </Text>
                  </div>
                  <div className="flex gap-2">
                    <img
                      src="../images/rotten_tomato.png"
                      alt="tomato rating"
                    />
                    <Text className="">{movie.vote_count}</Text>
                  </div>
                </div>
                <Text className="text-slate-500 mt-3">
                  {movie.genres
                    .slice(0, 3)
                    .map((genre) => genre.name)
                    .join(", ")}
                </Text>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

// MovieDetails.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../services/api";
import "./MovieDetails.css";
import { FaHome, FaVideo, FaTv, FaCalendar } from "react-icons/fa";
import { FaRightFromBracket, FaStar } from "react-icons/fa6";
import { Select, Text } from "@chakra-ui/react";


export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [awards, setAwards] = useState([{}]);
  const [trailers, setTrailers] = useState([{}]);
  const [trending, setTrending] = useState([{}]);
  const [runtime, setRuntime] = useState([{}]);




  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
      }
    }

    async function fetchMovieCredits() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}/credits`);
        setCredits(response.data);
      } catch (error) {
        console.error(`Error fetching movie credits for ID ${movieId}:`, error);
      }
    }

    async function fetchMovieAwards() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}/awards`);
        setAwards(response.data.awards);
      } catch (error) {
        console.error(`Error fetching movie awards for ID ${movieId}:`, error);
      }
    }

    async function fetchMovieTrailers() {
      try {
        const response = await tmdbApi.get(`/movies/${movieId}/videos`);
        setTrailers(response.data.results);
      } catch(error) {
        console.error(`Error fetching movie trailers for ID ${movieId}:`, error);
      }
    }

    async function fetchTrendingMovies() {
      try {
        const response = await tmdbApi.get(`/trending/movie/week`);
        setTrending(response.data.results);
      } catch(error) {
        console.error(`Error fetching trending movies:`, error);
      }
    }

    async function fetchMovieRuntime() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        setRuntime(response.data.runtime);
      } catch(error) {
        console.error(`Error fetching movie runtime for ID ${movieId}:`, error);
      }
    }


    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieAwards();
    fetchMovieTrailers();
    fetchTrendingMovies();
    fetchMovieRuntime();

  }, [movieId]);

  // const genres = movie.genres?.map((genre) => genre.name).join(", ");
  // put each genre in a button
  const genres = movie.genres?.map((genre) => (
    <button className="text-pink-700 border-2 px-2 py-1 text-[15px] gap-1 rounded-3xl flex-row border-pink-500">{genre.name}</button>
  ));
  const releaseYear = new Date(movie.release_date).getFullYear();


  const directors = credits.crew?.filter((person) => person.job === "Director");
  const writers = credits.crew?.filter(
    (person) => person.department === "Writing"
  );
  const stars = credits.cast?.slice(0, 5);


  const trendingMovies = trending?.slice(0, 3)
  .map((movie) => (
    <div className="flex gap">
      <Link to={`/movie/${movie.id}`}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-[100%] h-[10rem]"
      />
      </Link>
      {/* <h2 className="font-bold text-lg">{movie.title}</h2>
      <p className="text-gray-500">
        {new Date(movie.release_date).getFullYear()}
      </p> */}

    </div>

  ));

  // show the runtime in hours and minutes
  const runtimeHours = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;


  return (
    <div className="details">
      <aside className="sidebar lg:block hidden">
        <div className="aside_content">
          <div className="flex gap-6 align-middle py-10">
            <img src="../images/tv.png" alt="moviebox logo" />
            <p className="text-black-500 font-bold text-2xl text-center align-center">
              MovieBox
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <span className="flex gap-4">
              <FaHome /> <Link to='/' className="text-lg font-sans font-medium">Home</Link>
            </span>
            <span className="flex gap-4">
              <FaVideo />{" "}
              <p className="text-lg font-sans font-medium">Movies</p>
            </span>
            <span className="flex gap-4">
              <FaTv />{" "}
              <p className="text-lg font-sans font-medium">TV Series</p>
            </span>
            <span className="flex gap-4">
              <FaCalendar />{" "}
              <p className="text-lg font-sans font-medium">Upcoming</p>
            </span>
          </div>
        </div>

        <div className="aside_footer flex flex-col gap-1 bg-pink-200 border-pink-400 border-2 rounded-xl mt-10 w-52 leading-6 px-4 pt-8 pb-2">
          <h2 className="font-sans font-semibold text-gray-700">
            Play movie quizzes <br /> and earn
            <br />
            free tickets
          </h2>
          <p className="font-sans font-medium text-gray-500">
            50k people are playing now
          </p>
          <button className="px-2 py-[4px] bg-pink-400 text-pink-800 rounded-3xl font-sans font-semibold text-medium flex justify-center">
            Start playing
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <FaRightFromBracket />
          <p className="text-lg font-sans font-medium text-gray-600">Log out</p>
        </div>
      </aside>

      <main className="content">
        <div className="top">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-[100%] h-[20rem] rounded-xl"
          />
        </div>

        <div className="flex flex-col lg:flex lg:flex-row justify-between gap-4 mt-4 font-['Poppins', sans-serif;]">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <h2 className="font-bold text-xl" data-testid='movie-title'>{movie.title}</h2>
              <h2 className="" data-testid='movie-release-date'>{new Date(movie.release_date).getFullYear()}</h2>
              <h2>{movie.pg}</h2>
              <p data-testid='movie-runtime'>{runtimeHours}</p>
              <button className="">{genres}</button>
            </div>

            <div className="movie-overview text-lg font-sans font-semibold text-gray-700" data-testid='movie-overview'>
              {movie.overview}
            </div>

            <div className="contibutors flex flex-col gap-4">
              <Text className="text-lg font-sans font-semibold">
                Director:{" "}
                <span className="text-pink-700">
                  {directors?.map((director) => director.name).join(", ")}
                </span>
              </Text>
              <Text className="text-lg font-sans font-semibold">
                Writers:{" "}
                <span className="text-pink-700">
                  {writers?.map((writer) => writer.name).join(", ")}
                </span>
              </Text>
              <Text className="text-lg font-sans font-semibold">
                Stars:{" "}
                <span className="text-pink-700">
                  {stars?.map((star) => star.name).join(", ")}
                </span>
              </Text>
            </div>

            <div className="flex gap-2">
              <div className="top-rated bg-pink-700 px-4 py-2 rounded-lg text-white">
                <Link>Top rated movie #{movie.rating}</Link>
              </div>
              <div className="awards">
                <Select
                  placeholder="Awards 9 nominations"
                  className="w-72"
                >
                  {awards?.map((award) => (
                    <option key={award.id}>{award.name}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="side text-black flex flex-col gap-4 relative">
            <div className="flex absolute flex-row right-0">
              <span className="right-0">
                <FaStar className=" text-yellow-400" />
              </span>
              <span>
                {movie.vote_average} | {movie.vote_count}
              </span>
            </div>
            <div className="flex flex-col gap-3 mt-14">
              <Link className="bg-pink-700 text-white px-8 py-2 rounded-lg w-72 text-center">
                See Showtimes
              </Link>
              <Link className="bg-pink-100 border-2 border-pink-600 rounded-lg w-72 px-8 py-2 text-center">
                More Watch options
              </Link>
              <div className="flex gap-1 relative mt-4">
                {trendingMovies}
                <div className="absolute flex gap-4 bottom-0 bg-slate-500 py-2 px-1 w-full">
                  <img src="../images/List.png" alt="" className="h-[20px]" />
                  <p className="text-white font-medium text-[12px]">The Best Movies and Shows in September</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <p>Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p> */}
      </main>
    </div>
  );
}

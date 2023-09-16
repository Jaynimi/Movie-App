import axios from "axios";

const TMDB_API_KEY = '5046a04131d16b146972a8c11380c26f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
    }
});

export default tmdbApi;

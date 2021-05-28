import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '342423e5729b7b8a5b9de203e972614a',
        language: 'es-ES',
        page: 1
    }
});

export default movieDB;
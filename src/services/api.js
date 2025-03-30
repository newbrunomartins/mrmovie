// URL BASE: https://api.themoviedb.org/3/
// API URL: /movie/now_playing?api_key=434b3e90692dea358c00e31a229581d2&language=pt-BR

import axios from 'axios';


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
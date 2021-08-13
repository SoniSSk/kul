import axios from "axios";

const BASE_URL = 'https://cms.ezylegal.in/graphql';

const api = axios.create({
    baseURL: BASE_URL
});

export default api;

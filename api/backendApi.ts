import axios, {AxiosRequestConfig} from "axios";
import {store} from "../redux/store";
import getEnvironmentVariables from "../utils/environmentVariables";

const { BACKEND_URL_PROD, ENV, BACKEND_URL_STAGING } = getEnvironmentVariables();

const BASE_URL = ENV === "staging" ? BACKEND_URL_STAGING : BACKEND_URL_PROD;
// const BASE_URL = 'http://localhost:4000/graphql';

const backendApi = axios.create({
    baseURL: BASE_URL
});

backendApi.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if(store.getState().loggedInUser){
        const token = store.getState().loggedInUser.jwt_token;
        if(token){
            config.headers.Authorization = 'Bearer ' + token;
        }
    }
    return config;
})

export default backendApi;
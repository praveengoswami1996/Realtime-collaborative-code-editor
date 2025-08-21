import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const options: AxiosRequestConfig = {
  baseURL: baseURL + "/api",
  withCredentials: true,
};

const API: AxiosInstance = axios.create(options);

export default API;
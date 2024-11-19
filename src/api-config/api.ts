import { setUserProfile } from "@/redux/actions/userActionTypes";
import store from "@/redux/store";
import axios from "axios";

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("access_token");
}


export const api = axios.create({
  baseURL: `https://manage.solveline.pro/api/`,
   
  headers: {
    common: {
      Authorization: `Bearer ${token ?? ""}`,
    },
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle 401 error here
      // Reset data in Redux and local storage
      localStorage.clear();
      location.replace("/");
      store.reduxStore.dispatch(
        setUserProfile({
          isAuth: false,
          email: "",
          id: null,
          name: "",
         })
      );
    }
    return Promise.reject(error);
  }
);
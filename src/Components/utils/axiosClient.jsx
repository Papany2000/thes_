import axios from "axios";
import { defaultAxiosOptions } from "../../config";
import { useNavigate } from "react-router-dom";

export const axiosClient = axios.create(defaultAxiosOptions);

axiosClient.interceptors.response.use(
  function (response) {
    // Делаем что-то с данными ответа
    return response;
  },
  function (error) { 
    if (error.response && error.response.status === 401) {
      const navigate = useNavigate();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `${token}`;
  }
}
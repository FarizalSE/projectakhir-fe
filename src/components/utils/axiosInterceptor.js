// src/utils/axiosJWT.js
import axios from "axios";
import { refreshToken } from "./auth";

const createAxiosJWT = (token, expire, setToken, setName, setRole, setEmail, setId, setExpire, navigate) => {
  const axiosJWT = axios.create({
    withCredentials: true,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const { accessToken, decoded } = await refreshToken();
          setToken(accessToken);
          setName(decoded.name);
          setRole(decoded.role);
          setId(decoded.id);
          setEmail(decoded.email);
          
          setExpire(decoded.exp);
          config.headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          console.error("Gagal refresh token:", error);
          navigate("/");
          return Promise.reject(error);
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosJWT;
};

export default createAxiosJWT;

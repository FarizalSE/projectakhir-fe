// src/utils/auth.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "./constants";

export const refreshToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/token`, {
      withCredentials: true,
    });
    const accessToken = response.data.accessToken;
    const decoded = jwtDecode(accessToken);
    return { accessToken, decoded };
  } catch (error) {
    throw error;
  }
};


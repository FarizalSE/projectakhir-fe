import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "./constants";

const useRefreshToken = async (
  setToken,
  setName,
  setEmail,
  setRole,
  setId,
  setExpire
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/token`, {
      withCredentials: true,
    });

    const decoded = jwtDecode(response.data.accessToken);
    setToken(response.data.accessToken);
    setName(decoded.name);
    setEmail(decoded.email);
    setRole(decoded.role);
    setId(decoded.id);
    setExpire(decoded.exp);
    console.log("Token berhasil diperbarui:", decoded);
  } catch (error) {
    console.error("Gagal mengambil token:", error);
  }
};

export default useRefreshToken;

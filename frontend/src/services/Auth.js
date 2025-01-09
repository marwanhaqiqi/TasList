import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const login = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${url}/login`,
        new URLSearchParams(data).toString(),
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.data.token);
    },
  });

const AuthService = {
  login,
};

export default AuthService;

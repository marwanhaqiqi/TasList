import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/Auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  const loginMutation = AuthService.login();

  const login = async (data) => {
    const response = await loginMutation.mutateAsync(data);
    setToken(localStorage.getItem("token"));
    setName(response.data.data.name);
  };

  const logout = () => {
    setToken(null);
    setName(null);
  };

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token]);

  //   useEffect(() => {
  //     if (token) {
  //       //   localStorage.setItem("token", JSON.stringify(user));

  //       const savedToken = localStorage.getItem("token");
  //       if (savedToken) {
  //         setToken(JSON.parse(savedToken));
  //       }
  //     } else {
  //       localStorage.removeItem("token");
  //     }
  //   }, [token]);

  //   useEffect(() => {
  //     console.log("xxxxxxxxxxxxx", token);
  //   }, [token]);

  return (
    <AuthContext.Provider value={{ name, token, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

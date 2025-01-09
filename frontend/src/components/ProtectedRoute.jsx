import React from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import Dashboard from "../pages/PenarikanKomisi";
import Login from "../pages/Login";

const withAuth = (Component) => {
  return (props) => {
    const { token } = useAuth();

    if (token === null) return <Login />;

    return <Component {...props} />;
  };
};

const ProtectedRoute = () => {
  const AuthenticatedDashboard = withAuth(Dashboard);

  return (
    <AuthProvider>
      <AuthenticatedDashboard />
    </AuthProvider>
  );
};

export default ProtectedRoute;

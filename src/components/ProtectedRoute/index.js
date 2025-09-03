import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return null; // ou <Loading /> se quiser mostrar spinner

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // novo

  useEffect(() => {
    const token = localStorage.getItem("tokenAdminSolicitaAi");
    if (token) {
      setUser({ token });
    }
    setLoading(false); // terminou de checar
  }, []);

  const login = (token) => {
    localStorage.setItem("tokenAdminSolicitaAi", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("tokenAdminSolicitaAi");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

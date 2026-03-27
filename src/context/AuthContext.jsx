import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Restore user after refresh
  useEffect(() => {

    try {

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }

    } catch (error) {
      console.error("Invalid user in localStorage");
      localStorage.removeItem("user");
    }

  }, []);

  const login = (role = "student") => {

    const validRole = role === "admin" ? "admin" : "student";

    const newUser = { role: validRole };

    setUser(newUser);

    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {

    setUser(null);
    localStorage.removeItem("user");

  };

  const value = useMemo(() => ({
    user,
    login,
    logout
  }), [user]);

  return (

    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>

  );

}

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;

};
import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Simplified auth check (token-based only)
 useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    setUser(decoded); // contains id, email, etc.
    console.log("Token found, user authenticated:", decoded);
  }

  setLoading(false);
}, []);

  // ✅ Login
  const login = async (payload) => {
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, payload);

      const { token, user: userData } = res.data;

      if (token) {
        console.log("Login successful, token received:", token);
        localStorage.setItem("token", token);
      }

      // If backend doesn't send user, fallback to token
      setUser(userData || { token });

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600" />
        </div>
      )}
    </AuthContext.Provider>
  );
};
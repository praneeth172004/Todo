import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom"; // for potential redirection

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add user state
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // optional, in case you need redirection on auth check

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/users/details", {
          withCredentials: true, // Ensures the cookie (if any) is sent with the request
        });

        if (res.data && res.data.user) {
          setIsAuthenticated(true);
          setUser(res.data.user); // Set user data after successful auth
        } else {
          setIsAuthenticated(false);
          setUser(null); // Clear user if not authenticated
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setUser(null); // Clear user on error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Loader component
  const Loader = () => (
    <div className="h-screen flex justify-center items-center">
      <div className="spinner-border animate-spin w-12 h-12 border-4 border-t-4 border-gray-500 rounded-full"></div>
    </div>
  );

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

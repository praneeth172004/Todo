import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            TodoApp
          </Link>

          {/* Links */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/todos/alltodos" className="text-sm text-gray-700 hover:text-gray-900">
                  My Todos
                </Link>
                <Link to="/todos/add-todo" className="text-sm text-gray-700 hover:text-gray-900">
                  Add Todo
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
                <Link to="/userdetails">
                  {/* Use either Hero Icon or Image below */}
                  <UserCircleIcon className="w-8 h-8 text-blue-600 hover:text-blue-800" />
                  {/* <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full border" /> */}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

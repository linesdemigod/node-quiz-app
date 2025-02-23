import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { logout } from "../context/AuthAction";

function UserNavbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [showMobileMenu, setshowMobileMenu] = useState(false);

  const toggleNav = () => {
    setshowMobileMenu(!showMobileMenu);
  };

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await logout();
    if (result.success) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };
  const isAuthenticated = user && Object.keys(user).length > 0;

  return (
    <nav className="z-50 bg-secondary text-white opacity-90 py-3">
      <div className="container mx-auto flex flex-row items-center justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Link to="/" className="text-2xl">
            <img src="" alt="Quiz" className="h-10" />
          </Link>
        </div>
        <div className="hidden items-center justify-start gap-5 md:flex">
          <Link to="/" className="text-lg hover:text-gray-400">
            Quiz
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/student/profile"
                className="text-lg hover:text-gray-400"
              >
                Profile
              </Link>

              <button
                type="button"
                className="block px-4 py-2 text-base font-semibold text-white  cursor-pointer rounded-lg bg-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg hover:text-gray-400">
                Login
              </Link>
            </>
          )}
        </div>

        <button
          id="menu-toggle"
          className="block hover:text-gray-400 md:hidden"
          onClick={() => toggleNav()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${showMobileMenu ? "hidden" : "block"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            id="open-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${showMobileMenu ? "block" : "hidden"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            id="close-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`${showMobileMenu ? "block" : "hidden"} md:hidden`}
        id="menu"
      >
        <div className="absolute right-0 top-[5rem] z-10 flex w-full flex-col items-start justify-center gap-3 overflow-hidden bg-black px-10 py-8 transition-transform duration-500 sm:flex sm:w-auto sm:self-center">
          <Link to="/" className="text-lg hover:text-gray-400">
            Quiz
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/student/profile"
                className="text-lg hover:text-gray-400"
              >
                Profile
              </Link>

              <button
                type="button"
                className="block px-4 py-2 text-base font-semibold text-white  cursor-pointer rounded-lg bg-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg hover:text-gray-400">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;

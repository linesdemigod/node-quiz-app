import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { logout } from "../context/AuthAction";
const AdminSidebar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await logout();

    if (result.success) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };
  return (
    <aside className="w-64 bg-gray-800 text-white fixed h-full overflow-auto flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        Admin Dashboard
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <Link
              to="/admin"
              className="flex items-center p-2 rounded-md hover:bg-gray-700"
            >
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/quiz"
              className="flex items-center p-2 rounded-md hover:bg-gray-700"
            >
              <span className="ml-2">Quiz</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          type="button"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

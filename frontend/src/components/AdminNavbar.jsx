import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminNavbar() {
    return (
        <>
            {/* Top Navbar */}
            <header className="bg-white shadow-sm px-4 py-2 flex justify-between items-center fixed w-full top-0 z-10 overflow-hidden">
                <h1 className="text-lg font-semibold">Welcome, Admin</h1>
                {/* <div className="flex items-center space-x-4 overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                        Profile
                    </button>
                </div> */}
            </header>
        </>
    );
}

export default AdminNavbar;

import { Outlet } from "react-router-dom";
import Navbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}

                <AdminSidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col ml-64 ">
                    <Navbar />
                    <main className="flex-1 p-4 mt-10">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* <main>
                <Outlet />
            </main> */}
        </>
    );
};

export default AdminLayout;

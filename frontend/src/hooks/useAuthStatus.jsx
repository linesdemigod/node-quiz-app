import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { loginStatus } from "../context/AuthAction";

export const useAuthStatus = () => {
  const { user, loading } = useContext(AuthContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [userRole, setUserRole] = useState(null); // Track user role
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      //
      const authUser = async () => {
        const userData = await loginStatus();
        if (userData.auth && token) {
          const role = user.role;

          setIsAuthenticated(true);
          setUserRole(role);
        }
        setCheckingStatus(false);
      };
      authUser();
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return {
    isAuthenticated,
    checkingStatus,
    userRole,
  };
};

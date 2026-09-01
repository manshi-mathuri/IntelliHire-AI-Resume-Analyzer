import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          localStorage.removeItem("token");
          setIsValid(false);
          return;
        }

        setIsValid(true);
      } catch (error) {
        console.error(error);
        setIsValid(false);
      }
    }

    verifyToken();
  }, []);

  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
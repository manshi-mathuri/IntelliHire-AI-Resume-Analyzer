import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-6">

        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-semibold hover:text-blue-800 cursor-pointer"
        >
          ← Back to Home
        </button>

        <div className="bg-white mt-8 p-8 rounded-2xl shadow-lg border border-gray-100">

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <div className="mt-8">
            <p className="text-gray-500">
              Name
            </p>

            <p className="text-xl font-semibold mt-1">
              {user?.name}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500">
              Email
            </p>

            <p className="text-xl font-semibold mt-1">
              {user?.email}
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

export default Profile;
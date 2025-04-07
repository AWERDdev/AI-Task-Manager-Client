import { Menu, UserCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router";
function NoAuthNav({ OpenSidebar }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const Logoutpath = ()=>{
    navigate("/Intro"); // Navigate to the Signup page
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token

      if (!token) return; // If no token, user is not logged in

      try {
        const response = await fetch("http://localhost:3500/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
          // console.log(data)
        if (response.ok) {
          setUser(data.user);
          // console.log(data.user)
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-[7vh] shadow-lg bg-[#111827] flex items-center px-5 justify-between z-[50]">

      {/* Left Side: Title & Menu Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={OpenSidebar}
          className="lg:hidden flex items-center justify-center hover:bg-[#9ca3af] hover:text-black p-2 rounded-md text-[#9ca3af]"
        >
          <Menu className="transition-all duration-300" />
        </button>
        <h1 className="text-[1rem] text-white font-bold">TaskMaster</h1>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-6 text-lg">
        <a href="/" className="text-blue-500 hover:no-underline">Dashboard</a>
        <a href="/Profile" className="text-white hover:text-blue-500 hover:no-underline">Profile</a>
      </div>

      {/* Right Side: Profile Dropdown */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button>
            <UserCircle className="w-8 h-8 text-white cursor-pointer rounded-full" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" className="bg-[#1f2937] text-white rounded-md shadow-lg p-2 w-48">
          {user ? (
            <>
              <div className="px-4 py-2 text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <DropdownMenu.Item
                className="hover:bg-red-600 cursor-pointer text-center py-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  Logoutpath()
                }}
              >
                Logout
              </DropdownMenu.Item>
            </>
          ) : (
            <DropdownMenu.Item className="text-center py-2">
              <a href="/login" className="text-blue-400 hover:underline">Login</a>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
}

NoAuthNav.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default NoAuthNav;

import { Menu } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function NavBar({ OpenSidebar }) {  // ✅ Fix destructuring
  const navigate = useNavigate(); // Initialize navigate function
  const LoginPath = ()=>{
    navigate("/Login"); // Navigate to the Signup page
  }
  const Signup = ()=>{
    navigate("/Signup"); // Navigate to the Signup page
  }
  const Home = ()=>{
    navigate("/Intro"); // Navigate to the Signup page
  }
  return (
    <nav className="fixed h-[7vh] w-full shadow-lg rounded-none top-0 left-0 bg-[#111827] outline-1 outline-gray-600 ">
      <header className="flex justify-between items-center h-full px-5">
        {/* Left Side: Title & Menu Button */}
        <div className="title flex items-center gap-2">
          <button
            onClick={OpenSidebar} // ✅ Now correctly calls the function
            className="options-BTN flex items-center justify-center lg:hidden hover:bg-[#9ca3af] hover:text-black p-2 rounded-md text-[#9ca3af]"
          >
            <Menu className="transition-all duration-300" />
          </button>
          <h1 className="text-[1rem] text-[#ffffff] font-bold flex items-center transition-all duration-300">
            TaskMaster
          </h1>
        </div>
        <button onClick={Home} className=" flex justify-center text-[1rem] text-[#ffffff]   hover:text-blue-500  px-4 py-2 rounded-md transition-all duration-300">
            Home
          </button>
        {/* Right Side: Links - Hidden when Menu Button appears */}
        <div className="Links hidden lg:flex items-center gap-5">
       
          <button onClick={LoginPath} className="text-[1rem] text-[#ffffff] hover:text-black hover:bg-gray-500  px-4 py-2 rounded-md transition-all duration-300">
            Login
          </button>
          <button onClick={Signup} className="text-[1rem] text-black  px-5 py-2 bg-[#1e3a8a] rounded-md hover:bg-blue-500 transition-all duration-300">
            Sign Up
          </button>
        </div>
      </header>
    </nav>
  );
}

NavBar.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,  // ✅ Ensure it's a function
};

export default NavBar;


import { Menu } from "lucide-react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
function NoAuthNav({ OpenSidebar }) {  // ✅ Fix destructuring
  // const navigate = useNavigate(); // Initialize navigate function
  // //   const Home = ()=>{
  // //   navigate("/"); // Navigate to the Signup page
  // // }
  return (
    <nav className="fixed h-[7vh] w-full shadow-lg rounded-none top-0 left-0 bg-[#111827] outline-1 outline-[#d1d5db]">
      <header className="flex justify-between items-center h-full px-5">
        {/* Left Side: Title & Menu Button */}
        <div className="title flex items-center gap-2">
          <button
            onClick={OpenSidebar} // ✅ Now correctly calls the function
            className="options-BTN flex items-center justify-center  hover:bg-[#9ca3af] hover:text-black p-2 rounded-md text-[#9ca3af]"
          >
            <Menu className="transition-all duration-300" />
          </button>
          <h1 className="text-[1rem] text-[#ffffff] font-bold flex items-center transition-all duration-300">
            TaskMaster
          </h1>
        </div>
        
      </header>
    </nav>
  );
}

NoAuthNav.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,  // ✅ Ensure it's a function
};

export default NoAuthNav;


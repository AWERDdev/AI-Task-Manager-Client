import PropTypes from 'prop-types';
function SideBar({CloseSidebar}) {
  return (
    <main className="h-full w-[70%] shadow-lg rounded-none top-0 left-0 bg-[#111827] outline-1 outline-[#d1d5db] p-5">
      {/* Close Button */}
      <div className="CloseButton flex justify-end mb-3">
        <button onClick={CloseSidebar} className="text-gray-400 border-2 border-white  outline-2 outline-gray-500 rounded-md w-5 h-5 p-3 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-gray-300 hover:outline-gray-300">
          X
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="Links grid gap-5 ml-5">
        <a href="/Intro" className="text-lg text-blue-500 font-extrabold hover:no-underline">
          Home
        </a>
        <a href="/Login" className="text-lg text-white font-extrabold hover:text-blue-500 no-underline hover:no-underline">
          Login
        </a>
        <a href="/Signup" className="text-lg text-white font-extrabold hover:text-blue-500 no-underline hover:no-underline">
          Sign Up
        </a>
        <a href="https://github.com/AWERDdev" className="text-lg text-white font-extrabold hover:text-blue-500 no-underline hover:no-underline">
          AWERDdev
        </a>
        <a href="https://github.com/AWERDdev/AI-Task-Manager" className="text-lg text-white font-extrabold hover:text-blue-500 no-underline hover:no-underline">
          AppRepo
        </a>
      </div>
    </main>
  );
}
SideBar.propTypes = {
  CloseSidebar: PropTypes.func.isRequired,
};
export default SideBar;

import { FaSignOutAlt, FaUser, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useUser } from "../Tools/FetchUserData";
import { usePasswordValidation,useBiosValidation } from "../Tools/validationUtils";
import {handlePasswordErrors,sendNewPassword,sendBios} from "../Tools/authUtils";
// import { useState } from "react";
function Profile() {
  const { user, loading, logoutUser } = useUser();
  const {
    password,
    setPassword,
    errors,
    setErrors,
    validatePassword,
  } = usePasswordValidation();

 // Bios validation state
 const { bios, setBios,  setBiosErrors, validateBios } = useBiosValidation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/Intro");
  };

  const goToLogin = () => {
    navigate("/Login");
  };
  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
  
    if (validatePassword()) {
      console.log("Valid data, sending to backend...");
  
      try {
        const result = await sendNewPassword(password);
  
        if (result.success) {
          console.log("Password updated successfully");
          setErrors({}); // Clear errors on success
        } else {
          console.error("Password update failed:", result.message);
          const newErrors = handlePasswordErrors(result);
          console.log("New Errors:", newErrors); // Debugging
          setErrors(newErrors);
        }
      } catch (error) {
        console.error("Request failed:", error);
        setErrors({ password: "Something went wrong. Please try again later." });
      }
    }
  };
  
// Handle bios update submission
const handleSubmitBios = async (e) => {
  e.preventDefault();
  console.log("Submit bios button clicked");

  if (validateBios()) {
    console.log("Valid bios, sending to backend...", bios);

    try {
      console.log("Before calling sendBios");
      const result = await sendBios(bios);
      console.log("After calling sendBios, result:", result);
      if (result.success) {
        console.log("Bios updated successfully");
        // Optionally refresh user data or show success message
      } else {
        console.error("Bios update failed:", result.message);
        setBiosErrors({ bios: result.message || "Failed to update bio" });
      }
    } catch (error) {
      console.error("Request failed in handleSubmitBios:", error);
      setBiosErrors({ bios: "Something went wrong. Please try again later." });
    }
  } else {
    console.log("Bios validation failed");
  }
};

  return (
    <main className=" relative bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100 w-screen h-screen overflow-hidden text-gray-300 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col w-64 min-h-screen h-screen bg-gray-900 p-30 items-center shadow-lg">
        <aside className="hidden lg:flex lg:flex-col w-64 min-h-screen h-screen bg-gray-900 p-3 items-center shadow-lg">
          <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold">{user ? user.name || "User" : "Guest"}</h2>
          <p className="text-gray-400 text-sm">{user ? user.email : "Not logged in"}</p>
          <nav className="mt-6 w-full">
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg cursor-pointer">
                <FaUser /> <span>Account</span>
              </li>
              {user ? (
                <li
                  className="hover:bg-red-600 cursor-pointer ml-3 flex items-center space-x-2 justify-start py-2 rounded-lg"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </li>
              ) : (
                <li
                  onClick={goToLogin}
                  className="hover:bg-blue-600 cursor-pointer ml-3 flex items-center space-x-2 justify-start py-2 rounded-lg"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </li>
              )}
            </ul>
          </nav>
        </aside>
      </div>


      <section className="flex-1 p-2">
        {loading ? (
          <div className="text-center py-10">Loading user data...</div>
        ) : (
          <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-2 rounded">{user?.name || "Guest"}</div>
                <div className="bg-gray-700 p-2 rounded">{user?.username || "Guest"}</div>
                <div className="bg-gray-700 p-2 rounded col-span-1 md:col-span-2">{user?.email || "Guest@gmail.com"}</div>
                <label htmlFor="BiosBar">Bios</label>
                <div className="bg-gray-700 p-2 rounded col-span-1 md:col-span-2 resize-none">{user?.Bios}</div>
                <textarea id="BiosBar"className="bg-gray-700 p-2 rounded col-span-1 md:col-span-2 resize-none"rows="4"value={bios}  onChange={(e) => setBios(e.target.value)} placeholder="Enter your new bio  here..."></textarea>
                {errors.bios && <p className="text-red-500 text-xs">{errors.bios}</p>}
                <button onClick={handleSubmitBios} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-1 md:col-span-2">
                  Save Bios
                </button>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl mb-4">Password</h2>
              <div className="grid grid-cols-1  gap-4">
                <input type="password" placeholder="New Password" className="bg-gray-700 p-2 w-full rounded col-span-1 md:col-span-2"value={password} onChange={(e)=>setPassword(e.target.value)} />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                <button onClick={handleSubmitNewPassword} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-1 md:col-span-2">
                  Update Password
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;
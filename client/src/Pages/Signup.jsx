// import { useState } from "react";
import NavBarNoOutline from "../Components/NavBarNoOutline";
import SideBar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";

// Import our utility functions
import { useForm, validateSignupForm } from "../Tools/validationUtils";
import { sendSignupData } from "../Tools/authUtils";
import { useSidebar } from "../tools/sidebarUtils";

function Signup() {
  // Use our sidebar utility
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  
  const navigate = useNavigate();
  
  const goToDashboard = () => {
    navigate("/"); // Navigate to the dashboard page
  };
  
  // Use our form utility
  const initialValues = {
    Username: "",
    fullName: "",
    email: "",
    password: "",
    termsAccepted: false,
  };
  
  const { 
    formData, 
    errors, 
    handleChange, 
    validateForm, 
    setErrors 
  } = useForm(initialValues, validateSignupForm);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Valid data, sending to backend...');
  
      const result = await sendSignupData(formData);
      if (result.success) {
        console.log('Signup successful');
        goToDashboard();
      } else {
        console.log('Signup failed:', result.message);
        setErrors((prev) => ({ ...prev, email: result.message }));
      }
    }
  };

  return (
    <>
      <main className="relative w-screen h-screen overflow-hidden ">
        <header>
          <NavBarNoOutline OpenSidebar={openSidebar} />
        </header>

        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
            onClick={closeSidebar}
          ></div>
        )}

        <section
          className={`fixed h-full w-[70%] max-w-[300px] shadow-lg top-0 left-0 transition-transform duration-300 z-20 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar CloseSidebar={closeSidebar} />
        </section>

        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
          <div className="bg-[#111827] p-10 rounded-lg shadow-lg  w-[30%] min-w-[400px]">
            <div className="text-center mb-6">
              <h2 className="text-white text-2xl font-bold">Create an account</h2>
              <p className="text-gray-400 text-sm">Join TaskMaster and start organizing your life</p>
            </div>

            <form className="grid gap-5 w-full" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="text-white text-[1rem]">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="Username" className="text-white text-[1rem]">Username</label>
                <input
                  type="text"
                  id="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  placeholder="JohnDoey"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.Username && <p className="text-red-500 text-xs">{errors.Username}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-white text-[1rem]">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="text-white text-[1rem]">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="●●●●●●●●"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-lg cursor-pointer bg-[#111827]"
                />
                <label htmlFor="termsAccepted" className="text-gray-400 text-sm">
                  I agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Create Account
              </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
              Already have an account? <a href="/login" className="text-blue-500">Log in</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;
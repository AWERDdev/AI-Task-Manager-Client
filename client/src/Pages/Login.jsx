import NavBarNoOutline from "../Components/NavBarNoOutline";
import SideBar from "../Components/SideBar";

// Import our utility functions
import { useSidebar } from "../tools/sidebarUtils";
import { useNavigation } from "../tools/navigationUtils";
import { useFormValidation } from "../tools/validationUtils";
import { sendLoginData, handleLoginErrors } from "../tools/authUtils";

function Login() {
  // Use our custom hooks
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const { goToDashboard } = useNavigation();
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    validateForm
  } = useFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Valid data, sending to backend...");

      try {
        const result = await sendLoginData(email, password);

        if (result.success) {
          console.log("Login successful");
          goToDashboard(); // Navigate to the next page after login
        } else {
          console.error("Login failed:", result.message);
          setErrors((prev) => {
            console.log("Received error:", result); // Debugging
            return { ...prev, ...handleLoginErrors(result) };
          });
        }
      } catch (error) {
        console.error("Request failed:", error);
        setErrors((prev) => ({
          ...prev,
          email: "Something went wrong. Please try again later.",
          password: "",
        }));
      }
    }
  };

  return (
    <>
      <main className="relative w-screen h-screen overflow-hidden">
        {/* Navbar */}
        <header>
          <NavBarNoOutline OpenSidebar={openSidebar} />
        </header>

        {/* Sidebar Overlay */}
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <section
          className={`fixed h-full w-[70%] max-w-[300px] shadow-lg top-0 left-0 transition-transform duration-300 z-20 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar CloseSidebar={closeSidebar} />
        </section>

        {/* Login Form */}
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
          <div className="bg-[#111827] p-10 rounded-lg shadow-lg  w-[30%] min-w-[400px]">
            {/* Title Section */}
            <div className="text-center mb-10">
              <h2 className="text-white text-2xl">Welcome back</h2>
              <p className="text-white text-[1rem]">Log in to your TaskMaster account</p>
            </div>

            {/* Input Fields */}
            <form onSubmit={handleSubmit} className="grid gap-5 w-full">
              {/* Email Input */}
              <div>
                <label htmlFor="EmailInput" className="text-white text-[1rem]">Email Address</label>
                <input
                  type="email"
                  id="EmailInput"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="PasswordInput" className="text-white text-[1rem]">Password</label>
                <input
                  type="password"
                  id="PasswordInput"
                  placeholder="●●●●●●●●"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Login
                </button>
                <p className="text-center mt-4 text-gray-600">
                  Dont have an account? <a href="/Signup" className="text-blue-500">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
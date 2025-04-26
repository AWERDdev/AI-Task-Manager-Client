import { useNavigate } from "react-router-dom";

/**
 * Navigation utility functions
 * @returns {Object} Navigation functions
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  
  const goToSignup = () => navigate("/Signup");
  const goToLogin = () => navigate("/login");
  const goToDashboard = () => navigate("/App");
  const goToCreateTask = () => navigate("/CreateTask");
  const gotToProfile = () => navigate("/profile");
  const goToIntro = () => navigate("/");
  return {
    navigate,
    goToSignup,
    goToLogin,
    goToDashboard,
    goToCreateTask,
    gotToProfile,
    goToIntro
  };
};
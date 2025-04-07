import { useState } from "react";

/**
 * Hook to manage sidebar state
 * @returns {Object} Sidebar state and control functions
 */
export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  
  return {
    isOpen,
    openSidebar,
    closeSidebar
  };
};
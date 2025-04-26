// import { useState } from "react";
import NoAuthNavNoOutline from "../Components/NoAuthNavNoOutline";
import NoAuthSideBar from "../Components/SideBar";

// tools
import { useSidebar } from "../Tools/sidebarUtils";
import {
  useTaskFormValidation,
  sendTaskData,
  handleTaskErrors,
} from "../Tools/CreateTaskUtils";
import { useNavigation } from "../Tools/navigationUtils";

function Task() {
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const {
    Title,
    setTitle,
    Description,
    setDescription,
    errors,
    setErrors,
    validateForm,
    setPriority,
    setType,
    Priority,
    Type,
    setTask,
    Due,
    setDue,
  } = useTaskFormValidation();
  const { goToDashboard } = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Valid data, sending to backend...");

      try {
        console.log("Sending results");
        const result = await sendTaskData(
          Title,
          Description,
          Priority,
          Type,
          Due
        );
        console.log("Results received");

        if (result.success) {
          console.log("Task created successfully");
          goToDashboard();
        } else {
          console.error("Failed to create task:", result.message);
          setErrors((prev) => {
            console.log("Received error:", result);
            return { ...prev, ...handleTaskErrors(result) };
          });
        }
      } catch (error) {
        console.error("Request failed:", error);
        setErrors((prev) => ({
          ...prev,
          Title: "Something went wrong. Please try again later.",
        }));
      }
    }
  };

  return (
    <>
      <main className="relative w-screen h-screen overflow-hidden">
        {/* Navbar */}
        <header>
          <NoAuthNavNoOutline OpenSidebar={openSidebar} />
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
          <NoAuthSideBar CloseSidebar={closeSidebar} />
        </section>

        {/* Task Creation Form */}
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
          <div className="bg-[#111827] p-10 rounded-lg shadow-lg mt-10 w-[30%] min-w-[400px]">
            {/* Title Section */}
            <div className="text-center">
              <h2 className="text-white text-2xl">Create Task</h2>
            </div>

            {/* Task Form */}
            <form className="grid gap-5 w-full">
              {/* Task Name */}
              <div>
                <label htmlFor="TaskName" className="text-white text-[1rem]">
                  Task Name
                </label>
                <input
                  type="text"
                  id="TaskName"
                  placeholder="Enter task name"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  value={Title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTask((prev) => ({ ...prev, title: e.target.value }));
                  }}
                />
                <label htmlFor="TaskName" className="text-red-500">
                  {errors.title}
                </label>
              </div>

              {/* Task Description */}
              <div>
                <label htmlFor="TaskDescription" className="text-white text-[1rem]">
                  Description
                </label>
                <textarea
                  id="TaskDescription"
                  placeholder="Enter task description"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                  value={Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setTask((prev) => ({
                      ...prev,
                      Description: e.target.value,
                    }));
                  }}
                />
                <label htmlFor="TaskDescription" className="text-red-500">
                  {errors.description}
                </label>
              </div>

              {/* Task Priority */}
              <div>
                <label htmlFor="TaskPriority" className="text-white text-[1rem]">
                  Priority
                </label>
                <select
                  id="TaskPriority"
                  className="w-full px-3 py-2 bg-[#1f2937] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500"
                  value={Priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    setTask((prev) => ({ ...prev, priority: e.target.value }));
                  }}
                >
                  <option value="" disabled>
                    Priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <label htmlFor="TaskPriority" className="text-red-500">
                  {errors.Priority}
                </label>
              </div>

              {/* Task Type & Due Date */}
              <div className="grid gap-3">
                <select
                  value={Type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setTask((prev) => ({ ...prev, type: e.target.value }));
                  }}
                  className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md"
                >
                  <option value="">All Tags</option>
                  <option value="Work">Work</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Health">Health</option>
                  <option value="Personal">Personal</option>
                </select>
                <select
                  value={Due}
                 onChange={(e) => {
    setDue(e.target.value);
    setTask((prev) => ({ ...prev, due: e.target.value }));
  }}
  className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md"
>
  <option value="">Due Date</option>
  <option value="Now">Now</option>
  <option value="Today">Today</option>
  <option value="Tomorrow">Tomorrow</option>
  <option value="In_3_days">In 3 Days</option>
  <option value="In_a_week">In A Week</option>
  <option value="In_2_weeks">In 2 Weeks</option>
  <option value="In_a_month">In A Month</option>
  <option value="No_deadline">No Deadline</option>
</select>

                <label htmlFor="TaskDue" className="text-red-500">
                  {errors.Due}
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Task;

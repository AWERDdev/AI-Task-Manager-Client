import "./App.css";
import NoAuthNavNoOutline from "./Components/NoAuthNavNoOutline";
import NoAuthSideBar from "./Components/NoAuthSideBar";
import MainAppSideBar from "./Components/MainAppSideBar";
import Button from "./Components/Button";
import TaskCard from "./Components/TaskCard";
import { useEffect, useState, useCallback } from "react";
import { useSidebar } from "./Tools/sidebarUtils";
import { useNavigation } from "./Tools/navigationUtils";
import { RequestTasks, DeleteTask } from "./Tools/TaskRequester";
import { TokenRequest, CombinedSearch } from "./Tools/SearchRequester";
import debounce from "lodash.debounce";

function App() {
  const { isOpen, openSidebar, closeSidebar } = useSidebar();
  const { goToCreateTask } = useNavigation();
  const [Tasks, setTasks] = useState([]);
  const [SearchInput, setSearchInput] = useState("");

  // New filter state
  const [priorityFilter, setPriorityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");

  // Filtered tasks state (to avoid re-filtering on every render)
  const [filteredTasks, setFilteredTasks] = useState([]);

// Apply all filters to the tasks
const applyFilters = useCallback(() => {
  let result = [...Tasks]; // Start with all tasks
  
  // Apply priority filter
  if (priorityFilter) {
    result = result.filter(task => 
      task.importance && task.importance.toLowerCase() === priorityFilter.toLowerCase()
    );
  }
  
  // Apply type/tag filter
  if (typeFilter) {
    result = result.filter(task => 
      task.type && task.type.toLowerCase() === typeFilter.toLowerCase()
    );
  }
  
  // Apply due date filter
  if (dueDateFilter) {
    result = result.filter(task => {
      // Handle the case where Due is empty or "No due date" or "No_deadline"
      if (!task.Due || task.Due === "No due date" || task.Due === "No_deadline") {
        return dueDateFilter === "No_deadline";
      }
      
      // For all other cases, just do a direct string comparison
      return task.Due === dueDateFilter;
    });
  }
  
  setFilteredTasks(result);
}, [Tasks, priorityFilter, typeFilter, dueDateFilter]);

// Call applyFilters whenever Tasks or filters change
useEffect(() => {
  applyFilters();
}, [Tasks, priorityFilter, typeFilter, dueDateFilter, applyFilters]);

// Rest of your existing code...
  const removeTask = async (taskId) => {
    const updatedTasks = Tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      const result = await DeleteTask(taskId);
      if (!result.success) {
        RequestUsersTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      RequestUsersTasks();
    }
  };

  const RequestUsersTasks = async () => {
    try {
      const result = await RequestTasks();
      setTasks(Array.isArray(result.tasks) ? result.tasks : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const performSearch = async () => {
    try {
      if (!SearchInput.trim()) return RequestUsersTasks();

      const result = await CombinedSearch(SearchInput);
      setTasks(Array.isArray(result.tasks) ? result.tasks : []);

      if (!result.success && Tasks.length === 0) {
        RequestUsersTasks();
      }
    } catch (error) {
      console.error("Error searching tasks:", error);
      if (Tasks.length === 0) {
        RequestUsersTasks();
      }
    }
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      if (SearchInput.trim()) {
        performSearch();
      } else {
        RequestUsersTasks();
      }
    }, 500),
    [SearchInput]
  );

  const TokenSending = async () => {
    try {
      const result = await TokenRequest();
      if (result.success) {
        console.log("Index building successful:", result.message);
      } else {
        console.log("Index building failed:", result.message);
      }
    } catch (error) {
      console.error("Error building search index:", error);
    }
  };

  useEffect(() => {
    RequestUsersTasks();
    TokenSending();
  }, []);

  return (
    <main className="relative bg-[#111827] w-screen h-screen overflow-x-hidden text-gray-300">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[#0f172a] shadow-md">
        <NoAuthNavNoOutline OpenSidebar={openSidebar} />
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`fixed h-full w-[280px] bg-[#1f2937] shadow-lg top-0 left-0 transition-transform duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NoAuthSideBar CloseSidebar={closeSidebar} />
      </section>

      {/* Main Content */}
      <div className="pl-5 lg:pl-[300px] pt-[70px] pr-5">
  <section className="mb-4">
    <MainAppSideBar 
      // Search props - these were reversed
      searchInput={SearchInput}
      setSearchInput={setSearchInput}
      performSearch={performSearch}
      requestUsersTasks={RequestUsersTasks}
      
      // Filter props
      priorityFilter={priorityFilter}
      setPriorityFilter={setPriorityFilter}
      typeFilter={typeFilter}
      setTypeFilter={setTypeFilter}
      dueDateFilter={dueDateFilter}
      setDueDateFilter={setDueDateFilter}
      
      // Task stats - these need to be calculated
      totalTasks={Tasks.length}
      filteredTasksCount={filteredTasks.length}
    />
  </section>


        {/* Header */}
        <section className="flex justify-between items-center mt-4">
          <h1 className="text-white text-[1.8rem] font-bold">My Tasks</h1>
          <Button text="+ Add Task" buttonClick={goToCreateTask} />
        </section>

        {/* Search and Filters */}
        <section className="mt-6">
          <div className="w-auto grid justify-center bg-[#1f2937] p-4 rounded lg:flex gap-4 relative">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              className="w-full px-3 py-2 bg-[#374151] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500 pr-10 relative"
              value={SearchInput}
              onChange={(e) => {
                const value = e.target.value;
                setSearchInput(value);
                debouncedSearch();
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  performSearch();
                }
              }}
            />
            {SearchInput && (
              <button
                className="  text-gray-400 hover:text-white"
                onClick={() => {
                  setSearchInput("");
                  RequestUsersTasks();
                }}
              >
                ✕
              </button>
            )}

<select 
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value)}
  className="cursor-pointer p-2 bg-[#374151] text-white border-none rounded-md"
>
  <option value="">All Priorities</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>

<select 
  value={typeFilter}
  onChange={(e) => setTypeFilter(e.target.value)}
  className="p-2 cursor-pointer bg-[#374151] text-white border-none rounded-md"
>
  <option value="">All Tags</option>
  <option value="Work">Work</option>
  <option value="Urgent">Urgent</option>
  <option value="Health">Health</option>
  <option value="Personal">Personal</option>
</select>
<select 
  value={dueDateFilter}
  onChange={(e) => setDueDateFilter(e.target.value)}
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

<div className="flex items-center mt-2">
  {(priorityFilter || typeFilter || dueDateFilter) && (
    <button
      onClick={() => {
        setPriorityFilter("");
        setTypeFilter("");
        setDueDateFilter("");
      }}
      className="p-2 w-full cursor-pointer bg-[#374151] text-white border-none rounded-md"
    >
      Clear Filters
    </button>
  )}
</div>

          </div>
        </section>

{/* Task Cards */}
<section className="mt-6">
  {filteredTasks.length > 0 ? (
    filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        title={task.TaskTitle}
        description={task.Task}
        priority={task.importance}
        type={task.type}
        dueDate={task.Due}
        RemoveTaskBTN={removeTask}
      />
    ))
  ) : (
    <p className="text-gray-400 flex justify-center">
      {Tasks.length > 0 
        ? "No tasks match your current filters." 
        : "No tasks found."}
    </p>
  )}
</section>

      </div>
    </main>
  );
}

export default App;

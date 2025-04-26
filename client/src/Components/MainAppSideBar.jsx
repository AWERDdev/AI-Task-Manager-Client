import PropTypes from 'prop-types';
import Button from "./Button";
import { useNavigation } from "../Tools/navigationUtils";

function MainAppSideBar({
  // Search props
  searchInput,
  setSearchInput,
  performSearch,
  requestUsersTasks,
  
  // Filter props
  priorityFilter,
  setPriorityFilter,
  typeFilter,
  setTypeFilter,
  dueDateFilter,
  setDueDateFilter,
  
  // Task stats
  totalTasks,
  filteredTasksCount
}) {
  const { goToCreateTask } = useNavigation();

  return (
    <main className="fixed hidden lg:grid overflow-auto top-[7vh] left-0 h-[calc(100vh-7vh)] w-[20%] shadow-lg bg-[#111827] outline-1 outline-gray-600 p-5 z-40">
      {/* Close Button */}
      <div className="TopSide flex justify-between mb-3">
        <h1 className="text-white text-[1.5rem] font-extrabold mb-4">Tasks</h1>
        <Button text="+ New" buttonClick={goToCreateTask} />
      </div>
      
      {/* Sidebar Filters */}
      <div className="Filters grid gap-4 ml-2">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            className="w-full px-3 py-2 bg-[#374151] text-gray-300 border-none rounded-md focus:ring-2 focus:ring-blue-500 pr-10"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                performSearch();
              }
            }}
          />
          {searchInput && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => {
                setSearchInput("");
                requestUsersTasks();
              }}
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Task Status Filters */}
        <div className="space-y-2">
          <h2 className="text-gray-400 mb-1">Status</h2>
          <button 
            className={`flex items-center p-2 ${dueDateFilter === "" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => {
              setDueDateFilter("");
              setPriorityFilter("");
              setTypeFilter("");
            }}
          >
            📌 All Tasks
            <span className="ml-auto bg-gray-700 px-2 py-0.5 rounded-full text-xs">
              {totalTasks}
            </span>
          </button>
          <button 
  className={`flex items-center p-2 ${dueDateFilter === "Now" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("Now")}
>
  📅 Now
</button>
<button 
  className={`flex items-center p-2 ${dueDateFilter === "Today" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("Today")}
>
  📅 Today
</button>
<button 
  className={`flex items-center p-2 ${dueDateFilter === "Tomorrow" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("Tomorrow")}
>
  📅 Tomorrow
</button>

          <button 
  className={`flex items-center p-2 ${dueDateFilter === "In_3_days" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("In_3_days")}
>
  📅 In 3 Days
</button>
<button 
  className={`flex items-center p-2 ${dueDateFilter === "In_a_week" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("In_a_week")}
>
  📅 In A Week
</button>
<button 
  className={`flex items-center p-2 ${dueDateFilter === "In_2_weeks" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("In_2_weeks")}
>
  📅 In 2 Weeks
</button>
<button 
  className={`flex items-center p-2 ${dueDateFilter === "In_a_month" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("In_a_month")}
>
  📅 In A Month
</button>
<button 
  className={`flex items-center p-2 ${dueDateFilter === "No_deadline" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
  onClick={() => setDueDateFilter("No_deadline")}
>
  📅 No Deadline
</button>

        </div>
        
        {/* Priority Filters */}
        <h2 className="text-gray-400 mt-3">Priorities</h2>
        <div className="space-y-2">
          <button 
            className={`flex items-center p-2 ${priorityFilter === "low" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setPriorityFilter(priorityFilter === "low" ? "" : "low")}
          >
            🔵 Low
          </button>
          <button 
            className={`flex items-center p-2 ${priorityFilter === "medium" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setPriorityFilter(priorityFilter === "medium" ? "" : "medium")}
          >
            🟡 Medium
          </button>
          <button 
            className={`flex items-center p-2 ${priorityFilter === "high" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setPriorityFilter(priorityFilter === "high" ? "" : "high")}
          >
            🔴 High
          </button>
        </div>
        
        {/* Tags */}
        <h2 className="text-gray-400 mt-3">Tags</h2>
        <div className="space-y-2">
          <button 
            className={`flex items-center p-2 ${typeFilter === "Work" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setTypeFilter(typeFilter === "Work" ? "" : "Work")}
          >
            🎯 Work
          </button>
          <button 
            className={`flex items-center p-2 ${typeFilter === "Urgent" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setTypeFilter(typeFilter === "Urgent" ? "" : "Urgent")}
          >
            ⚠️ Urgent
          </button>
          <button 
            className={`flex items-center p-2 ${typeFilter === "Personal" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setTypeFilter(typeFilter === "Personal" ? "" : "Personal")}
          >
            💙 Personal
          </button>
          <button 
            className={`flex items-center p-2 ${typeFilter === "Health" ? "bg-[#1e3a8a]" : "bg-[#1f2937]"} text-white rounded w-full hover:bg-[#374151]`}
            onClick={() => setTypeFilter(typeFilter === "Health" ? "" : "Health")}
          >
            🏥 Health
          </button>
        </div>
        
        {/* Clear Filters Button */}
        {(priorityFilter || typeFilter || dueDateFilter) && (
          <button
            className="mt-4 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={() => {
              setPriorityFilter("");
              setTypeFilter("");
              setDueDateFilter("");
            }}
          >
            Clear All Filters
          </button>
        )}
        
        {/* Filter Stats */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredTasksCount} of {totalTasks} tasks
        </div>
      </div>
    </main>
  );
}

MainAppSideBar.propTypes = {
  // Search props
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
  requestUsersTasks: PropTypes.func.isRequired,
  
  // Filter props
  priorityFilter: PropTypes.string.isRequired,
  setPriorityFilter: PropTypes.func.isRequired,
  typeFilter: PropTypes.string.isRequired,
  setTypeFilter: PropTypes.func.isRequired,
  dueDateFilter: PropTypes.string.isRequired,
  setDueDateFilter: PropTypes.func.isRequired,
  
  // Task stats
  totalTasks: PropTypes.number.isRequired,
  filteredTasksCount: PropTypes.number.isRequired
};

export default MainAppSideBar;

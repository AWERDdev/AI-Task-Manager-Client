import PropTypes from "prop-types";

function TaskCard({ id, title, description, dueDate, type, priority, RemoveTaskBTN }) {
  return (
    <div className="bg-[#1f2937] p-4 rounded-md mb-3">
      <button 
        onClick={() => RemoveTaskBTN(id)} 
        className="flex justify-self-end p-0 m-0"
      >
        X
      </button>
      <h2 className="text-white font-semibold">{title}</h2>
      <p className="text-gray-400">{description}</p>
      <p className="text-sm text-gray-400 mt-2 flex gap-2">
        <span className="bg-blue-600 text-white px-2 py-1 rounded">{priority}</span>
        <span className="bg-gray-600 text-white px-2 py-1 rounded">{type}</span>
        <span className="ml-2 mt-1">📅 {dueDate}</span>
      </p>
    </div>
  );
}

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  RemoveTaskBTN: PropTypes.func.isRequired,
};

export default TaskCard;
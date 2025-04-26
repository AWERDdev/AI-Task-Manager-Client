import PropTypes from 'prop-types';

function Cards({ title, description, Icon }) {
  return (
    <div className="card bg-white p-5 rounded-lg shadow-lg">
      <div className="icon text-blue-500">
        {Icon} {/* Render the icon directly */}
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.element.isRequired, // Change from string to element
};

export default Cards;

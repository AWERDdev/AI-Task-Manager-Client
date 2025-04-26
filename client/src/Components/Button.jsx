import PropTypes from 'prop-types';
function Button({text, buttonClick}) {
    return (
        <>
        <button onClick={buttonClick} className="w-5 h-[5vh] flex items-center justify-center gap-2 text-[1rem] text-black  px-6 py-3 min-w-[130px] max-w-[200px] bg-[#1e3a8a] rounded-md hover:bg-blue-500 transition-all duration-300">
            {text}
        </button>
      </>  
     )
}
Button.propTypes = {
    text: PropTypes.string.isRequired,
    buttonClick: PropTypes.func,
};
export default Button;
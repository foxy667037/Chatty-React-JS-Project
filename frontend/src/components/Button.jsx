import PropTypes from "prop-types";

const Button = ({
  onClick,
  content,
  agree = true,
  isFormDataEmpty,
  primaryColor,
  disabledColor,
  secondaryColor, 
  disabled,
  type,
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center gap-1 font-semibold text-white py-2 px-4 rounded-lg transition-all ${
        primaryColor && disabledColor
          ? !agree || isFormDataEmpty
            ? `cursor-not-allowed ${disabledColor}`
            : `${primaryColor} cursor-pointer`
          : secondaryColor 
      } hover:${disabledColor}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  type: PropTypes.string,
  disabledColor: PropTypes.string,
  disabled: PropTypes.bool,
  content: PropTypes.node,
  onClick: PropTypes.func,
  agree: PropTypes.bool,
  isFormDataEmpty: PropTypes.bool,
};

export default Button;

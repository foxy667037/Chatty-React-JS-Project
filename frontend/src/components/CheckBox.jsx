import PropTypes from "prop-types";

const colorMap = {
  red: {
    bg: "checked:bg-red-600",
    ring: "focus:ring-red-500",
  },
  indigo: {
    bg: "checked:bg-indigo-600",
    ring: "focus:ring-indigo-500",
  },
  gray: {
    bg: "checked:bg-gray-500",
    ring: "focus:ring-gray-500",
  },
};

const CheckBox = ({ text, agree, onChange, color = "indigo" }) => {
  const { bg, ring } = colorMap[color] || colorMap["indigo"];

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
      <div className="relative flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          className={`peer appearance-none w-5 h-5 border border-gray-300 rounded-md bg-white ${bg} checked:border-transparent ${ring} transition duration-200`}
          checked={agree}
          onChange={onChange}
        />
        <svg
          className="absolute w-3 h-3 text-white opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      {text}
    </label>
  );
};

CheckBox.propTypes = {
  text: PropTypes.node,
  color: PropTypes.oneOf(["red", "indigo", "gray"]),
  agree: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckBox;

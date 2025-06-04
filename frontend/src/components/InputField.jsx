import PropTypes from "prop-types";

const InputField = ({
  Icon,
  IconSize,

  data,
  onChange,
  InputType,
  placeholder,

  activeTextColor,
  unActiveTextColor,

  activeBorderColor,
  unActiveBorderColor,

  inputCaretColor,
  inputBackGroundColor,
}) => {
  return (
    <>
      <div className="relative">
        <Icon
          className={`absolute top-1/2 transform -translate-y-1/2 text-${unActiveTextColor} ${
            data ? `text-${activeTextColor}` : `text-${unActiveTextColor}`
          }`}
          size={IconSize}
        />
        <input
          type={InputType}
          placeholder={placeholder}
          className={`w-full border-b border-${unActiveBorderColor} bg-${inputBackGroundColor} caret-${inputCaretColor} text-${unActiveTextColor} px-10 py-2 text-sm focus:outline-none focus:border-b-${activeBorderColor} ${
            data
              ? `text-${activeTextColor} border-b-${activeBorderColor}`
              : `text-${unActiveTextColor} border-b-${unActiveBorderColor}`
          }`}
          required
          value={data}
          onChange={onChange}
        />
      </div>
    </>
  );
};

InputField.propTypes = {
  Icon: PropTypes.string,
  IconSize: PropTypes.string,

  data: PropTypes.string,
  onChange: PropTypes.func,
  InputType: PropTypes.string,
  placeholder: PropTypes.string,

  activeTextColor: PropTypes.string,
  unActiveTextColor: PropTypes.string,

  activeBorderColor: PropTypes.string,
  unActiveBorderColor: PropTypes.string,

  inputCaretColor: PropTypes.string,
  inputBackGroundColor: PropTypes.string,
};

export default InputField;

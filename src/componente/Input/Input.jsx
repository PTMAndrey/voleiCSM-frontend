import React from "react";
import styles from "./Input.module.scss";
import PropTypes from "prop-types";

const Input = ({
  ref,
  error,
  icon,
  id,
  label,
  name,
  onBlur,
  onChange,
  onClick,
  onIconClick,
  placeholder,
  type,
  value,
  helper,
  disabled,
  min,
  title,
}) => {
  return (
    <div className={`${styles.container} ${error && styles.error}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        title={title}
        disabled={disabled}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        placeholder={placeholder}
        className={error ? styles.inputErr : null}
        type={type}
        min={min}
      />
      <span
        onClick={onIconClick}
        className={`${styles.icon} ${disabled && styles.disabled}`}
      >
        {icon}
      </span>
      <p className={error ? styles.helperErr : null}>{helper}</p>
    </div>
  );
};

Input.propTypes = {
  error: PropTypes.bool,
  icon: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  helper: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.string,
  title: PropTypes.string,
};

Input.defaultProps = {
  error: false,
  icon: null,
  id: "",
  label: "Label",
  name: "",
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onIconClick: () => {},
  placeholder: "Placeholder",
  type: "text",
  helper: "",
  disabled: false,
  min: '',
};

export default Input;

import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({
  className,
  variant,
  label,
  icon,
  position,
  disabled,
  onClick,
  iconColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[position]} ${className}`}
    >
      {
        iconColor === "black" ?  <span className={styles.displayNone}>{icon}</span>: <span className={styles.displayNone} style={{ fill:`${iconColor}`, stroke:`${iconColor}`,strokeWidth:"2"}}> {icon}</span>
      }

      <span className={styles.label}>{label}</span>
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary", "destructive","transparent"]).isRequired,
  
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  position: PropTypes.oneOf(["left", "right", "none"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconColor: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  label: "Button",
  position: "none",
  disabled: false,
  onClick: () => { },
  className: "",
  iconColor: "black",
};

export default Button;

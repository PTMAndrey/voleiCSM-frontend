import React from "react";
import { useLocation } from "react-router-dom";
import JucatorCSMLogo from "../../assets/images/logo.svg";
import LoginImage from "../../assets/images/ImagineLogin.svg";
import style from "./Onboarding.module.scss";
import LoginForm from "./Login/LoginForm";

const Onboarding = () => {
  const location = useLocation().pathname;
  return (
    <div className={style.mainContainer}>
      <img
        src={LoginImage}
        className={style.rightImageOnboarding}
        alt="Login"
      />
      <div className={style.leftSide}>
        <div className={style.contentContainer}>
          <div className={style.logoContainer}>
            <img
              src={JucatorCSMLogo}
              className={style.logoImageOnboarding}
              alt="Login Logo"
            />
          </div>
          <br />
          {location === "/login" && <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

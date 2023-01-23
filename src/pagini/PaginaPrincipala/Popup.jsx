import React from "react";
import popupstyle from "./Popup.module.scss";
const Popup = ({ content,caruselPopup }) => {
  return (
  <>
    {!caruselPopup ?
    <div className={popupstyle.popupbox}>
      <div className={popupstyle.box}>{content}</div>
    </div>
    :
    <div className={popupstyle.popupbox2}>
      <div className={popupstyle.box2}>{content}</div>
    </div>
    
    }
    </>
  );
};

export default Popup;

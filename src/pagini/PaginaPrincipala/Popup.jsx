import React from "react";
import popupstyle from "./Popup.module.scss";
const Popup = ({ content, caruselPopup, filtre, openPopup, setOpenPopup }) => {
  return (
    <>
      {filtre ?
        <div className={popupstyle.popupboxFilter} onClick={(e)=>{e.stopPropagation(); setOpenPopup(!openPopup)}}>
          <div className={popupstyle.boxFilter} onClick={(e)=>{e.stopPropagation()}}>{content}</div>
        </div>
        :
        <>
          {!caruselPopup ?
            <div className={popupstyle.popupbox} onClick={(e)=>{e.stopPropagation(); setOpenPopup(!openPopup)}}>
              <div className={popupstyle.box} onClick={(e)=>{e.stopPropagation()}}>{content}</div>
            </div>
            :
            <div className={popupstyle.popupbox2} onClick={(e)=>{e.stopPropagation(); setOpenPopup(!openPopup)}}>
              <div className={popupstyle.box2} onClick={(e)=>{e.stopPropagation()}}>{content}</div>
            </div>
          }
        </>
      }
    </>
  );
};

export default Popup;

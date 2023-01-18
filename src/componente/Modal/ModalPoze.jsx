import React from "react";
import styles from "./ModalPoze.module.scss";
import Modal from "react-bootstrap/Modal";

import { ReactComponent as LeftChevron } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";

const ModalPoze = ({ showModal, setShowModal, images }) => {
  const tempImages = { images };
  return (
    <Modal
      show={showModal}
      fullscreen={true}
      onHide={() => setShowModal(false)}
    >
      <Modal.Title className={styles.modalTitlu}>
        <LeftChevron
          className={styles.chevron}
          onClick={() => setShowModal(false)}
        />
        <div className={styles.rightButons}>
          <div className={styles.share}>
            <Share />
            <h5>Share</h5>
          </div>
          {/* <div className={styles.save}>
            {<Heart />}
            <h5>Save</h5>
          </div> */}
        </div>
      </Modal.Title>

      <Modal.Body className={styles.modalBody}>
        {images?.map((image, index) => {
          if (index === 0 || index === 3 || index === 6) {
            return (
              <div key={index} className={styles.largeImage}>
                <img src={image} alt="" />
              </div>
            );
          } else if (index === 1 || index === 4 || index === 7) {
            return (
              <div
                key={index}
                className={styles.smallImage}
                style={{ paddingLeft: "25%", paddingRight: "10px" }}
              >
                <img src={image} alt="" />
              </div>
            );
          } else if (index === 2 || index === 5 || index === 8) {
            return (
              <div
                key={index}
                className={styles.smallImage}
                style={{ paddingRight: "25%", paddingLeft: "10px" }}
              >
                <img src={image} alt="" />
              </div>
            );
          }
        })}
      </Modal.Body>
    </Modal>
  );
};

export default ModalPoze;

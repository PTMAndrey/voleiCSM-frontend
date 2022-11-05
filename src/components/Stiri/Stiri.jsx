import React, { useEffect, useState } from 'react';
import styles from "./Stiri.module.scss";
import Stire from "./Stire.jsx";
import useStateProvider from "../../hooks/useStateProvider";

const Stiri = ({
  title,
  admin,
  hideApproval,
  bgCardBlue,
  showcontrols,
}) => {
  // view
  const { setListView } = useStateProvider();
  useEffect(() => {
    setListView(false);
  }, [setListView]);
  return (
    <div className={styles.containerStiri}>
      <div>
        <h3 className={styles.title}>Noutăți</h3>
      </div>
      <div className={styles.stiriBody}>
        <div className={styles.leftSide}>
          <br/><br/><br/><br/><br/><br/><br/>
        </div>
        <div className={styles.rightSide}>
          <Stire
            showcontrols={showcontrols}
            hideApproval={hideApproval}
            admin={admin}
          />
        </div>

      </div>

    </div>
  );
};

export default Stiri
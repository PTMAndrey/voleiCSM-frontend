import React, { useEffect, useState } from 'react';
import styles from "./Stiri.module.scss";
import Stire from "./Stire.jsx";
import DropdownComponent from "../Dropdown/Dropdown";
import useStateProvider from "../../hooks/useStateProvider";
import Button from '../Button/Button';

import useAuth from '../../hooks/useAuth';

const Stiri = ({
  title,
  admin,
  hideApproval,
  showcontrols,
}) => {
  // view
  const { setListView } = useStateProvider();
  const { stiriDropdown, setStiriDropdown } = useStateProvider();
  console.log(stiriDropdown?.value, 'stiri dropdown');

  const Programare = [
    { value: "Toate", label: "Toate știrile" },
    { value: "Publicat", label: "Știri publicate" },
    { value: "Programat", label: "Știri programate" },
    { value: "Draft", label: "Știri draft" },
  ];
  useEffect(() => {
    setListView(false);
  }, [setListView]);

  const { user } = useAuth();

  return (
    <div className={styles.containerStiri}>
      <div>
        <h3 className={styles.title}>Noutăți</h3>
      </div>
      <div className={styles.stiriBody}>
        <div className={styles.leftSide}>
          <br /><br /><br /><br /><br /><br /><br />
        </div>
        <div className={styles.rightSide}>
          {user?.role != null &&
            <div className={styles.dropdownStiri}>
              <Button
                label="Adaugă știre"
                className={styles.addStire}
              />
              <DropdownComponent
                title="Toate știrile"
                options={Programare}
                onChange={(e) => {
                  setStiriDropdown(e);
                }}
              ></DropdownComponent>
            </div>
          }
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
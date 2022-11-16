import React, { useEffect } from 'react';
import styles from "./Stiri.module.scss";
import ListStiri from "./ListStiri.jsx";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import useStateProvider from "../../hooks/useStateProvider";
import Button from '../../components/Button/Button';

import useAuth from '../../hooks/useAuth';

const Stiri = () => {
  // view
  const { setListView } = useStateProvider();
  const { statusStiri, setStatusStiri, fetchStiribyStatus } = useStateProvider();

  const Programare = [
    { value: 'PUBLICAT', label: "Știri publicate" },
    { value: 'PROGRAMAT', label: "Știri programate" },
    { value: 'DRAFT', label: "Știri draft" },
    { value: 'TOATE', label: "Toate știrile" },
];
  useEffect(() => {
    setListView(false);
  }, [setListView]);

  const { user } = useAuth();
  
  useEffect(()=>{
    fetchStiribyStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[statusStiri]);

  return (
    <div className={styles.containerStiri}>
      <div>
        <h3 className={styles.title}>Noutăți</h3>
      </div>
      <div className={styles.stiriBody}>

        <div className={styles.leftSide}>
          <p>T1</p>
          <p>T1</p>
          <p>T1</p>
          <p>T1</p>
          <p>T1</p>
          <p>T1</p>
          <p>T1</p>
        </div>

        <div className={styles.rightSide}>
          {user?.role != null &&
            <div className={styles.dropdownStiri}>
              <Button
                label="Adaugă știre"
                className={styles.addStire}
              />
              <DropdownComponent
                title="Știri publicate"
                options={Programare}
                clearable={true}
                onChange={(e) => {
                  e === null ?
                    setStatusStiri('PUBLICAT') :
                  setStatusStiri(e.value);
                }}
              ></DropdownComponent>
            </div>
          }
          <ListStiri/>
        </div>

      </div>

    </div>
  );
};

export default Stiri
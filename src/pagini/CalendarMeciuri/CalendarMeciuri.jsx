import React, { useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./CalendarMeciuri.module.scss";
import ListCalendarMeciuri from "./ListCalendarMeciuri.jsx";
import DropdownComponent from "../../componente/Dropdown/Dropdown";
import useStateProvider from "../../hooks/useStateProvider";
import Buton from '../../componente/Buton/Buton';
import FiltreCalendarMeciuri from './FiltreCalendarMeciuri/FiltreCalendarMeciuri'
import useAuth from '../../hooks/useAuth';

const Stiri = () => {
  // view
  const { meciuriOrdonate, paginaCurentaMeciuri } = useStateProvider();
  const {fetchStiribyFilter, filtruMeciuri, setFiltruMeciuri} = useStateProvider();
  const { setPrevizualizare } = useStateProvider();
  const { pageSize } = useStateProvider();
  const { user } = useAuth();
  const navigate = useNavigate();

  const Programare = [
    { value: 'VIITOR', label: "Meciuri viitoare" },
    { value: 'REZULTAT', label: "Rezultate" },
    { value: 'TOATE', label: "Toate meciurile" },
  ];
  useEffect(() => {
    fetchStiribyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtruMeciuri]);
  
  const currentTableData = useMemo(() => {
      const firstPageIndex = (paginaCurentaMeciuri - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      if (meciuriOrdonate?.length < lastPageIndex && (lastPageIndex - meciuriOrdonate?.length) > 0)
          return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - meciuriOrdonate?.length));
      else
          return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex);

  }, [paginaCurentaMeciuri, pageSize, meciuriOrdonate]);

  return (
    <div className={styles.containerStiri}>
      <div>
        <h3 className={styles.title}>Calendar meciuri</h3>
      </div>
      <div className={styles.stiriBody}>

        <div className={styles.leftSide}>
            <FiltreCalendarMeciuri/>
        </div>

        <div className={styles.rightSide}>
          {user?.role !== null &&
            <div className={styles.dropdownStiri}>
              <Buton
                label="Adaugă meci"
                className={styles.addStire}
                onClick={() => {
                  setPrevizualizare({});
                  navigate("/add/meci");
                }}
              />
              <DropdownComponent
                title="Meciuri viitoare"
                options={Programare}
                clearable={true}
                onChange={(e) => {
                  e === null ?
                    setFiltruMeciuri({...filtruMeciuri, status:'VIITOR'}) :
                    setFiltruMeciuri({...filtruMeciuri, status:e.value});
                }}
              ></DropdownComponent>

            </div>
          }
          {meciuriOrdonate?.length < 1 &&
            <h2 style={{ marginTop: '25px' }}>Momentan nu există știri care să îndeplinească filtrele selectate</h2>
          }
          <ListCalendarMeciuri currentTableData={currentTableData} />
        </div>

      </div>

    </div>
  );
};

export default Stiri
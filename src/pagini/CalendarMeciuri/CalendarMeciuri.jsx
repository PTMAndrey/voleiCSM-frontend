import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./CalendarMeciuri.module.scss";
import ListCalendarMeciuri from "./ListCalendarMeciuri.jsx";
import DropdownComponent from "../../componente/Dropdown/Dropdown";
import useStateProvider from "../../hooks/useStateProvider";
import Buton from '../../componente/Buton/Buton';
import FiltreCalendarMeciuri from './FiltreCalendarMeciuri/FiltreCalendarMeciuri'
import useAuth from '../../hooks/useAuth';

const CalendarMeciuri = () => {
  // view
  const { meciuriOrdonate, paginaCurentaMeciuri } = useStateProvider();
  const {fetchMeciuribyFilter, filtruMeciuri, setFiltruMeciuri} = useStateProvider();
  const { setPrevizualizareMeciuri } = useStateProvider();
  const { pageSize } = useStateProvider();
  const { user } = useAuth();
  const navigate = useNavigate();

  const Programare = [
    { value: 'VIITOR', label: "Meciuri viitoare" },
    { value: 'REZULTAT', label: "Rezultate" },
  ];
  useEffect(() => {
    fetchMeciuribyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtruMeciuri]);

  const currentTableData = useMemo(() => {
    if(meciuriOrdonate){
      const firstPageIndex = (paginaCurentaMeciuri - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;

      // if (meciuriOrdonate?.length < lastPageIndex && (lastPageIndex - meciuriOrdonate?.length) > 0)
      //     return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - meciuriOrdonate?.length));
      //   else
      //     return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex);
      if (meciuriOrdonate?.length < lastPageIndex && (lastPageIndex - meciuriOrdonate?.length) > 0)
          return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - meciuriOrdonate?.length));
      else
          return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex);
    }
    else
      return null;

  }, [paginaCurentaMeciuri, pageSize, meciuriOrdonate]);

  return (
    <div className={styles.containerMeciuri}>
      <div>
        <h3 className={styles.title}>Calendar meciuri</h3>
      </div>
      <div className={styles.meciuriBody}>

        <div className={styles.leftSide}>
            <FiltreCalendarMeciuri/>
        </div>

        <div className={styles.rightSide}>
          {user?.role !== null &&
            <div className={styles.dropdownMeciuri}>
              <Buton
                label="Adaugă meci"
                className={styles.addMeciuri}
                onClick={() => {
                  setPrevizualizareMeciuri({});
                  navigate("/calendar/adauga");
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
          {meciuriOrdonate?.length < 1 ?
            <h2 style={{ marginTop: '25px' }}>Momentan nu există meciuri care să îndeplinească filtrele selectate</h2>
          :
          <ListCalendarMeciuri currentTableData={currentTableData} />
          }
        </div>

      </div>

    </div>
  );
};

export default CalendarMeciuri
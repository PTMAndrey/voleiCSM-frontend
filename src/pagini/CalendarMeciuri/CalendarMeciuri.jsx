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
  const {fetchStiribyFilter, filtruMeciuri, setFiltruMeciuri} = useStateProvider();
  const { setPrevizualizareMeciuri } = useStateProvider();
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

  const [meciViitor, setMeciViitor] = useState([
    {
    id:'1234',
    tipMeci:'Campionat',
    status:'VIITOR',
    data:'12-01-2023 15:30',
    numeAdversar: 'CSA Steaua Bucuresti',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'Sala de sport “Daniel Olariu”',
    scorCSM: '',
    scorAdversar: '',
    teren:'ACASA',
  },
  {
    id:'1243',
    tipMeci:'Super Cupa Romaniei',
    status:'REZULTAT',
    data:'12-08-2022 19:30',
    numeAdversar: 'CS FARUL CONSTANTA',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'“Stadionul Tineretului”',
    scorCSM: '2',
    scorAdversar: '2',
    teren:'DEPLASARE',
  },
  {
    id:'1324',
    tipMeci:'Campionat',
    status:'REZULTAT',
    data:'22-06-2022 19:30',
    numeAdversar: 'CSA Steaua Bucuresti',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'Sala de sport “Dumitru Bernicu”',
    scorCSM: '7',
    scorAdversar: '4',
    teren:'ACASA',
  },
  {
    id:'1342',
    tipMeci:'Cupa Romaniei',
    status:'VIITOR',
    data:'17-01-2023 20:00',
    numeAdversar: 'CSA Timisoara',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'Sala de sport Timisoara',
    scorCSM: '',
    scorAdversar: '',
    teren:'ACASA',
  },
  {
    id:'1423',
    tipMeci:'Campionat',
    status:'VIITOR',
    data:'23-03-2023 19:45',
    numeAdversar: 'CSS Steaua Marii',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'Terenul de sport municipal',
    scorCSM: '',
    scorAdversar: '',
    teren:'DEPLASARE',
  },
]);

  const currentTableData = useMemo(() => {
    if(meciViitor){
      const firstPageIndex = (paginaCurentaMeciuri - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;

      // if (meciuriOrdonate?.length < lastPageIndex && (lastPageIndex - meciuriOrdonate?.length) > 0)
      //     return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - meciuriOrdonate?.length));
      //   else
      //     return meciuriOrdonate?.slice(firstPageIndex, lastPageIndex);
      if (meciViitor?.length < lastPageIndex && (lastPageIndex - meciViitor?.length) > 0)
          return meciViitor?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - meciViitor?.length));
      else
          return meciViitor?.slice(firstPageIndex, lastPageIndex);
    }
    else
      return null;

  }, [paginaCurentaMeciuri, pageSize, meciViitor]);

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
          {meciViitor?.length < 1 &&
            <h2 style={{ marginTop: '25px' }}>Momentan nu există meciuri care să îndeplinească filtrele selectate</h2>
          }
          <ListCalendarMeciuri currentTableData={currentTableData} meciViitor={meciViitor} />
        </div>

      </div>

    </div>
  );
};

export default CalendarMeciuri
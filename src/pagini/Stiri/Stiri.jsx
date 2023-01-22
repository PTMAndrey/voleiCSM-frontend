import React, { useEffect, useMemo } from 'react';

import styles from "./Stiri.module.scss";
import ListStiri from "./ListStiri.jsx";
import DropdownComponent from "../../componente/Dropdown/Dropdown";
import useStateProvider from "../../hooks/useStateProvider";
import Buton from '../../componente/Buton/Buton';

import FiltreStiri from './FiltreStiri/FiltreStiri'

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const Stiri = () => {
  // view
  const { setListView, stiriOrdonate, setPrevizualizareStiri  } = useStateProvider();
  const { fetchStiribyFilter, filtruStiri, setFiltruStiri } = useStateProvider();

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchStiribyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtruStiri]);

  const { pageSize } = useStateProvider();

  // pagination - current page with the content displayed
  const { paginaCurentaStiri } = useStateProvider();

  const currentTableData = useMemo(() => {
    if (stiriOrdonate) {
      const firstPageIndex = (paginaCurentaStiri - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;

      if (stiriOrdonate?.length < lastPageIndex && (lastPageIndex - stiriOrdonate?.length) > 0)
        return stiriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - stiriOrdonate?.length));
      else
        return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);
    }
    else
      return null;
  }, [paginaCurentaStiri, pageSize, stiriOrdonate]);

  return (
    <div className={styles.containerStiri}>
      <div>
        <h3 className={styles.title}>Noutăți</h3>
      </div>
      <div className={styles.stiriBody}>

        <div className={styles.leftSide}>
          <FiltreStiri />
        </div>

        <div className={styles.rightSide}>
          {user?.role &&
            <div className={styles.dropdownStiri}>

              <Buton
                label="Adaugă știre"
                className={styles.addStire}
                onClick={() => {
                  setPrevizualizareStiri({});
                  navigate("/noutati/adauga");
                }}
              />
              <DropdownComponent
                title="Știri publicate"
                options={Programare}
                clearable={true}
                onChange={(e) => {
                  e === null ?
                    setFiltruStiri({ ...filtruStiri, status: 'PUBLICAT' }) :
                    setFiltruStiri({ ...filtruStiri, status: e.value });
                }}
              ></DropdownComponent>

            </div>
          }
          { (stiriOrdonate === null || stiriOrdonate === undefined) &&
            <h2 style={{ marginTop: '25px' }}>Momentan nu există știri care să îndeplinească filtrele selectate</h2>
          }
          {!user?.role && <div style={{ marginTop: '20px' }}></div>}
          <ListStiri currentTableData={currentTableData}/>
        </div>

      </div>

    </div>
  );
};

export default Stiri
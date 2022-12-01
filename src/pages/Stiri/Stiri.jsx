import React, { useEffect, useState, useMemo } from 'react';
import styles from "./Stiri.module.scss";
import ListStiri from "./ListStiri.jsx";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import useStateProvider from "../../hooks/useStateProvider";
import Button from '../../components/Button/Button';

import FiltreStiri from './FiltreStiri/FiltreStiri'

import useAuth from '../../hooks/useAuth';

const Stiri = () => {
  // view
  const { setListView, stiriOrdonate } = useStateProvider();
  const {fetchStiribyFilter, filtruStiri, setFiltruStiri} = useStateProvider();

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

  //grid view list view
  // const { listView } = useStateProvider();

  // pagination - current page with the content displayed
  const [currentPage, setCurrentPage] = useState(1);
  console.log("ordonate????",stiriOrdonate);

  const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;

      if (stiriOrdonate?.length < lastPageIndex && (lastPageIndex - stiriOrdonate?.length) > 0)
          return stiriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - stiriOrdonate?.length));
      else
          return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);

  }, [currentPage, pageSize, stiriOrdonate]);

  return (
    <div className={styles.containerStiri}>
      <div>
        <h3 className={styles.title}>Noutăți</h3>
      </div>
      <div className={styles.stiriBody}>

        <div className={styles.leftSide}>
          {stiriOrdonate?.length === 0 ?
            <FiltreStiri enableFilters={false} />
            :
            <FiltreStiri enableFilters={true} />
          }
        </div>

        <div className={styles.rightSide}>
          {user?.role !== null &&
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
                    setFiltruStiri({...filtruStiri, status:'PUBLICAT'}) :
                    setFiltruStiri({...filtruStiri, status:e.value});
                }}
              ></DropdownComponent>

            </div>
          }
          {stiriOrdonate?.length < 1 &&
            <h2 style={{ marginTop: '25px' }}>Momentan nu există știri care să îndeplinească filtrele selectate</h2>
          }
          <ListStiri currentTableData={currentTableData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

      </div>

    </div>
  );
};

export default Stiri
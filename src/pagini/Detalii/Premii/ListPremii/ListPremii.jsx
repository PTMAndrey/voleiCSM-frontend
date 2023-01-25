import React, { Fragment } from 'react';
import Premiu from '../DetaliiPremiu/Premiu';
import styles from './ListPremii.module.scss';
import { Col, Row } from 'react-bootstrap';
import Paginare from '../../../../componente/Paginare/Paginare';
import useStateProvider from '../../../../hooks/useStateProvider';
import { useNavigate } from 'react-router-dom';

const ListPersonal = (props) => {
  const { pageSizePremiiEchipa, paginaCurentaPremiiPersonal, setPaginaCurentaPremiiPersonal } = useStateProvider();
  const navigate = useNavigate();
  function stopPropagation(e) {
    e.stopPropagation();
  }
  let numeEchipa = String(props.numeEchipa)[0].toUpperCase() + String(props.numeEchipa).substr(1).toLowerCase();
  return (
    <>
      {props.currentTableData?.length > 1 &&
        <Paginare
          data={props.fullData}
          className="pagination-bar pt-3"
          totalCount={props.fullData?.length}
          pageSize={pageSizePremiiEchipa}
          paginaCurenta={paginaCurentaPremiiPersonal}
          onPageChange={page => setPaginaCurentaPremiiPersonal(page)}
        />
      }
      {props.currentTableData?.length > 0 ?
        <div className={styles.data}>
          <Row className={styles.dataRow}>
            {
              props.currentTableData?.map((data, index) => (
                  <Col className={styles.dataCol} key={`${data?.id}_${index + Math.random()}`} >
                    <Premiu data={data} />
                  </Col>
              ))
            }
          </Row>
        </div>
        :
        (
          (props.currentTableData === null || props.currentTableData === undefined || props.currentTableData.length === 0) &&
          <div className={styles.data}>
            <h2>Echipa „{numeEchipa}” nu deține un istoric de premii</h2>
          </div>
        )
      }

      {props.currentTableData?.length > 0 &&
        <Paginare
          data={props.fullData}
          className="pagination-bar pt-3"
          totalCount={props.fullData?.length}
          pageSize={pageSizePremiiEchipa}
          paginaCurenta={paginaCurentaPremiiPersonal}
          onPageChange={page => setPaginaCurentaPremiiPersonal(page)}
        />
      }
    </>

  )
}

export default ListPersonal
import React, { Fragment } from 'react';
import CardPersonal from '../../../componente/Card/CardPersonal';
import styles from './ListPersonal.module.scss';
import { Col, Row } from 'react-bootstrap';
import Paginare from '../../../componente/Paginare/Paginare';
import useStateProvider from '../../../hooks/useStateProvider';
import { useNavigate } from 'react-router-dom';

const ListPersonal = (props) => {
  const { pageSizePersonal, paginaCurentaPersonal, setPaginaCurentaPersonal } = useStateProvider();
  const navigate = useNavigate();
  return (
    <>
      {props.currentTableData?.length > 1 &&
        <Paginare
          data={props.fullData}
          className="pagination-bar pt-3"
          totalCount={props.fullData?.length}
          pageSize={pageSizePersonal}
          paginaCurenta={paginaCurentaPersonal}
          onPageChange={page => setPaginaCurentaPersonal(page)}
        />
      }
      {props.currentTableData?.length !== 0 ?
      <div className={styles.data}>
        <Row className={styles.dataRow}>
          {
            props.currentTableData.map((data, index) => (
              <Fragment key={`${data?.id}_${index}`}>
                <Col className={styles.dataCol} key={`${data?.id}_${index + Math.random()}`}>
                  <CardPersonal data={data} onClick={() => {
                    navigate("/personal/" + data?.id);
                  }} />
                </Col>
              </Fragment>
            ))
          }
        </Row>
      </div>
      :
        <div className={styles.data}>
          <h2>Nu există personal corespunzător filtrelor aplicate.</h2>
        </div>
      }

      {props.currentTableData?.length > 0 &&
        <Paginare
          data={props.fullData}
          className="pagination-bar pt-3"
          totalCount={props.fullData?.length}
          pageSize={pageSizePersonal}
          paginaCurenta={paginaCurentaPersonal}
          onPageChange={page => setPaginaCurentaPersonal(page)}
        />
      }
    </>

  )
}

export default ListPersonal
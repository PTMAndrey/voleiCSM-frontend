import React, { Fragment, useState } from "react";
import useStateProvider from "../../hooks/useStateProvider";
import Paginare from "../../componente/Paginare/Paginare";
import Partida from "../../componente/Partida/Partida";


const ListCalendarMeciuri = (props) => {

    const { pageSize, meciuriOrdonate, paginaCurentaMeciuri, setPaginaCurentaMeciuri } = useStateProvider();
    

    return (
        <>
            {props.currentTableData?.length > 1 &&
                <Paginare
                    data={meciuriOrdonate}
                    className="pagination-bar pt-3"
                    totalCount={meciuriOrdonate?.length}
                    pageSize={pageSize}
                    paginaCurenta={paginaCurentaMeciuri}
                    onPageChange={page => setPaginaCurentaMeciuri(page)}
                />
            }

            {props.currentTableData?.map(
                (meci, index) =>
                (
                    <Fragment key={`${meci?.id}_${index}`}>
                        {
                            <Partida key={`${meci?.id}_${index +'#'+ Math.random()}`} data={meci} />
                        }
                    </Fragment>
                )
            )}

            {props.currentTableData?.length > 0 &&
                <Paginare
                    data={meciuriOrdonate}
                    className="pagination-bar pt-3"
                    totalCount={meciuriOrdonate?.length}
                    pageSize={pageSize}
                    paginaCurenta={paginaCurentaMeciuri}
                    onPageChange={page => setPaginaCurentaMeciuri(page)}
                />
            }


        </>
    );
};

export default ListCalendarMeciuri;
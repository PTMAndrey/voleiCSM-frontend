import Card from "../../componente/Card/Card";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment} from "react";
import Paginare from "../../componente/Paginare/Paginare";


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
                            <Card
                                key={`${meci?.id}_${index + Math.random()}`}
                                className="mt-5"
                                data={meci}
                                // onClick={() => {
                                //     navigate("/noutati/" + stire?.id);
                                // }}
                            />
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
                    onPageChange={page =>setPaginaCurentaMeciuri(page)}
                />
            }


        </>
    );
};

export default ListCalendarMeciuri;
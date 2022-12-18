import Card from "../../componente/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment, } from "react";
import Paginare from "../../componente/Paginare/Paginare";


const ListStiri = (props) => {
    const navigate = useNavigate();
    const { pageSize, stiriOrdonate, paginaCurentaStiri, setPaginaCurentaStiri } = useStateProvider();

    return (
        <>
            {props.currentTableData?.length > 1 &&
                <Paginare
                    data={stiriOrdonate}
                    className="pagination-bar pt-3"
                    totalCount={stiriOrdonate?.length}
                    pageSize={pageSize}
                    paginaCurenta={paginaCurentaStiri}
                    onPageChange={page => setPaginaCurentaStiri(page)}
                />
            }

            {props.currentTableData?.map(
                (stire, index) =>
                (
                    <Fragment key={`${stire?.id}_${index}`}>
                        {
                            <Card
                                key={`${stire?.id}_${index + Math.random()}`}
                                className="mt-5"
                                data={stire}
                                onClick={() => {
                                    navigate("/noutati/" + stire?.id);
                                }}
                            />
                        }
                    </Fragment>
                )
            )}
            {props.currentTableData?.length > 0 &&
                <Paginare
                    data={stiriOrdonate}
                    className="pagination-bar pt-3"
                    totalCount={stiriOrdonate?.length}
                    pageSize={pageSize}
                    paginaCurenta={paginaCurentaStiri}
                    onPageChange={page =>setPaginaCurentaStiri(page)}
                />
            }


        </>
    );
};

export default ListStiri
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment, useState, useMemo } from "react";
import Paginare from "../../components/Paginare/Paginare";


const ListStiri = (props) => {
    const navigate = useNavigate();
    const { pageSize, stiriOrdonate } = useStateProvider();

    //grid view list view
    // const { listView } = useStateProvider();

    // pagination - current page with the content displayed
    // const [currentPage, setCurrentPage] = useState(1);
    // console.log("ordonate????",stiriOrdonate);

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * pageSize;
    //     const lastPageIndex = firstPageIndex + pageSize;

    //     if (stiriOrdonate?.length < lastPageIndex && (lastPageIndex - stiriOrdonate?.length) > 0)
    //         return stiriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - stiriOrdonate?.length));
    //     else
    //         return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);

    // }, [currentPage, pageSize, stiriOrdonate]);

    return (
        <>
            {props.currentTableData?.length > 1 &&
                <Paginare
                    data={stiriOrdonate}
                    className="pagination-bar pt-3"
                    totalCount={stiriOrdonate?.length}
                    pageSize={pageSize}
                    currentPage={props.currentPage}
                    onPageChange={page => props.setCurrentPage(page)}
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
                                    navigate("/stiri/" + stire?.id);
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
                    currentPage={props.currentPage}
                    onPageChange={page => props.setCurrentPage(page)}
                />
            }


        </>
    );
};

export default ListStiri
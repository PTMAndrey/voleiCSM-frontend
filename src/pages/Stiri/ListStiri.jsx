import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment, useState, useMemo } from "react";
import Paginare from "../../components/Paginare/Paginare";


const ListStiri = () => {
    const navigate = useNavigate();
    const { pageSize, stiriOrdonate } = useStateProvider();

    //grid view list view
    // const { listView } = useStateProvider();

    // pagination - current page with the content displayed
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        if (stiriOrdonate?.length < lastPageIndex && (lastPageIndex - stiriOrdonate?.length) > 0)
            return stiriOrdonate?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - stiriOrdonate?.length));
        else
            return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);

    }, [currentPage, pageSize, stiriOrdonate]);

    return (
        <>
            {currentTableData.length > 1 &&
                <Paginare
                    data={stiriOrdonate}
                    className="pagination-bar pt-3"
                    totalCount={stiriOrdonate?.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            }

            {currentTableData?.map(
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
            <Paginare
                data={stiriOrdonate}
                className="pagination-bar pt-3"
                totalCount={stiriOrdonate?.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={page => setCurrentPage(page)}
            />

        </>
    );
};

export default ListStiri
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment, useState, useMemo, useEffect } from "react";
import Paginare from "../Paginare/Paginare";


const Stire = () => {
    const navigate = useNavigate();
    const { pageSize, stiriOrdonate, labelStiriDropdown } = useStateProvider();

    //grid view list view
    const { listView } = useStateProvider();

    // pagination - current page with the content displayed
    const [currentPage, setCurrentPage] = useState(1);
    // const [lastPage, setLastPage] = useState(1);


    // useEffect(() => {
    //     console.log('iohivgjcf');
    //     if (Number(currentPage) > Number(lastPage)) {
    //         console.log('effect cp', currentPage, "lp ", lastPage);
    //         setCurrentPage(1);
    //     }
    // }, [currentPage, lastPage])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        console.log(firstPageIndex, '%%%%', lastPageIndex);

        if (labelStiriDropdown === null) {
            if( stiriOrdonate?.length < lastPageIndex && ( lastPageIndex - stiriOrdonate?.length) > 0)
            return stiriOrdonate?.slice(firstPageIndex, lastPageIndex - ( lastPageIndex - stiriOrdonate?.length) );
        else
            return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);
        }

        // if (labelStiriDropdown.value === '') {
        //     setCurrentLength(stiriOrdonate.length);
        //     return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);
        // }
        // if (labelStiriDropdown.value === 'Publicat') {
        //     setCurrentLength(stiriPublicate.length);
        //     return stiriPublicate?.slice(firstPageIndex, lastPageIndex);
        // }
        // if (labelStiriDropdown.value === 'Programat') {
        //     setCurrentLength(stiriProgramate.length);
        //     return stiriProgramate?.slice(firstPageIndex, lastPageIndex);
        // }
        // if (labelStiriDropdown.value === 'Draft') {
        //     setCurrentLength(stiriDraft.length);
        //     return stiriDraft?.slice(firstPageIndex, lastPageIndex);
        // }


    }, [currentPage, pageSize, labelStiriDropdown, stiriOrdonate]);

    return (
        <div> {
            <Paginare
                data={stiriOrdonate}
                className="pagination-bar"
                totalCount={stiriOrdonate?.length}
                pageSize={pageSize}
                currentPage={currentPage}
                // lastPage={lastPage}
                onPageChange={page => setCurrentPage(page)}
                // onLastPageChange={lastPage => setLastPage(lastPage)}
            />
        }
            {/* {console.log("currentTABLEDATA", currentTableData)} */}
            {currentTableData?.map(
                (stire, index) =>
                // stire.status !== pending &&
                // stire.status !== pending2 && (
                // stire.status === labelStiriDropdown.value && (
                (
                <Fragment key={`${stire?.id}_${index}`}>
                    {
                        <Card
                            key={`${stire?.id}_${index+Math.random()}`}
                            // listView={!listView}
                            data={stire}
                            onClick={() => {
                                navigate("/stiri/" + stire?.id);
                                console.log(stire, "---");
                            }}
                        />
                    }
                </Fragment>
                )
            )}

        </div>
    );
};

export default Stire
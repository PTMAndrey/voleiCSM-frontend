import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment, useState, useMemo } from "react";
import Pagination from "../Paginare/Paginare";


const Stire = ({
    admin,
    hideApproval,
    showcontrols,
}) => {
    const navigate = useNavigate();
    const { stiriOrdonate, pageSize } = useStateProvider();

    //grid view list view
    const { listView } = useStateProvider();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return stiriOrdonate?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, stiriOrdonate]);

    return (
        <div>
            {currentTableData?.map(
                (stire, index) =>
                    // stire.status !== pending &&
                    // stire.status !== pending2 && (
                    stire.status === 'Publicat' && (
                        <Fragment key={`${stire.id_stiri}_${index}`}>
                            {
                                <Card
                                    key={index}
                                    listView={!listView}
                                    admin={admin}
                                    hideApproval={hideApproval}
                                    stire={stire}
                                    showcontrols={!showcontrols}
                                    fotografii={stire.fotografii}
                                    titlu={stire.titlu}
                                    descriere={stire.descriere}
                                    data_publicarii={stire.data_publicarii}
                                    id_stiri={stire.id_stiri}
                                    onClick={() => {
                                        navigate("/stiri/" + stire.id);
                                    }}
                                />
                            }
                        </Fragment>
                    )
            )}
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={stiriOrdonate?.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
            <p className="text-white">Eu mapez toate stirile si de aia unele pagini din pagination sunt goale. trebuie sa creat variabile pentru fiecare tip de stire / publicata / programata / draft<br/>
            Ar fi o idee sa pot modifica asta din Carusel. Am la linia 97 o conditionare. Daca transmit o variabila cred ca ar merge</p>
        </div>
    );
};

export default Stire
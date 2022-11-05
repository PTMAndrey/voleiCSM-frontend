import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment } from "react";

const Stire = ({
    admin,
    hideApproval,
    showcontrols,
}) => {
    const navigate = useNavigate();
    const { stiriOrdonate } = useStateProvider();

    //grid view list view
    const { listView } = useStateProvider();
    return (
        <div>
            {stiriOrdonate?.map(
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
                                    id_stire={stire.id_stiri}
                                    onClick={() => {
                                        navigate("/stiri/" + stire.id);
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
import { createContext, useState, useEffect, useMemo } from "react";
import { getStiri } from "../api/API";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {

  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  // stiri 
  const [stiri, setStiri] = useState(null);
  const [stiriPublicate, setStiriPublicate] = useState([]);
  const [stiriOrdonate, setStiriOrdonate] = useState([]);
  const [labelStiriDropdown, setLabelStiriDropdown] = useState(null);
    // status stiri 'TOATE' ; 'PUBLICAT' ; 'PROGRAMAT' ; 'DRAFT' -- folosit in noutati la dropdown 
  const [statusStiri, setStatusStiri] = useState('TOATE');
    // paginare stiri
  let pageSize = 4;

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // let stiriPublicate = [];
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // let stiriProgramate = [];
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // let stiriDraft = [];


  // show grid show list
  const [listView, setListView] = useState(true);


  const fetchStiribyStatus = async () => {
    try {
      const response = await getStiri(statusStiri);
      setStiri(response);
      console.log("SP stiri",response);
    } catch (error) { }
  };

  const fetchStiriPublicate = async () => {
    try {
      const response = await getStiri("PUBLICAT");
      setStiriPublicate(response?.sort((a, b) => new Date(...b.dataPublicarii.split('-').reverse()) - new Date(...a.dataPublicarii.split('-').reverse())));
      // console.log("SP stiriPublicate",response);
    } catch (error) { }
  };

  useEffect(() => {
    fetchStiribyStatus(); // pentru pagina Noutati - stiri
    fetchStiriPublicate(); // pentru pagina principala - noutati
  }, []);

  useEffect(() => {
    setStiriOrdonate(stiri?.sort((a, b) => new Date(...b.dataPublicarii.split('-').reverse()) - new Date(...a.dataPublicarii.split('-').reverse())));
  },[stiri]);



  // }, [stiri]);//, stiriOrdonate,stiriDraft,  stiriProgramate, stiriPublicate]);

  // useEffect(()=>{
  //   stiriOrdonate?.map(stire => (
  //     stire.status === 'Publicat' &&
  //     stiriPublicate.push(stire),
  //     stire.status === 'Programat' &&
  //     stiriProgramate.push(stire),
  //     stire.status === 'Draft' &&
  //     stiriDraft.push(stire)
  // ))
  // },[stiriDraft, stiriOrdonate, stiriProgramate, stiriPublicate]);

  // const stiriDropdownFilter = useMemo(() => {
  //   stiriOrdonate?.map(stire => (
  //     stire.status === 'Publicat' ?
  //       stiriPublicate.push(stire) :
  //       stire.status === 'Programat' ?
  //         stiriProgramate.push(stire) :
  //         stire.status === 'Draft' ?
  //           stiriDraft.push(stire) : null
  //   ))

  // }, [stiriDraft, stiriOrdonate, stiriProgramate, stiriPublicate]);



  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      stiri,
      setStiri,
      stiriOrdonate,
      setStiriOrdonate,
      statusStiri,
      setStatusStiri,
      stiriPublicate,
      setStiriPublicate,

      // stiriPublicate,
      // stiriProgramate,
      // stiriDraft,
      // stiriDropdownFilter,

      // setStiriProgramate,
      // setStiriPublicate,
      // setStiriDraft,

      labelStiriDropdown,
      setLabelStiriDropdown,
      listView,
      setListView,
      pageSize,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;

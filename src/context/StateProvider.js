import { createContext, useState, useEffect } from "react";
import { getStiri } from "../api/API";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {
  // pagination
  let pageSize = 4;

  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  // stiri
  const [stiri, setStiri] = useState(null);
  const [stiriOrdonate, setStiriOrdonate] = useState([]);
  // const [stiriPublicate, setStiriPublicate] = useState([]);
  // const [stiriDraft, setStiriDraft] = useState([]);
  let stiriPublicate = [];
  let stiriProgramate = [];
  let stiriDraft = [];


  // show grid show list
  const [listView, setListView] = useState(true);


  const fetchStiri = async () => {
    try {
      const response = await getStiri();
      setStiri(response.stiri);
      console.log(response.stiri);
    } catch (error) { }
  };

  useEffect(() => {
    fetchStiri();
    console.log("stateprovider");
    // fetchMessages();
  }, []);

  useEffect(() => {
    setStiriOrdonate(stiri?.sort((a, b) => new Date(...b.data_publicarii.split('-').reverse()) - new Date(...a.data_publicarii.split('-').reverse())));

    // stiriOrdonate?.map(stire =>(
    //   stire.status === 'Publicat' &&
    //   stiriPublicate.push(stire),
    //   stire.status === 'Programat' &&
    //   stiriProgramate.push(stire),
    //   stiri.status === 'Draft' &&
    //   stiriDraft.push(stire)
    // ))
  }, [stiri]);//, stiriOrdonate,stiriDraft,  stiriProgramate, stiriPublicate]);

  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      stiri,
      setStiri,
      stiriOrdonate,
      setStiriOrdonate,
      stiriPublicate,
      stiriProgramate,
      stiriDraft,
      // setStiriPublicate,
      // setStiriDraft,
      listView,
      setListView,
      pageSize,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;

import { createContext, useState, useEffect } from "react";
import { getStiriByStatus, getStiriByFilter } from "../api/API";
import parse from 'date-fns/parse'

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
  // paginare stiri
  let pageSize = 4;
  // calendar meciuri
  const [meciuri, setMeciuri] = useState(null);
  const [meciuriOrdonate, setMeciuriOrdonate] = useState([]);

  const [paginaCurentaStiri, setPaginaCurentaStiri] = useState(1);
  const [paginaCurentaMeciuri, setPaginaCurentaMeciuri] = useState(1);

  // show grid show list
  const [listView, setListView] = useState(false);
  // FILTRARE STIRI
  const [filtruStiri, setFiltruStiri] = useState({
    status: 'PUBLICAT',
    tipStire: 'TOATE',
    numarZile: '',
    perioadaSpecifica: { firstDay: '', lastDay: '' },
    dataSpecifica: '',
  });

  const fetchStiriPublicate = async () => {
    try {
      const response = await getStiriByStatus("PUBLICAT");
      response ? setStiriPublicate(sortData(response)) : setStiriPublicate(null);

    } catch (error) { }
  };

  const fetchStiribyFilter = async () => {
    try {
      const response = await getStiriByFilter(filtruStiri);
      if (response) {
        setStiri(response);
        setStiriOrdonate(sortData(response));
        setPaginaCurentaStiri(1);
      }
      else { setStiri(null); setStiriOrdonate(null); }

    } catch (error) { }
  };

  const sortData = (response) => {
    const format = 'd-M-y H:m'
    const parseDate = d => parse(d, format, new Date())
    return (response?.sort((a, b) => parseDate(b.dataPublicarii) - parseDate(a.dataPublicarii)));

  }
  

  useEffect(() => {
    fetchStiriPublicate(); // pentru carusel - pagina principala
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchStiribyFilter(); // pentru pagina Noutati - stiri
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // preview
  const [preview, setPrevizualizare] = useState({});

  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      stiri,
      setStiri,
      stiriOrdonate,
      setStiriOrdonate,
      stiriPublicate,
      setStiriPublicate,
      meciuri,
      setMeciuri,
      meciuriOrdonate,
      setMeciuriOrdonate,

      paginaCurentaStiri,
      setPaginaCurentaStiri,
      paginaCurentaMeciuri,
      setPaginaCurentaMeciuri,

      fetchStiribyFilter,
      pageSize,

      filtruStiri,
      setFiltruStiri,

      preview,
      setPrevizualizare,
      listView,
      setListView,
    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;

import { createContext, useState, useEffect } from 'react';
import { getStiriByStatus, getStiriByFilter, getMeciuriByFilter, getPersonalByFilter, getDivizii } from '../api/API';
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

  // numar elemente pe o pagina ( ex. noutati )
  let pageSize = 4;
  let pageSizePersonal = 9;

  // stiri 
  const [stiri, setStiri] = useState(null);
  const [stiriPublicate, setStiriPublicate] = useState([]); // folosit in pagina principala
  const [stiriOrdonate, setStiriOrdonate] = useState([]); // folosit in restul aplicatiei
  const [paginaCurentaStiri, setPaginaCurentaStiri] = useState(1);

  // previzualizare Stiri
  const [previzualizareStiri, setPrevizualizareStiri] = useState({});

  // show grid show list
  const [listView, setListView] = useState(false);
  // filtru pentru stiri
  const [filtruStiri, setFiltruStiri] = useState({
    status: 'PUBLICAT',
    tipStire: 'TOATE',
    numarZile: '',
    perioadaSpecifica: { firstDay: '', lastDay: '' },
    dataSpecifica: '',
  });

  // calendar meciuri
  const [meciuriOrdonate, setMeciuriOrdonate] = useState([]);
  const [paginaCurentaMeciuri, setPaginaCurentaMeciuri] = useState(1);
  // previzualizare Meciuri
  const [previzualizareMeciuri, setPrevizualizareMeciuri] = useState({});
  const [filtruMeciuri, setFiltruMeciuri] = useState({
    status: 'TOATE',
    dataSpecifica: '',
  });

  const [personal, setPersonal] = useState([]);
  const [paginaCurentaPersonal, setPaginaCurentaPersonal] = useState(1);
  // previzualizare Meciuri
  const [previzualizarePersonal, setPrevizualizarePersonal] = useState({});
  const [filtruPersonal, setFiltruPersonal] = useState({
    tipPersonal: 'JUCATOR',
    divizie: 'A1',
    nume: '',
    prenume: '',
  });


  const [divizii, setDivizii] = useState([]);
  const fetchStiriPublicate = async () => {
    try {
      const response = await getStiriByStatus('PUBLICAT');
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

  const fetchMeciuribyFilter = async () => {
    try {
      const response = await getMeciuriByFilter(filtruMeciuri);
      if (response) {
        setMeciuriOrdonate(sortData(response));
        setPaginaCurentaMeciuri(1);
      }
      else { setMeciuriOrdonate(null); }

    } catch (error) { }
  };

  const fetchPersonalbyFilter = async () => {
    try {
      const response = await getPersonalByFilter(filtruPersonal);
      if (response) {
        setPersonal(response);
        setPaginaCurentaPersonal(1);
      }
      else { setPersonal(null); }

    } catch (error) { }
  };  
  
  const fetchDivizii = async () => {
    try {
      const response = await getDivizii();
      if (response) {
        setDivizii(response.data);
      }
      else { setDivizii(null); }

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

  useEffect(() => {
    fetchMeciuribyFilter(); // pentru pagina Noutati - stiri
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchPersonalbyFilter(); // pentru pagina Noutati - stiri
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchDivizii(); // pentru pagina Noutati - stiri
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      pageSize,
      previzualizareStiri,
      setPrevizualizareStiri,
      listView,
      setListView,

      stiri,
      setStiri,
      stiriOrdonate,
      setStiriOrdonate,
      stiriPublicate,
      setStiriPublicate,
      paginaCurentaStiri,
      setPaginaCurentaStiri,
      filtruStiri,
      setFiltruStiri,
      fetchStiribyFilter,

      meciuriOrdonate,
      setMeciuriOrdonate,
      paginaCurentaMeciuri,
      setPaginaCurentaMeciuri,
      filtruMeciuri,
      setFiltruMeciuri,
      fetchMeciuribyFilter,
      previzualizareMeciuri,
      setPrevizualizareMeciuri,

      personal, 
      setPersonal,
      pageSizePersonal,
      paginaCurentaPersonal, 
      setPaginaCurentaPersonal,
      filtruPersonal, 
      setFiltruPersonal,
      fetchPersonalbyFilter,
      previzualizarePersonal,
      setPrevizualizarePersonal,

      divizii,
      setDivizii,

    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;

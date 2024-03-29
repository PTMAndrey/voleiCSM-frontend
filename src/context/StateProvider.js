import { createContext, useState, useEffect } from 'react';
import { getStiriByStatus, getStiriByFilter, getMeciuriByFilter, getPersonalByFilter, getDivizii, getEditii, getCluburiSportive, getPremiiPersonalByFilter } from '../api/API';
import parse from 'date-fns/parse'

const StateContext = createContext({});

export const StateProvider = ({ children }) => {

  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  // numar elemente pe o pagina ( ex. noutati )
  let pageSize = 4;
  let pageSizePersonal = 9;
  let pageSizePremiiEchipa = 3;

  // stiri 
  const [stiri, setStiri] = useState(null);
  const [stiriPublicate, setStiriPublicate] = useState([]); // folosit in pagina principala
  const [stiriOrdonate, setStiriOrdonate] = useState([]); // folosit in restul aplicatiei
  const [paginaCurentaStiri, setPaginaCurentaStiri] = useState(1);

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
  const [filtruMeciuri, setFiltruMeciuri] = useState({
    status: 'VIITOR',
    editieId: '12',
    dataSpecifica: '',
  });
  const [editii, setEditii] = useState([]);
  const [echipe, setEchipe] = useState([]);
  const [filtruOrdonareMeciuri, setFiltruOrdonareMeciuri] = useState('ASC');

  // personal
  const [personal, setPersonal] = useState([]);
  const [premiiEchipa, setPremiiEchipa] = useState([]);
  const [paginaCurentaPersonal, setPaginaCurentaPersonal] = useState(1);
  const [paginaCurentaPremiiPersonal, setPaginaCurentaPremiiPersonal] = useState(1);
  // previzualizare personal
  const [filtruPersonal, setFiltruPersonal] = useState({
    tipPersonal: 'JUCATOR',
    divizie: 'A1',
    nume: '',
    prenume: '',
  });
  const [filtruPremii, setFiltruPremii] = useState({
    divizie: 'A1'
  });

  let Posturi = [
    { value: 'PRINCIPAL', label: 'PRINCIPAL' },
    { value: 'SECUNDAR', label: 'SECUNDAR' },
    { value: 'CENTRU', label: 'CENTRU' },
    { value: 'OPUS', label: 'OPUS' },
    { value: 'RIDICATOR', label: 'RIDICATOR' },
    { value: 'LIBERO', label: 'LIBERO' },
    { value: 'EXTREMA', label: 'EXTREMA' },
    { value: 'ANTRENOR', label: 'ANTRENOR' },
  ];

  const [divizii, setDivizii] = useState([]);

  const fetchStiriPublicate = async () => {
    try {
      const response = await getStiriByStatus('PUBLICAT');
      if (response?.status === 200)
        setStiriPublicate(sortDataStiri(response.data))
      else
        setStiriPublicate(null);

    } catch (error) { }
  };

  const fetchStiribyFilter = async () => {
    try {
      const response = await getStiriByFilter(filtruStiri);
      if (response?.status === 200) {
        setStiri(response.data);
        setStiriOrdonate(sortDataStiri(response.data));
        setPaginaCurentaStiri(1);
      }
      else { setStiri(null); setStiriOrdonate(null); }

    } catch (error) { }
  };

  const fetchMeciuribyFilter = async () => {
    try {
      const response = await getMeciuriByFilter(filtruMeciuri);
      if (response) {
        if (filtruOrdonareMeciuri === 'ASC')
          setMeciuriOrdonate(sortDataMeciuriASC(response));
        else
          if (filtruOrdonareMeciuri === 'DESC')
            setMeciuriOrdonate(sortDataMeciuriDESC(response));

        setPaginaCurentaMeciuri(1);
      }
      else { setMeciuriOrdonate(null); setFiltruOrdonareMeciuri('ASC') }

    } catch (error) { }
  };

  const fetchEditii = async () => {
    try {
      const response = await getEditii();
      if (response) {
        setEditii(response);
        setFiltruMeciuri({ ...filtruMeciuri, editieId: response[0].idEditie });
      }
      else { setEditii(null); }

    } catch (error) { }
  }

  const fetchEchipe = async () => {
    try {
      const response = await getCluburiSportive();
      if (response) {
        setEchipe(response);
      }
      else { setEchipe(null); }

    } catch (error) { }
  }

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

  const fetchPremiibyFilter = async () => {
    try {
      const response = await getPremiiPersonalByFilter(filtruPremii);
      if (response) {
        setPremiiEchipa(response);
        setPaginaCurentaPremiiPersonal(1);
      }
      else { setPremiiEchipa(null); }

    } catch (error) { }
  };

  const fetchDivizii = async () => {
    try {
      const response = await getDivizii();
      if (response) {
        setDivizii(response.data);
        setFiltruPremii({...filtruPremii, divizie: response.data[0].denumireDivizie})
      }
      else { setDivizii(null); }

    } catch (error) { }
  };

  const sortDataStiri = (response) => {
    const format = 'd-M-y H:m'
    const parseDate = d => parse(d, format, new Date())
    return (response?.sort((a, b) => parseDate(b.dataPublicarii) - parseDate(a.dataPublicarii)));
  }

  const sortDataMeciuriASC = (response) => {
    const format = 'd-M-y H:m'
    const parseDate = d => parse(d, format, new Date())
    const resp = (response?.sort((a, b) => parseDate(a.data) - parseDate(b.data)));
    return resp;
  }

  const sortDataMeciuriDESC = (response) => {
    const format = 'd-M-y H:m'
    const parseDate = d => parse(d, format, new Date())
    const resp = (response?.sort((a, b) => parseDate(b.data) - parseDate(a.data)));
    return resp;
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
    fetchEditii();
    fetchEchipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchMeciuribyFilter(); // pentru pagina Calendar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchPersonalbyFilter(); // pentru pagina Personal
    fetchPremiibyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchDivizii(); // pentru pagina Personal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <StateContext.Provider
    value={{
      alert,
      setAlert,
      pageSize,
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
      fetchStiriPublicate,

      meciuriOrdonate,
      setMeciuriOrdonate,
      paginaCurentaMeciuri,
      setPaginaCurentaMeciuri,
      filtruMeciuri,
      setFiltruMeciuri,
      fetchMeciuribyFilter,
      editii,
      setEditii,
      echipe,
      setEchipe,
      filtruOrdonareMeciuri,
      setFiltruOrdonareMeciuri,

      personal,
      setPersonal,
      pageSizePersonal,
      paginaCurentaPersonal,
      setPaginaCurentaPersonal,
      filtruPersonal,
      setFiltruPersonal,
      fetchPersonalbyFilter,
      pageSizePremiiEchipa,
      paginaCurentaPremiiPersonal,
      premiiEchipa,
      setPremiiEchipa,
      filtruPremii,
      setFiltruPremii,
      setPaginaCurentaPremiiPersonal,
      fetchPremiibyFilter,
      Posturi,

      divizii,
      setDivizii,

      sortDataStiri,
      sortDataMeciuriASC,
      sortDataMeciuriDESC,

    }}
  >{children}</StateContext.Provider>;
};

export default StateContext;

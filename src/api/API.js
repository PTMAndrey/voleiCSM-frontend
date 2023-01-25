/* eslint-disable array-callback-return */
import axios from 'axios';
import {users} from '../assets/users/users';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

// access control axios
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// ---------------------------- USER ----------------------------------

export const getUserById = async (id) => {
  try {
    let response = ({data: [], status: 500})

    users.map(user => {
      if (user.id === id ) {
       response.data = user;
       response.status = 200;
      }
    })
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getStiriByStatus = async (status) => {
  try {
    const response = await axios.get('/stiri?status=' + status);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getStiriByFilter = async (stire) => {
  try {
    let response;
    let defaultURL = '/stiri/filtru?status=' + stire.status + '&tipStire=' + stire.tipStire;

    if (stire.numarZile !== '')
      defaultURL += '&numarZile=' + stire.numarZile;
    else
      if (stire.perioadaSpecifica.firstDay !== '' && stire.perioadaSpecifica.lastDay !== '')
        defaultURL += '&perioadaSpecifica=' + stire.perioadaSpecifica.firstDay + ' ' + stire.perioadaSpecifica.lastDay;
      else
        if (stire.dataSpecifica !== '')
          defaultURL += '&dataSpecifica=' + stire.dataSpecifica;

    response = await axios.get(defaultURL);

    return response;

  } catch (error) {
    console.error(error);
  }
};

export const deleteStireById = async (id) => {
  try {
    const response = await axios.delete('/stiri/' + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getStireById = async (id) => {
  try {
    const response = await axios.get('/stiri/' + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addStire = async ( data) => {
  try {
    // console.log('api',file,'\n',data)
    let response;
    response = await axios.post('/stiri', data,{
      headers:{'Content-Type': 'multipart/form-data',},
      // params:{file:file}
    });
    // if(file){
      // response = await axios.post('/stiri', data,{
      //   headers:{'Content-Type': 'multipart/form-data',},
      //   params:{file:file}
      // });
    // }
    // else{
    //   response = await axios.post('/stiri', data,{
    //     headers:{'Content-Type': 'multipart/form-data',}
    //   });
    // }
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const updateStire = async (id,data) => {
  try {
    const response = await axios.put('/stiri/'+id, data,{
      headers:{'Content-Type': 'multipart/form-data',},
      // params:{file:file ? file : null}
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addMeci = async (data) => {
  try {
    const response = await axios.post('/meci',data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMeciById = async (id) => {
  try {
    const response = await axios.get('/meci/'+id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateMeci = async (data) => {
  try {
    const response = await axios.put('/meci/'+data.id, data);
    return response ;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMeciById = async (id) => {
  try {
    const response = await axios.delete('/meci/' + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMeciuriByStatus = async (status) => {
  try {
    const response = await axios.get('/meci/status?status='+status);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMeciuriByFilter = async (meci) => {
  try {
    let response;
    let defaultURL = '/meci/filtru?status=' + meci.status + '&campionat=' + meci.editieId;
    if (meci.campionat !== '')
      defaultURL += '&dataSpecifica=' + meci.dataSpecifica;
    response = await axios.get(defaultURL);
    return response.data;

  } catch (error) {
    console.error(error);
  }
};



export const getEditii = async () => {
  try {
    const response = await axios.get('/editie');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCluburiSportive = async () => {
  try {
    const response = await axios.get('/cluburiSportive');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addPersoana = async (file, data) => {
  try {
    const response = await axios.post('/persoana', data,{
      headers:{'Content-Type': 'multipart/form-data',},
      params:{file:file}
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updatePersoana = async (id,file,data) => {
  try {
    const response = await axios.put('/persoana/'+id, data,{
      headers:{'Content-Type': 'multipart/form-data',},
      params:{file:file ? file : null}
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getPersonalByFilter = async (personal) => {
  try {
    let response;
    let defaultURL = '/persoana/filtru?tipPersonal=' + personal.tipPersonal + '&divizie=' + personal.divizie;

    if (personal.nume !== '')
      defaultURL += '&nume=' + personal.nume;
    // else
      if (personal.prenume !== '')
        defaultURL += '&prenume=' + personal.prenume;
    response = await axios.get(defaultURL);

    return response.data;

  } catch (error) {
    console.error(error);
  }
};


export const getPersonalById = async (id) => {
  try {
    const response = await axios.get('/persoana/' + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deletePersonalById = async (id) => {
  try {
    const response = await axios.delete('/persoana/' + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addIstoricPosturiToId = async (id,data) => {
  try {
    const response = await axios.post('/istoricPosturi/add/' + id,data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addRealizarePersonaleToId = async (id,data) => {
  try {
    const response = await axios.post('/realizariPersonale/add/' + id,data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateIstoricPosturiToId = async (id,data) => {
  try {
    const response = await axios.put('/istoricPosturi/update/' + id,data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateRealizarePersonaleToId = async (id,data) => {
  try {
    const response = await axios.put('/realizariPersonale/update/' + id,data);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getIstoricPosturiByPersoanaId = async (id) => {
  try {
    const response = await axios.get('/istoricPosturi/get/' + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getRealizariPersonaleByPersoanaId = async (id) => {
  try {
    const response = await axios.get('/realizariPersonale/get/' + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteIstoricPosturiById = async (id) => {
  try {
    const response = await axios.delete('/istoricPosturi/' + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRealizarePersonalaById = async (id) => {
  try {
    const response = await axios.delete('/realizariPersonale/' + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getDivizii = async (id) => {
  try {
    const response = await axios.get('/divizii');
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getPremiiPersonalByFilter = async (data) => {
  try {
    const response = await axios.get('/premii/filtru?divizie=' + data.divizie);

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

export const addPremiu = async (data) => {
  try {
    const response = await axios.post('/premii/', data);
    return response;

  } catch (error) {
    console.error(error);
  }
};
export const updatePremiu = async (id,data) => {
  try {
    const response = await axios.put('/premii/'+id, data);
    return response;

  } catch (error) {
    console.error(error);
  }
};


export const getPremiuById = async (id) => {
  try {
    const response = await axios.get('/premii/' + id);
    return response;

  } catch (error) {
    console.error(error);
  }
};

export const deletePremiubyId = async (id) => {
  try {
    const response = await axios.delete('/premii/' + id);
    return response;

  } catch (error) {
    console.error(error);
  }
};
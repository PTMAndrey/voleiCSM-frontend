import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

// access control axios
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const getUserById = async (id) => {
  //try {
  //   const response = await axios.get('/user/' + id);
  //   return response;
  return {
    data: {
      userId: '44232',
      firstName: 'Andrei',
      lastName: 'Andries',
      token: 'tkn123',
      email: 'email@email.com',
      password: '1234',
      // role: null,
      role: 'Administrator',
      // role: 'CreatorContinut',
    },
    response: 200,
  };
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export const getStiriByStatus = async (status) => {
  try {
    const response = await axios.get('/stiri?status=' + status);
    return response.data;
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

    return response.data;

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

export const addStire = async (stiri) => {
  try {
    const response = await axios.post('/stiri', stiri);
    return response;
  } catch (error) {
    console.error(error);
  }
};



// export const addStire = async (file, stire) => {
//   try {
//     const response = await axios.post('/stiri', stire, 
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         }
//       },);
//     if (response.status === 200)
//       return response;
//     else
//       return null;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const updateStire = async (data) => {
  try {
    const response = await axios.post('/stiri/' + data.id, data); // put ???
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addMeci = async (data) => {
  try {
    console.log('data api -> ', data);
    const response = await axios.post('/meci',data);
    console.log('response?: ',response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMeciById = async (id) => {
  try {
    const response = await axios.get('/meci/'+id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMeci = async (data) => {
  try {
    const response = await axios.get('/meci/'+data.id, data);
    return response.data;
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
    console.log(data);
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
    console.log(data);
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

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

// access control axios
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// get user by id
export const getUserById = async (id) => {
  //try {
  //   const response = await axios.get("/user/" + id);
  //   return response;
  return {
    data: {
      userId: "44232",
      firstName: "Andrei",
      lastName: "Andries",
      token: "tkn123",
      email: "email@email.com",
      password: "1234",
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
    const response = await axios.get("/stiri?status=" + status);
    // console.log(response.data)
    return response.data;

    // return {
    //   stiri: [{
    //     id: '111',
    //     titlu: 'Meci 1 Publicat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ############## Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
    //     status: 'Publicat',
    //     dataPublicarii: '20-10-2021',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '222',
    //     titlu: 'Meci 2 Publicat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Publicat',
    //     dataPublicarii: '18-10-2022',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '333',
    //     titlu: 'Meci 3 Publicat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Publicat',
    //     dataPublicarii: '01-11-2019',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '444',
    //     titlu: 'Meci 4 Programat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Programat',
    //     dataPublicarii: '05-11-2022',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '555',
    //     titlu: 'Meci 5 Publicat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Publicat',
    //     dataPublicarii: '16-10-2022',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '666',
    //     titlu: 'Meci 6 Draft',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Draft',
    //     dataPublicarii: '',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '777',
    //     titlu: 'Meci 7 Draft',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Draft',
    //     dataPublicarii: '09-11-2022',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '888',
    //     titlu: 'Meci 8 Publicat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Publicat',
    //     dataPublicarii: '12-11-2022',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   {
    //     id: '999',
    //     titlu: 'Meci 9 Publicat',
    //     descriere: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus? ##############',
    //     status: 'Publicat',
    //     dataPublicarii: '07-11-2022',
    //     imaginiURL: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
    //     video: '',
    //   },
    //   ],
    //   response: 200,
    // }
  } catch (error) {
    console.error(error);
  }
};

export const getStiriByFilter = async (stire) => {
  try {
    let response;
    if (stire.numarZile !== '')
      response = await axios.get("/stiri/filtru?status=" + stire.status + '&tipStire=' + stire.tipStire + "&numarZile=" + stire.numarZile);
    else
      if (stire.perioadaSpecifica.firstDay !== '' && stire.perioadaSpecifica.lastDay !== '')
        response = await axios.get("/stiri/filtru?status=" + stire.status + '&tipStire=' + stire.tipStire + "&perioadaSpecifica=" + stire.perioadaSpecifica.firstDay + '%20' + stire.perioadaSpecifica.lastDay);
      else
        if (stire.numarZile !== '')
          response = await axios.get("/stiri/filtru?status=" + stire.status + '&tipStire=' + stire.tipStire + "&dataSpecifica=" + stire.dataSpecifica);
        else
          response = await axios.get("/stiri/filtru?status=" + stire.status + '&tipStire=' + stire.tipStire);

    console.log("stiri filter",response.data)
    return response.data;

  } catch (error) {
    console.error(error);
  }
};

export const deleteStireById = async (id) => {
  try {
    const response = await axios.delete("/stiri/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getStireById = async (id) => {
  try {
    const response = await axios.get("/stiri/" + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};
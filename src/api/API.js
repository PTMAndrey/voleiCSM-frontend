import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

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
      role: null,
      // role: 'Administrator',
      // role: 'CreatorContinut',
    },
    response: 200,
  };
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export const getListings = async () => {
  try {
    // const response = await axios.get("/listing");
    // return response.data;

    return {
      listings:[ {
        id_stiri:'111',
        titlu:'Meci 1',
        descriere:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
        status:'Publicat',
        data_publicarii:'20.10.2022',
        fotografii:'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
        video:'',
        },
        {
        id_stiri:'222',
        titlu:'Meci 2',
        descriere:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
        status:'Publicat',
        data_publicarii:'15.10.2022',
        fotografii:'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
        video:'',
        },
        {
        id_stiri:'333',
        titlu:'Meci 3',
        descriere:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
        status:'Publicat',
        data_publicarii:'01.11.2022',
        fotografii:'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
        video:'',
        },
        {
        id_stiri:'444',
        titlu:'Meci 4',
        descriere:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
        status:'Programat',
        data_publicarii:'05.11.2022',
        fotografii:'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
        video:'',
        },
        {
        id_stiri:'555',
        titlu:'Meci 5',
        descriere:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
        status:'Publicat',
        data_publicarii:'30.10.2022',
        fotografii:'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
        video:'',
        },
        {
        id_stiri:'666',
        titlu:'Meci 6',
        descriere:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aspernatur facere atque pariatur repellendus exercitationem ex quia vero ea alias modi eius, quos eligendi cum veritatis ducimus debitis tempore necessitatibus?',
        status:'Draft',
        data_publicarii:'',
        fotografii:'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=',
        video:'',
        },
        ],
        response: 200,
    }
  } catch (error) {
    console.error(error);
  }
};

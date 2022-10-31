import { createContext, useState, useEffect } from "react";
import { getListings} from "../api/API";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {
   // alert
   const [alert, setAlert] = useState(null);
   if (alert) {
     setTimeout(() => {
       setAlert(null);
     }, 2000);
   }

   // listings
  const [listings, setListings] = useState(null);
  // show grid show list
  const [listView, setListView] = useState(true);


  const fetchListings = async () => {
    try {
      const response = await getListings();
      setListings(response.listings);
      console.log(response.listings);
    } catch (error) {}
  };
  useEffect(() => {
    fetchListings();
    console.log("stateprovider");
    // fetchMessages();
  }, []);

  return <StateContext.Provider
  value={{
    alert,
    setAlert,
    listings,
    setListings,
    listView,
    setListView,
  }}
  >{children}</StateContext.Provider>;
};

export default StateContext;

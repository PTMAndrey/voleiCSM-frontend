import React, { useEffect, useState } from "react";
import styles from "./Stire.module.scss";

// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Button from "../../../components/Button/Button";
import PhotosModal from "../../../components/Modal/PhotosModal";
import FavoriteErrorModal from "./FavoriteErrorModal";
import { ReactComponent as GridDense } from "../../../assets/icons/grid-dense.svg";
import { ReactComponent as Share } from "../../../assets/icons/share.svg";
import { ReactComponent as AvatarDefault } from "../../../assets/icons/Jucator-Default.svg";

import { getStireById } from "../../../api/API";

import { useParams } from "react-router-dom";

import moment from "moment";
import 'moment/locale/ro';
// import useAuth from "../../../hooks/useAuth";
import useStateProvider from "../../../hooks/useStateProvider";
// import TextArea from "../../../components/Input/TextArea";
// import FiltreStiri from "../FiltreStiri/FiltreStiri";

import Carusel from '../../../components/Carusel/Carusel';

// map to render
// const Map = ({ center }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   return isLoaded ? (
//     <GoogleMap
//       id="map"
//       mapContainerStyle={{
//         width: "inherit",
//         height: "25rem",
//         borderRadius: "0.75rem",
//       }}
//       zoom={15}
//       center={center}
//     >
//       <Marker position={center} />
//     </GoogleMap>
//   ) : (
//     <div>Loading...</div>
//   );
// };

import useWindowDimensions from "../../../hooks/useWindowDimensions"
import NotFound from "../../NotFound/NotFound";
const Stire = () => {
  // states for the details page
  // const { favorites, stiriOrdonate } = useStateProvider();
  const { stiriPublicate } = useStateProvider();
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const [like, setLike] = useState(false);
  const [stire, setStire] = useState({});
  // const [messageContent, setMessageContent] = useState("");

  const { width } = useWindowDimensions();
  // const { user } = useAuth();
  // const { setAlert } = useStateProvider();
  // get the id from the url
  const { id } = useParams();

  // message
  // const [message, setMessage] = useState({});

  // get stire from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getStireById(id);
        setStire(response.data);
        console.log("stire by id", response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [id]);

  //check favorite
  // useEffect(() => {
  //   favorites?.forEach((favorite) => {
  //     if (favorite.id === id) {
  //       setLike(true);
  //     }
  //   });
  // }, [id]);

  // update message object useEffect
  // useEffect(() => {
  //   setMessage({
  //     ...message,
  //     senderId: user?.id,
  //     receiverId: stire?.author?.id,
  //     stireId: stire?.id,
  //     content: messageContent,
  //     createdAt: moment().format(),
  //   });
  // }, [user?.id, stire?.author?.id, stire?.id, messageContent]);

  // console.log(message);

  // set message object usecallback

  //add stire to favorites
  // const handleFavorites = async () => {
  //   try {
  //     //add fav
  //     // if (stire?.id && user?.id && like === false) {
  //     //   const response = await addFavorite(user.id, stire.id);
  //     //   setLike(true);
  //     //   console.log("add");
  //     // }
  //     //remove fav
  //     if (stire?.id && user?.id && like === true) {
  //       const response = await deleteFavoriteById(user.id, stire.id);
  //       setLike(false);
  //       console.log("delete");
  //     } else if (user === null) {
  //       console.log(showNotification, "show notif");
  //       setShowNotification(true);
  //     }
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };

  //scroll to bottom ( to messages )
  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // };

  // send message to API
  // const handleSendMessage = async () => {
  // console.log(message);
  // try {
  //   const response = await newMessage(message);
  //   if (response.status === 201) {
  //     setMessageContent("");
  //     setAlert({
  //       type: "success",
  //       message: "Message sent successfully",
  //     });
  //   }
  // } catch (error) {
  //   console.log("Error: ", error);
  //   setAlert({
  //     type: "danger",
  //     message: "Error sending message",
  //   });
  // }
  // if (!user?.id) {
  //   setAlert({
  //     type: "danger",
  //     message: "Please login to send message",
  //   });
  // }
  // };

  return (
    <>{stire !== null ?
      < section className={styles.container} >
        {/* images */}
        < div className={styles.images} >
          {
            stire?.imaginiURL?.slice(0, 5).map((image, index) => {
              if (index === 0) {
                return (
                  <img
                    key={index}
                    src={image}
                    className={styles.largeImage}
                    alt=""
                  />
                );
              } else {
                return <img key={index} src={image} alt="" />;
              }
            })
          }

          < div className={styles.photos} >
            <Button
              variant="secondary"
              label="Vezi fotografii"
              icon={<GridDense className={styles.gridDense} />}
              position="left"
              onClick={() => {
                setShowModal(true);
              }}
            />
          </div >
        </div >

        <PhotosModal
          showModal={showModal}
          setShowModal={setShowModal}
          images={stire?.imaginiURL}
        />

        {/* title */}
        <div className={styles.title}>
          <div>
            <h5 className={styles.stireName}>{stire?.titlu}</h5>
            {/* <h4 className={styles.stirePrice}>{stire.price} lei</h4> */}
          </div>
          <button className={styles.shareButton}>
            {" "}
            <Share />
            <span>Share</span>
          </button>
        </div>

        {/* details */}
        <div className={styles.stireBody}>
          <div className={styles.details}>
            {/* description */}
            <div className={styles.stireDetails}>
              <div className={styles.description}>
                <h6>Descriere</h6>
                <p>{stire?.descriere}</p>
              </div>

            </div>

            {/* owner */}
            <div className={styles.ownerDetails}>
              {stire.autor ?
                <img
                  className={styles.ownerImage}
                  src={stire?.autor}
                  alt=""
                />
                :
                <AvatarDefault className={styles.ownerImage} />
              }
              <div>
                <h6 className={styles.ownerName}>{stire.autor ? stire?.autor : 'Redacția C.S.M.'}</h6>
                {stire.dataPublicarii && <>
                  <h6>Data publicării</h6>
                  <p>
                    {moment(stire?.dataPublicarii, 'DD-MM-YYYY HH:mm').format("DD MMMM YYYY HH:mm")}
                  </p>
                </>
                }
              </div>
            </div>
          </div>
          {stiriPublicate.length > 0 &&
            <div className={styles.ultimeleNoutati}>
              <Carusel data={stiriPublicate} titluCarousel="Ultimele noutăți" screenWidth={width} showcontrols isNotHomePage />
            </div>
          }

        </div>
        <FavoriteErrorModal
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      </section >

      :
      <NotFound />
    }</>
  );
};

export default Stire;

import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import useAuth from "../../hooks/useAuth";
// import {
//   addFavorite,
//   approveListing,
//   declineListing,
//   deleteFavoriteById,
//   deleteListingById,
//   getFavorite,
// } from "../../api/API";
import setAlert from "../../components/Alert/Alert";
import Popup from "../../pages/PaginaPrincipala/Popup";
import useStateProvider from "../../hooks/useStateProvider";
// import FavoriteErrorModal from "../../pages/Details/FavoriteErrorModal";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";

import Button from "../Button/Button";

const Card = ({
  onClick,
  style,
  fotografii,
  titlu,
  data_publicarii,
  descriere,
  hideApproval,
  id_stiri,
  stire,
  isHomePage,
  showcontrols,
}) => {

  const { width } = useWindowDimensions();
  const [openPopup, setOpenPopup] = useState(false);
  const { user, userId } = useAuth();
  const { favorites, setFavorites } = useStateProvider();
  const [showNotification, setShowNotification] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userId !== null) getFavorite(userId).then((res) => setFavourites(res));
  // }, [userId]);

  const [like, setLike] = useState(false);
  const { setAlert } = useStateProvider();
  const { stiri } = useStateProvider();
  const { fetchListings } = useStateProvider();

  //grid view list view
  const { listView } = useStateProvider();

  function stopPropagation(e) {
    e.stopPropagation();
  }
  //#region COMMENTED REGION
  // //delete announce
  const handleDelete = async () => {
    try {
      // const response = await deleteListingById(listingId);
      // if (response.status === 200) {
        togglePopup();
        fetchListings();
        setAlert({ type: "success", message: "Deleted" });
      // }
    } catch (error) {
      togglePopup();
      setAlert({
        type: "danger",
        message: "Something went wrong",
      });
    }
  };

  //Approve announce

  // const handleApprove = async (id) => {
  //   try {
  //     // const response = await approveListing(id);
  //     // if (response.status === 200) {
  //       setAlert({
  //         type: "success",
  //         message: "Approved",
  //       });
  //       fetchListings();
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     setAlert({
  //       type: "danger",
  //       message: "Something went wrong",
  //     });
  //   }
  // };
  // Decline announce
  // const handleDecline = async (id) => {
  //   try {
  //     // const response = await declineListing(id);
  //     // if (response.status === 200) {
  //       setAlert({
  //         type: "success",
  //         message: "Approved",
  //       });
  //       fetchListings();
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     setAlert({
  //       type: "danger",
  //       message: "Something went wrong",
  //     });
  //   }
  // };
  // useEffect(() => {
  //   setFavorites(favourites);
  // }, [favourites]);
  // //handle favorites
  // const handleFavorites = async () => {
  //   try {
  //     //add fav
  //     if (listingId && userId && like === false) {
  //       // const response = await addFavorite(userId, listingId);

  //       setLike(true);
  //       console.log(favourites, "add ");
  //       console.log(favorites, "add global");
  //     }
  //     //remove fav
  //     if (listingId && userId && like === true) {
  //       // const response = await deleteFavoriteById(userId, listingId);

  //       setLike(false);
  //       console.log(favourites, "delete ");
  //       console.log(favorites, "delete glob");
  //     } else if (userId === null) {
  //       console.log(showNotification, "show notif");
  //       setShowNotification(true);
  //     }
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };


  // //check favorites
  // useEffect(() => {
  //   favorites?.forEach((favorite) => {
  //     if (favorite.id === listingId) setLike(true);
  //   });
  // }, [favorites]);
  //#endregion


  //popup
  const togglePopup = (props) => {
    setOpenPopup(!openPopup);
  };
  return (
    <div className={styles.cards} >
      <div onClick={onClick} className={`${styles.card} ${styles.bgCardBlue} `}>
        {/* <div className={styles.hover}>asdasdasd</div> */}
        <div
          style={style}
          className={`${(!listView && !isHomePage) ? styles.listCardContent : styles.cardContent
            }`}
        >
          {/* <div onClick={stopPropagation}>
            <button
              className={`${listView ? styles.heartList : styles.heartCard}`}
            // onClick={handleFavorites}
            >
              {!like ? <Heart /> : <HeartFilled className={styles.heartFill} />}
            </button>
          </div> */}

          <div className={styles.imageDiv}>
            <img
              src={fotografii}
              alt="Stiri"
              className={`${listView ? styles.ListCardImg : styles.cardImg}`}
            />
          </div>

          <div className={styles.contentCard}>
            <div
              className={`${styles.listTitleAndLocation} ${!listView && styles.col
                }`}
            >
              <p className={styles.cardDataPublicarii}>{data_publicarii}</p>
              <p className={styles.cardTitle}>{titlu}</p>
            </div>

            <p
              // style={{ display: listView ? "block" : "none" }}
              style={{ display: "block", color: "darkgray " }}
              className={`${styles.cardDescription}`}
            >
              {
                descriere.substring(0, 500)
              }
              {/* {descriere} */}
            </p>
            <p className="text-white">#FRVolei #suceava #csmsuceava #romania #volei #CupaRomaniei #suceavacounty</p>
            <div className={styles.citesteMaiMult}>
              <span onClick={() => navigate(`/stiri/${stire.id_stiri}`)}>
                <Button
                  icon={<ArrowRight />}
                  position="right"
                  iconColor="white"
                  variant="transparent"
                  label="Citeste mai mult"
                />
              </span>
            </div>

            {(user?.role !== null) && (
              <div onClick={stopPropagation} className={styles.controls}>
                <>
                <button
                      className={styles.edit}
                      onClick={() => {console.log(`${id_stiri}`)}}//navigate(`/edit/${stire.id_stiri}`)}
                    >
                      Modifică
                    </button>
                  <button
                    className={styles.delete}
                    onClick={() => togglePopup()}
                  >
                    <span>Șterge</span>
                  </button>
                </>
              </div>
            )}

          </div>
        </div>
      </div>
      {/* POPUP delete */}
      {
        openPopup && (
          <Popup
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
            content={
              <div className={styles.popup}>
                <h3 className={styles.titlePopup}>Ștergere știre</h3>
                <p className={styles.descriptionPopup}>
                 Această acțiune este permanentă și nu poate fi anulată.
                </p>
                <div className={styles.butonsPopup}>
                  <button
                    className={styles.deletePopup}
                  // onClick={(e) => handleDelete(e)}
                  >
                    Șterge
                  </button>
                  <button
                    className={styles.backPopup}
                    onClick={() => setOpenPopup(!openPopup)}
                  >
                    Anulează
                  </button>
                </div>
              </div>
            }
          />
        )
      }
      {/* <FavoriteErrorModal
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      /> */}
    </div >
  );
};

export default Card;

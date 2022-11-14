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
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';

import Button from "../Button/Button";

const Card = ({
  onClick,
  style,
  data,
  isHomePage,
}) => {

  const { width } = useWindowDimensions();
  const [openPopup, setOpenPopup] = useState(false);
  const { user, userId } = useAuth();

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userId !== null) getFavorite(userId).then((res) => setFavourites(res));
  // }, [userId]);

  const { setAlert } = useStateProvider();
  const { stiri, statusStiri } = useStateProvider();
  const { fetchStiribyStatus } = useStateProvider();

  //grid view list view
  const { listView } = useStateProvider();

  function stopPropagation(e) {
    e.stopPropagation();
  }
  // //delete announce
  const handleDelete = async () => {
    try {
      // const response = await deleteListingById(listingId);
      // if (response.status === 200) {
      togglePopup();
      fetchStiribyStatus();
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

  //#region COMMENTED REGION
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
      <div onClick={onClick} className={`${styles.card}`}>
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
            {data?.imaginiURL[0] === null || data?.imaginiURL === undefined || data?.imaginiURL === "" ?
              <img
                // src={imgStireDefault}
                alt="Stiri"
                className={`${listView ? styles.ListCardImg : styles.cardImg}`}
              />
              :
              <img
                src={data?.imaginiURL[0]}
                alt="Stiri"
                className={`${listView ? styles.ListCardImg : styles.cardImg}`}
              />
            }
          </div>

          <div className={styles.contentCard}>
            <div
              className={`${styles.listTitleAndLocation} ${!listView && styles.col
                }`}
            >
              <p className={styles.cardDataPublicarii}>{data?.dataPublicarii}</p>
              <p className={styles.cardTitle}>{data?.titlu}</p>
            </div>

            <p
              // style={{ display: listView ? "block" : "none" }}
              style={{ display: "block", color: "darkgray " }}
              className={`${styles.cardDescription}`}
            >
              {
                data?.descriere.substring(0, 500)
              }
              {/* {descriere} */}
            </p>
            <p className="text-white" style={{ fontSize: '12px' }}>#FRVolei #suceava #csmsuceava #romania #volei #CupaRomaniei #suceavacounty</p>
            <div className={styles.citesteMaiMult}>
              <span onClick={() => navigate(`/stiri/${data?.id}`)}>
                <Button
                  icon={<ArrowRight />}
                  position="right"
                  iconColor="white"
                  variant="transparent"
                  label="Citește mai mult"
                />
              </span>
            </div>

            {(user?.role !== null) && (
              <div onClick={stopPropagation} className={styles.controls}>
                <>
                  {/* <button
                      className={styles.edit}
                      onClick={() => {console.log(`${data?.id}`)}}//navigate(`/edit/${stireid}`)}
                    >
                      Modifică
                    </button> */}
                  <RiEdit2Fill className={styles.edit} onClick={() => { console.log(`${data?.id}`) }} />
                  {/* navigate(`/edit/${stireid}`)} */}
                  {/* <button
                    className={styles.delete}
                    onClick={() => togglePopup()}
                  >
                    <span>Șterge</span>
                  </button> */}
                  <RiDeleteBinFill className={styles.delete} onClick={() => togglePopup()} />
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

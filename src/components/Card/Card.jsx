import React, { useState } from "react";
import styles from "./Card.module.scss";
import useAuth from "../../hooks/useAuth";
import Popup from "../../pages/PaginaPrincipala/Popup";
import useStateProvider from "../../hooks/useStateProvider";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as StiriDefaultImage } from "../../assets/icons/Stiri-Default.svg";
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import { deleteStireById } from '../../api/API'

import Button from "../Button/Button";
import moment from "moment";
import 'moment/locale/ro';

const Card = ({
  onClick,
  style,
  data,
  isHomePage,
}) => {

  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useAuth();

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userId !== null) getFavorite(userId).then((res) => setFavourites(res));
  // }, [userId]);

  const { setAlert } = useStateProvider();
  const { fetchStiribyFilter } = useStateProvider();

  //grid view list view
  const { listView } = useStateProvider();

  function stopPropagation(e) {
    e.stopPropagation();
  }
  // //delete announce
  const handleDelete = async () => {
    try {
      const response = await deleteStireById(data?.id);
      if (response.status === 200) {
        togglePopup();
        fetchStiribyFilter();
        setAlert({ type: "success", message: "Deleted" });
      }
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
      <div onClick={onClick}>
        <div
          style={style}
          className={`${(!listView && !isHomePage) ? styles.listCardContent : styles.cardContent
            }`}
        >

          <div className={styles.imagesDiv}>
            {data?.imagini !== null ?
              <img
                src={data?.imaginiURL[0]}
                alt="Stiri"
                className={`${listView ? styles.ListCardImg : styles.cardImg}`}
              />
              : <StiriDefaultImage className={`${listView ? styles.ListCardImg : styles.cardImg}`} />
            }
          </div>

          <div className={styles.contentCard}>
            <div
              className={`${styles.listTitleAndLocation} ${!listView && styles.col
                }`}
            >
              <p className={styles.cardDataPublicarii}>
                {/* {moment(data?.dataPublicarii).format("DD MMMM YYYY HH:mm")} */}
                {moment(data?.dataPublicarii,'DD-MM-YYYY HH:mm').format("DD MMMM YYYY HH:mm")}
              </p>
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
                  border={false}
                />
              </span>
            </div>

            {user?.role && (
              <div onClick={stopPropagation} className={styles.controls}>
                  <RiEdit2Fill className={styles.edit} onClick={() => {  console.log(`${data?.id}`); navigate(`/edit/${data?.id}`);}} />

                  <RiDeleteBinFill className={styles.delete} onClick={() => togglePopup()} />
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
                    onClick={(e) => {
                      handleDelete(e);
                    }
                    }
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

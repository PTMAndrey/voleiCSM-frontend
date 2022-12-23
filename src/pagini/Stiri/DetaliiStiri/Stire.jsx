import React, { useEffect, useState } from "react";
import styles from "./Stire.module.scss";

import Buton from "../../../componente/Buton/Buton";
import ModalPoze from "../../../componente/Modal/ModalPoze";
import { ReactComponent as GridDense } from "../../../assets/icons/grid-dense.svg";
import { ReactComponent as Share } from "../../../assets/icons/share.svg";
import { ReactComponent as AvatarDefault } from "../../../assets/images/Jucator-Default.svg";

import { getStireById } from "../../../api/API";

import { useParams } from "react-router-dom";

import moment from "moment";
import 'moment/locale/ro';
import useStateProvider from "../../../hooks/useStateProvider";
import Carusel from '../../../componente/Carusel/Carusel';
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import NotFound from "../../NotFound/NotFound";
const Stire = () => {

  // states for the details page
  const { stiriPublicate } = useStateProvider();
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [stire, setStire] = useState({});

  const { width } = useWindowDimensions();
  const { id } = useParams();

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
            <Buton
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

        <ModalPoze
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
          <button className={styles.shareButon}>
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
      </section >

      :
      <NotFound />
    }</>
  );
};

export default Stire;

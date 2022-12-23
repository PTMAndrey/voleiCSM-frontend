import React, {  } from "react";
import styles from "./PrevizualizareStiri.module.scss";
import Buton  from "../../../componente/Buton/Buton";
import { ReactComponent as GridDense } from "../../../assets/icons/grid-dense.svg";
import { ReactComponent as Share } from "../../../assets/icons/share.svg";
import useStateProvider from "../../../hooks/useStateProvider";

import { addStire } from "../../../api/API";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Previzualizare = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { previzualizareStiri, setPrevizualizareStiri } = useStateProvider();
  console.log(previzualizareStiri, "previzualizareStiri?");

  // submit
  const handleSubmit = async () => {
    try {
      const response = await addStire(previzualizareStiri);
      if (response.status === 200) {
        navigate("/confirmation");
        setPrevizualizareStiri({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      {/* images */}
      <div className={styles.images}>
        {previzualizareStiri?.images?.slice(0, 5).map((image, index) => {
          if (index === 0) {
            return (
              <img
                src={image}
                className={styles.largeImage}
                alt=""
                key={index}
              />
            );
          } else {
            return <img src={image} alt="" key={index} />;
          }
        })}

        <div className={styles.photos}>
          <Buton
            variant="secondary"
            label="Show all photos"
            icon={<GridDense className={styles.gridDense} />}
            position="left"
          />
        </div>
      </div>

      {/* title */}
      <div className={styles.title}>
        <div>
          <h5 className={styles.listingName}>{previzualizareStiri?.title}</h5>
          <h4 className={styles.listingPrice}>{previzualizareStiri?.price} lei</h4>
        </div>
        <button className={styles.shareButon}>
          {" "}
          <Share />
          <span>Share</span>
        </button>
      </div>

      {/* details */}
      <div className={styles.details}>
        {/* description */}
        <div className={styles.listingDetails}>
          <div className={styles.description}>
            <h6>Description</h6>
            <p>{previzualizareStiri?.description}</p>
          </div>
          {/* location */}
          <div className={styles.location}>
            <h6>Location</h6>
            <p>
              {previzualizareStiri?.location &&
                (previzualizareStiri?.location[2].length > 0
                  ? previzualizareStiri?.location[2] + ", "
                  : "") +
                  (previzualizareStiri?.location[3].length > 0
                    ? previzualizareStiri?.location[3] + " , "
                    : "") +
                  previzualizareStiri?.location[5]}
            </p>

          </div>
          {/* message seller */}
          <div className={styles.message}>
            <h6>Message the seller</h6>
            <textarea
              placeholder="Enter your message here"
              className={styles.messageBox}
              name="message"
              id="message"
              cols="30"
              rows="10"
            />
            <button>Send</button>
          </div>
        </div>

        <div>
          <div className={styles.ownerDetails}>
            <img className={styles.ownerImage} src={user?.photo} alt="" />
            <div>
              <h6 className={styles.ownerName}>{user?.fullName}</h6>
              <p className={styles.ownerActivity}>
                Joiner in
                <span> {moment(user?.createdAt).format("MMMM YYYY")}</span>
                <br />
                Response rate: <span>{user?.responseRate}</span>
                <br />
                Response time: <span>{user?.responseTime}</span>
              </p>
            </div>
          </div>
          {/* <div className={styles.actions}>
            <Buton label="Purchase" />
            <div>
              <Buton
                label=""
                icon={!like ? <Heart /> : <HeartFilled />}
                position="right"
                variant="secondary"
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <p>This is a preview of your listing</p>
        <div>
          <Buton
            label="Edit"
            variant="secondary"
            onClick={() => navigate("/noutati/adauga")}
          />
          <Buton label="Publish" variant="primary" onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default Previzualizare;

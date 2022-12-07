import React from "react";
import styles from "./Confirmation.module.scss";
import welcome from "../../assets/images/welcome.png";
import Button  from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.confirmation}>
      <img src={welcome} alt="Stire adăugată"  />
      <h5 className={styles.confirmationTitle}>
        Super! Știrea a fost publicată!
      </h5>
      <div className={styles.button}>
        <Button
          variant={"primary"}
          label="Stiri"
          onClick={() => navigate("/stiri")}
        />
      </div>

      <div className={styles.button}>
        <Button
          variant={"secondary"}
          label="Adaugă știre nouă"
          onClick={() => navigate("/stire-add")}
        />
      </div>
    </div>
  );
};

export default Confirmation;

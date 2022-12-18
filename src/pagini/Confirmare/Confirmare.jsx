import React from "react";
import styles from "./Confirmare.module.scss";
import welcome from "../../assets/images/welcome.png";
import Buton  from "../../componente/Buton/Buton";
import { useNavigate } from "react-router-dom";

const Confirmare = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.confirmation}>
      <img src={welcome} alt="Stire adăugată"  />
      <h5 className={styles.confirmationTitlu}>
        Super! Știrea a fost publicată!
      </h5>
      <div className={styles.button}>
        <Buton
          variant={"primary"}
          label="Stiri"
          onClick={() => navigate("/noutati")}
        />
      </div>

      <div className={styles.button}>
        <Buton
          variant={"secondary"}
          label="Adaugă știre nouă"
          onClick={() => navigate("/add/stire")}
        />
      </div>
    </div>
  );
};

export default Confirmare;

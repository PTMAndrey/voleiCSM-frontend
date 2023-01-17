import React from "react";
import styles from "./Confirmare.module.scss";
import welcome from "../../assets/images/welcome.png";
import Buton  from "../../componente/Buton/Buton";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

const Confirmare = ({pagina}) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.confirmation}`}>
      <img src={welcome} alt="Stire adăugată"  />
      <h5 className={styles.confirmationTitlu}>
        Super! Postarea a fost publicată!
      </h5>
      <div className={styles.button}>
        <Buton
          variant={"primary"}
          label={pagina}
          onClick={() => navigate(pagina === 'Noutati' ? "/noutati" : pagina === 'Personal' && "/personal")}
        />
      </div>

      <div className={`${styles.button} mb-5`}>
        <Buton
          variant={"secondary"}
          label="Adaugă o nouă postare"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default Confirmare;

import React from "react";
import styles from "./Confirmare.module.scss";
import welcome from "../../assets/images/welcome.png";
import Buton from "../../componente/Buton/Buton";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

const Confirmare = ({ pagina }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.confirmation}`}>
      <img src={welcome} alt={"Pagina adăugată"} />
      <h5 className={styles.confirmationTitlu}>
        Super! Acțiunea ta a fost efectuată cu <span className='text-success'>succes</span>!
      </h5>
      <div className={styles.button}>
        <Buton
          variant={"primary"}
          label={pagina}
          onClick={() => navigate(pagina === 'Noutati' ? "/noutati" : pagina === 'Personal' && "/personal")}
        />
      </div>

      <div className={`${styles.button} mb-5`}>
        {pagina === 'Noutati' &&
          <Buton
            variant={"secondary"}
            label="Adaugă o știre"
            onClick={() => navigate('/noutati/adauga')}
          />
        }
         {pagina === 'Personal' &&
          <Buton
            variant={"secondary"}
            label="Adaugă o persoană"
            onClick={() => navigate('/personal/adauga')}
          />
        }
      </div>
    </div>
  );
};

export default Confirmare;

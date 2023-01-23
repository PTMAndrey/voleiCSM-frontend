import React, { useState } from 'react';
import styles from './Card.module.scss';
import useAuth from '../../hooks/useAuth';
import Popup from '../../pagini/PaginaPrincipala/Popup';
import useStateProvider from '../../hooks/useStateProvider';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import { ReactComponent as StiriDefaultImage } from '../../assets/images/Stiri-Default.svg';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import { deleteStireById } from '../../api/API'

import Buton from '../Buton/Buton';
import moment from 'moment';
import 'moment/locale/ro';

const Card = ({
  onClick,
  style,
  data,
  isHomePage,
  caruselPopup,
}) => {

  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useAuth();

  const navigate = useNavigate();

  const { setAlert } = useStateProvider();
  const { fetchStiribyFilter, fetchStiriPublicate } = useStateProvider();

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
        fetchStiriPublicate();
        setAlert({ type: 'success', message: 'Deleted' });
      }
    } catch (error) {
      togglePopup();
      setAlert({
        type: 'danger',
        message: 'Something went wrong',
      });
    }
  };
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
                alt='Stiri'
                className={`${listView ? styles.ListCardImg : styles.cardImg}`}
              />
              : <StiriDefaultImage className={`${listView ? styles.ListCardImg : styles.cardImg}`} />
            }
          </div>

          <div className={styles.contentCard}>
            <div
              className={`${styles.listTitluAndLocation} ${!listView && styles.col
                }`}
            >
              <p className={styles.cardDataPublicarii}>
                {moment(data?.dataPublicarii, 'DD-MM-YYYY HH:mm').format('DD MMMM YYYY HH:mm')}
              </p>
              <p className={styles.cardTitlu}>{data?.titlu}</p>
            </div>

            <p
              style={{ display: 'block', color: 'darkgray ' }}
              className={`${styles.cardDescription}`}
            >
              {
                data?.descriere.substring(0, 500)
              }
            </p>

            {data.hashtag &&
              <p className={`text-white ${styles.hashtag}`} style={{ fontSize: '12px' }}>{data.hashtag}</p>
            }

            <div className={styles.citesteMaiMult}>
              <span onClick={() => navigate(`/noutati/${data?.id}`)}>
                <Buton
                  icon={<ArrowRight />}
                  position='right'
                  iconColor='white'
                  variant='transparent'
                  label='Citește mai mult'
                  border={false}
                />
              </span>
            </div>

            {user?.role && (
              <div onClick={stopPropagation} className={styles.controls}>
                <RiEdit2Fill className={styles.edit} onClick={() => { console.log(`${data?.id}`); navigate(`/noutati/edit/${data?.id}`); }} />

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
            caruselPopup={caruselPopup}
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
    </div >
  );
};

export default Card;

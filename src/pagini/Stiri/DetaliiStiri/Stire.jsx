/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/ro';
import { EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import { FacebookShareButton, FacebookIcon,
WhatsappShareButton,  WhatsappIcon,
TwitterShareButton, TwitterIcon, } from 'react-share';
import useStateProvider from "../../../hooks/useStateProvider";
import Carusel from '../../../componente/Carusel/Carusel';
import Buton from "../../../componente/Buton/Buton";
import ModalPoze from "../../../componente/Modal/ModalPoze";
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import { ReactComponent as GridDense } from "../../../assets/icons/grid-dense.svg";
import { ReactComponent as Share } from "../../../assets/icons/share.svg";
import AvatarDefault from "../../../assets/images/Jucator-Default.svg";
import { getStireById, getUserById } from "../../../api/API";
import NotFound from "../../NotFound/NotFound";
import '../../../styles/MyEditor.css';
import styles from "./Stire.module.scss";


const Stire = () => {
  const { stiriPublicate } = useStateProvider();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [stire, setStire] = useState({});
  const { width } = useWindowDimensions();
  const { id } = useParams();

  // get stire from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getStireById(id);
        setStire(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (id && !stire)
      navigate('/noutati');
  }, [stire])

  const [autor, setAutor] = useState()
  const getUserName = async () => {
    const response = await getUserById(stire?.autor);
    if (response?.status === 200) {
      setAutor(response.data)
    }
    else {
      setAutor({ ...autor, nume: 'Redacția', prenume: 'C.S.M.' })
    }
  };

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty());

  useEffect(() => {
    if (stire?.descriere) {
      const content = JSON.parse(stire?.descriere);
      const contentState = convertFromRaw(content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [stire?.descriere])


  useEffect(() => {
    if (stire?.autor)
      getUserName();
  }, [stire]);
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
          </div>
          <div className={styles.shareButon}>
            <input type='checkbox' id={styles.click} />
            <label htmlFor={styles.click} className={styles.shareBtn}>
              <span><Share /></span>
              <a><span>
                <FacebookShareButton
                  url={window.location.href}
                  quotes={'Salutare! Ai citit acest articol postat de echipa de volei a clubului C.S.M. Suceava?'}
                  hashtag={'#CSMSUCEAVA'}
                >
                  <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
              </span></a>
              <a><span>
                <WhatsappShareButton
                  title={'Salutare! Ai citit acest articol postat de echipa de volei a clubului C.S.M. Suceava?'}
                  separator="
                  "
                  url={window.location.href}
                >
                  <WhatsappIcon size={32} round={true}/>
                </WhatsappShareButton>
              </span></a>
              <a><span>
                <TwitterShareButton
                  title={'Salutare! Ai citit acest articol postat de echipa de volei a clubului C.S.M. Suceava?\n'}
                  url={window.location.href}
                  hashtag={'#CSMSUCEAVA'}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </span></a>
            </label>
          </div>
        </div>

        {/* details */}
        <div className={styles.stireBody}>
          <div className={styles.details}>
            {/* description */}
            <div className={styles.stireDetails}>
              <div className={styles.description}>
                <h6>Descriere</h6>
                {/* <p>{stire?.descriere}</p> */}
                <div className="parent">
                  <div className="overlay mt-3" onClick={(e) => e.stopPropagation()} > </div>
                  <div className='hide-toolbar-and-disable-input' contentEditable={false}>
                    <Editor
                      editorState={editorState}
                      toolbarHidden
                      readOnly={true}

                    />
                  </div>
                </div>
              </div>

            </div>

            {/* owner */}
            <div className={styles.ownerDetails}>
              {stire.autor ?
                <img
                  className={styles.ownerImage}
                  src={autor?.photo}
                  alt=""
                />
                :
                <img
                  className={styles.ownerImage}
                  src={AvatarDefault}
                  alt=""
                />
              }
              <div>
                <h6 className={styles.ownerName}>{stire.autor ? autor?.nume + ' ' + autor?.prenume : 'Redacția C.S.M.'}</h6>
                {stire?.dataPublicarii && <>
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

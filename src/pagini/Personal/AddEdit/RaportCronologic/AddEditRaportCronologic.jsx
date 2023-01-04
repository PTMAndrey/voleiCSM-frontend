import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RiDeleteBinFill } from 'react-icons/ri';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import moment from 'moment';
import 'moment/locale/ro';
import { getRealizariPersonaleByPersoanaId, addIstoricPosturiToId, addRealizarePersonaleToId, getIstoricPosturiByPersoanaId, updateIstoricPosturiToId, updateRealizarePersonaleToId } from '../../../../api/API';
import useStateProvider from '../../../../hooks/useStateProvider';
import Input from '../../../../componente/Input/Input';
import Buton from '../../../../componente/Buton/Buton';
import styles from './AddEditRaportCronologic.module.scss';
import useAuth from '../../../../hooks/useAuth';
import Popup from '../../../PaginaPrincipala/Popup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const AddEditRaportCronologic = ({ pagina }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuth();
  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [dataTypeDateButton, setDataTypeDateButton] = useState('');
  const [showCalendar, setShowCalendar] = useState({});
  const [idFieldToDelete, setIdFieldToDelete] = useState('');

  // istoric posturi
  const [istoricPosturi, setIstoricPosturi] = useState([{
    idIstoricPersoana: '',
    id: '',
    post: '',
    dataInceput: '',
    dataFinal: '',
  }]);

  const getIstoricPosturiPentruEdit = async () => {
    const response = await getIstoricPosturiByPersoanaId(id);
    if (response.status === 200) {
      // if(response.data.length === 0 )
      setIstoricPosturi(response.data);
      console.log('posturi', response.data);
    }
    else
      if (!realizariPersonale)
        navigate('/personal/' + id);
  };

  // realizari personale ( premii )
  const [realizariPersonale, setRealizariPersonale] = useState([{
    idRealizariPersonale: '',
    id: '',
    denumireRezultat: '',
    dataObtinerii: '',
  }]);

  const getRealizariPersonalePentruEdit = async () => {
    const response = await getRealizariPersonaleByPersoanaId(id);
    if (response.status === 200) {
      setRealizariPersonale(response.data);
      console.log('realizari', response.data);
    }
    else
      if (!istoricPosturi)
        navigate('/personal/' + id);
  };

  //------------------------------ useEffect
  useEffect(() => {
    if (id) {
      if (pagina === 'editRoluri')
        getIstoricPosturiPentruEdit();
      else
        if (pagina === 'editPremii')
          getRealizariPersonalePentruEdit();
    }
  }, [id]);

  //------------------------------- HANDLERE
  const handleChange = (e, id) => {

    const { name, value } = e.target;

    if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
      const newRows = [...istoricPosturi];
      const index = istoricPosturi.findIndex((data) => data.idIstoricPersoana === id);
      newRows[index][name] = value;
      setIstoricPosturi(newRows);

    }
    else
      if (pagina === 'editPremii' || pagina === 'adaugaPremii') {
        const newRows = [...realizariPersonale];
        const index = realizariPersonale.findIndex((data) => data.idRealizariPersonale === id);
        newRows[index][name] = value;
        setRealizariPersonale(newRows);
      }
  };

  const changeData = (id, data_Inceput = '', data_Final = '', data_Obtinerii = '') => {
    if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
      const newRows = [...istoricPosturi];
      const index = istoricPosturi.findIndex((data) => data.idIstoricPersoana === id);
      if (data_Inceput)
        newRows[index].dataInceput = data_Inceput;
      else
        if (data_Final)
          newRows[index].dataFinal = data_Final;

      setIstoricPosturi(newRows);
    }
    else
      if (pagina === 'editPremii' || pagina === 'adaugaPremii') {
        const newRows = [...istoricPosturi];
        const index = istoricPosturi.findIndex((data) => data.idIstoricPersoana === id);
        newRows[index].dataObtinerii = data_Obtinerii;
        setRealizariPersonale(newRows);
      }
  };

  // const changeData = (id, data_Inceput = '', data_Final = '', data_Obtinerii = '') => {
  //   if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
  //     const newRows = istoricPosturi.map(post => {
  //       if (post.idIstoricPersoana === id) {
  //         if (data_Inceput) {
  //           return {
  //             ...post,
  //             dataInceput: data_Inceput,
  //           };
  //         } else {
  //           return {
  //             ...post,
  //             dataFinal: data_Final,
  //           };
  //         }
  //       }
  //       return post;
  //     });
  //     console.log('newRows',newRows);
  //     setIstoricPosturi(newRows);
  //   } else if (pagina === 'editPremii' || pagina === 'adaugaPremii') {
  //     const newRows = [...istoricPosturi];
  //     const index = istoricPosturi.findIndex((data) => data.idIstoricPersoana === id);
  //     newRows[index].dataObtinerii = data_Obtinerii;
  //     setRealizariPersonale(newRows);
  //   }
  // };

  console.log(istoricPosturi);
  const handleSubmit = async () => {
    // if (!isFormValid()) {
    //   setShowErrors(true);
    //   console.log('Required fields must be completed!');
    // }
    // if (isFormValid()) {
    //   setShowErrors(false);
    try {
      let response;
      if (pagina === 'adaugaRoluri')
        response = await addIstoricPosturiToId(id, istoricPosturi);
      else
        if (pagina === 'adaugaPremii')
          response = await addRealizarePersonaleToId(id, realizariPersonale);

      if (response.status === 200) {
        navigate('/personal/' + id);
      }

    } catch (error) {
      console.log(error);
    }
    // }
  };

  const handleUpdate = async () => {
    // if (!isFormValid()) {
    //   setShowErrors(true);
    // }
    // if (isFormValid()) {
    //   setShowErrors(false);
    try {
      let response;
      if (pagina === 'editRoluri')
        response = await updateIstoricPosturiToId(id, istoricPosturi);
      else
        if (pagina === 'editPremii')
          response = await updateRealizarePersonaleToId(id, realizariPersonale);

      if (response.status === 200) {
        navigate('/personal/' + id);
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  //handle Previzualizare
  // const handlePrevizualizare = () => {
  //   if (!isFormValid()) {
  //     setShowErrors(true);
  //   }
  //   if (isFormValid()) {
  //     setShowErrors(false);
  //     setPrevizualizareStiri(formValue);
  //     navigate('./preview');
  //   }
  // };



  //-------------------------------- VALIDARI
  // check errors
  const checkErrors = (field) => {
    // title
    // if (field === 'titlu') {
    //   if (formValue.titlu.length < 10 && formValue.titlu.length > 0) {
    //     return 'Titlul trebuie sa conțină cel puțin 10 caractere!';
    //   } else if (formValue.titlu.length > 50) {
    //     return 'Titlul trebuie să conțină maxim 50 de caractere!';
    //   } else if (formValue.titlu.length === 0) {
    //     return 'Titlul este obligatoriu!';
    //   }
    // }

    // // imagini
    // if (field === 'imagini') {
    //   if (file.length > 9) {
    //     return 'Maxim 9 imagini';
    //   }
    // }
    // // descriere
    // if (field === 'descriere') {
    //   if (formValue.descriere?.length < 2)
    //     return `${formValue.descriere?.length} / 250 caractere obligatorii`;
    //   // } 
    //   // else if (formValue.descriere.length > 500) {
    //   //   return 'Description must be less than 500 characters long';
    //   else if (formValue.descriere.length === 0) {
    //     return 'Descrierea este obligatorie!';
    //   }
    // }

    // if (field === 'status') {
    //   if (formValue.status.length === 0) {
    //     return 'Selectați una dintre opțiunile de publicare existente!'
    //   }
    // }

    // if (formValue.status === 'PROGRAMAT') {
    //   if (field === 'data')
    //     if (dataProgramata === '')
    //       return <p style={{ color: 'red', marginTop: '20px' }}>Alegeti data pentru a programa publicarea!</p>;

    //   if (field === 'ora')
    //     if (selectedHour === '')
    //       return 'Alegeti o ora pentru a programa publicarea!';

    //   if (field === 'minut')
    //     if (selectedMinute === '')
    //       return 'Alegeti minutele pentru a programa publicarea!';
    // }

    return '';
  };

  const isFormValid = () => {
    let isValid = true;
    if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
      Object.keys(istoricPosturi).forEach((field) => {
        if (checkErrors(field)) {
          isValid = false;
        }
      });
      return isValid;
    }
    else
      if (pagina === 'editPremii' || pagina === 'adaugaPremii') {
        Object.keys(realizariPersonale).forEach((field) => {
          if (checkErrors(field)) {
            isValid = false;
          }
        });
        return isValid;
      }
  };

  const getDataSetValueCalendar = (data) => {
    let fullDate = data.split('-');
    let zi = fullDate[0];
    let luna = fullDate[1];
    let an = fullDate[2];
    console.log(new Date(an, luna, zi));
    return (an, luna, zi);
  }
  const getNewDateFormat = (e) => {
    return String(e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear();
  }

  function handleAddRow() {
    if (pagina === 'adaugaRoluri')
      setIstoricPosturi([...istoricPosturi, {
        idIstoricPersoana: istoricPosturi.length,
        id: '',
        post: '',
        dataInceput: '',
        dataFinal: '',
      }
      ]);
    else
      setRealizariPersonale([...realizariPersonale, {
        idRealizariPersonale: realizariPersonale.length,
        id: '',
        denumireRezultat: '',
        dataObtinerii: '',
      }
      ]);
  }

  function handleDeleteRow(id) {
    if (pagina === 'adaugaRoluri' || pagina === 'editRoluri')
      setIstoricPosturi([...istoricPosturi.filter(data => data.idIstoricPersoana !== id)]);
    else
      if (pagina === 'adaugaPremii' || pagina === 'editRoluri')
        setRealizariPersonale([...realizariPersonale.filter(data => data.idIstoricPersoana !== id)]);
  }

  //popup
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  function stopPropagation(e) {
    e.stopPropagation();
  }

  // const handleStartDateClick = (idIstoricPersoana) => {
  //   setOldDate(istoricPosturi.find(post => post.idIstoricPersoana === idIstoricPersoana).dataInceput);
  //   setDataTypeDateButton('data început');
  //   setShowCalendar({ ...showCalendar, [idIstoricPersoana]: true });
  // }
  // const handleEndDateClick = (idIstoricPersoana) => {
  //   setOldDate(istoricPosturi.find(post => post.idIstoricPersoana === idIstoricPersoana).dataFinal);
  //   setDataTypeDateButton('data final');
  //   setShowCalendar({ ...showCalendar, [idIstoricPersoana]: true });
  // }
  const [oldDates, setOldDates] = useState({});

  const handleStartDateClick = (idIstoricPersoana) => {
    const oldDate = istoricPosturi.find(post => post.idIstoricPersoana === idIstoricPersoana).dataInceput;

    setOldDates({ ...oldDates, [idIstoricPersoana]: oldDate });
    setDataTypeDateButton('data început');
    setShowCalendar({ ...showCalendar, [idIstoricPersoana]: true });
  }
  const handleEndDateClick = (idIstoricPersoana) => {
    const oldDate = istoricPosturi.find(post => post.idIstoricPersoana === idIstoricPersoana).dataFinal;
    setOldDates({ ...oldDates, [idIstoricPersoana]: oldDate });
    setDataTypeDateButton('data final');
    setShowCalendar({ ...showCalendar, [idIstoricPersoana]: true });
  }

  const handleCalendarClose = (idIstoricPersoana) => {
    if (dataTypeDateButton === 'data început') {
      changeData(idIstoricPersoana, oldDates[idIstoricPersoana], '', '');
    }
    else if (dataTypeDateButton === 'data final') {
      changeData(idIstoricPersoana, '', oldDates[idIstoricPersoana], '')
    }
    setShowCalendar({ ...showCalendar, [idIstoricPersoana]: false });
  }
  return (
    <>
      {user?.role ?
        <>
          <Container>

            {/* ######################################### ROLURI ######################################### */}

            {(pagina === 'adaugaRoluri' || pagina === 'editRoluri') && <>
              {pagina === 'adaugaRoluri' ?
                <h1 className={styles.addTitlu}>Adăugare raport cronologic - Rolul</h1>
                :
                <h1 className={styles.addTitlu}>Editează roluri</h1>
              }
              {istoricPosturi.map((rol, index) => (
                <Row key={'_' + index + '_'} className='mt-4'>
                  <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.info}>
                      <h3>Rol</h3>
                    </div>
                  </Col>
                  <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.inputs}>
                      <Input
                        name='post'
                        id='post'
                        value={rol.post}
                        label='Denumire rol'
                        placeholder='Post jucator'
                        onChange={(e) => { handleChange(e, rol.idIstoricPersoana) }}
                        error={showErrors && checkErrors('post') ? true : false}
                        helper={showErrors ? checkErrors('post') : ''}
                      />
                      {pagina === 'adaugaRoluri' ?
                        <>
                          <label>Data început {rol.dataInceput && <strong><br />{moment(rol.dataInceput, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>}</label>
                          <Calendar onChange={(e) => {
                            changeData(rol.idIstoricPersoana, getNewDateFormat(e), '', '');
                          }} />
                          <div className='mt-5'>
                            <label>Data final {rol.dataFinal && <strong><br />{moment(rol.dataFinal, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>}</label>
                            <Calendar onChange={(e) => {
                              changeData(rol.idIstoricPersoana, '', getNewDateFormat(e), '');
                            }} />
                          </div>
                        </>
                        :
                        <>
                          <Row>
                            <Col>
                              <label>Data început <br /><strong>{moment(rol.dataInceput, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong></label>
                            </Col>
                            <Col />
                            <Col>
                              <label>Data final <br /><strong>{moment(rol.dataFinal, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong></label>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Buton
                                id='dataInceput'
                                variant='primary'
                                label='Schimbă data de început'
                                onClick={() => {
                                  handleStartDateClick(rol.idIstoricPersoana)
                                }}
                              />
                            </Col>
                            <Col />
                            <Col>
                              <Buton
                                id='dataFinal'
                                variant='primary'
                                label='Schimbă data de final'
                                onClick={() => {
                                  handleEndDateClick(rol.idIstoricPersoana)
                                }}
                              />
                            </Col>
                          </Row>
                          {showCalendar[rol.idIstoricPersoana] && (
                            <Row className='mt-5'>
                              <label>Schimba {dataTypeDateButton}</label>
                              <Calendar onChange={
                                dataTypeDateButton === 'data început' ?
                                  (e) => { changeData(rol.idIstoricPersoana, getNewDateFormat(e), '', ''); }
                                  :
                                  (e) => { changeData(rol.idIstoricPersoana, '', getNewDateFormat(e), ''); }
                              } />

                              <Buton
                                variant='secondary'
                                label='Anulează'
                                onClick={() => { handleCalendarClose(rol.idIstoricPersoana); }} />
                            </Row>
                          )}
                        </>
                      }
                    </div>
                  </Col>
                  <Col>
                    {/* {istoricPosturi.length > 1 && */}
                    <Tooltip title='Șterge rubrică' placement='right' arrow onClick={() => { setIdFieldToDelete(rol.idIstoricPersoana); togglePopup(); }}>
                      <IconButton className={styles.iconStyle}>
                        <RiDeleteBinFill />
                      </IconButton>
                    </Tooltip>

                  </Col>
                </Row>
              ))}
              {pagina === "adaugaRoluri" &&
                <Tooltip title='Adaugă rol' placement='top' arrow className={styles.addRowButton} onClick={handleAddRow}>
                  <IconButton className={styles.iconStyle}>
                    <MdAddCircleOutline className={styles.add} />
                  </IconButton>
                </Tooltip>
              }
            </>
            }

            {/* ########################################################################################## */}
            {/* ######################################### PREMII ######################################### */}
            {/* ########################################################################################## */}

            {
              (pagina === 'adaugaPremii' || pagina === 'editPremii') &&
              <>
                {pagina === 'adaugaPremii' && <h1 className={styles.addTitlu}>Adăugare raport cronologic - Premiul</h1>}
                {pagina === 'editPremii' && <h1 className={styles.addTitlu}>Editează premii</h1>}
                {realizariPersonale.length === 0 && realizariPersonale.map((premiu, index) => (
                  <Row key={index + '_' + premiu.id + '_' + premiu.idRealizariPersonale} className='mt-4'>
                    <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                      <div className={styles.info}>
                        <h3>Premiu</h3>
                      </div>
                    </Col>
                    <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                      <div className={styles.inputs}>
                        <Input
                          name='denumireRezultat'
                          id='denumireRezultat'
                          value={premiu.denumireRezultat}
                          label='Denumire premiu'
                          placeholder='Denumire premiu'
                          onChange={handleChange}
                          error={showErrors && checkErrors('titlu') ? true : false}
                          helper={showErrors ? checkErrors('titlu') : ''}
                        />
                        <label>Data obținerii</label>
                        <Calendar name='dataObtinerii' value={getDataSetValueCalendar(premiu?.dataObtinerii)} onChange={(e) => {

                        }} />
                      </div>
                    </Col>

                    <Col><RiDeleteBinFill onClick={() => handleDeleteRow(premiu.id)} /></Col>
                  </Row>
                ))}
              </>
            }

            <Row style={{ marginTop: '40px', marginBottom: '60px' }}>
              <Col md={{ span: 5, offset: 0 }}></Col>
              <Col md={{ span: 5, offset: 0 }}>
                <Row>
                  <Col sm={{ span: 4, offset: 0 }}>
                    <Buton
                      variant='primary'
                      label={(pagina === 'editRoluri' || pagina === 'editPremii') ? 'Actualizează' : 'Publică'}
                      // onClick={id ? handleUpdate : handleSubmit}
                      onClick={
                        (pagina === 'editRoluri' || pagina === 'editPremii')
                          ? () => {
                            handleUpdate();
                          }
                          : handleSubmit
                      }
                    />
                  </Col>
                  <Col sm={{ span: 4, offset: 2 }}>
                    <Buton
                      variant='destructive'
                      label='Anulează'
                      onClick={() => togglePopup()}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {
              openPopup && (
                <Popup
                  setOpenPopup={setOpenPopup}
                  openPopup={openPopup}
                  content={
                    <div className={styles.popup}>
                      <h3 className={styles.titlePopup}>Confirmare acțiuni efectuate</h3>
                      <p className={styles.descriptionPopup}>
                        Această acțiune este permanentă și nu poate fi anulată.
                      </p>
                      <div className={styles.butonsPopup}>
                        {
                          idFieldToDelete ?
                            <button
                              className={styles.backPopup}
                              onClick={() => { handleDeleteRow(idFieldToDelete); togglePopup(); setIdFieldToDelete(''); }}
                            >
                              Șterge
                            </button>
                            :
                            <button
                              className={styles.backPopup}
                              onClick={() => { navigate('/personal/' + id) }}
                            >
                              Confirm
                            </button>
                        }
                        <button
                          className={styles.deletePopup}
                          onClick={() => { togglePopup(); setIdFieldToDelete(''); }}
                        >
                          Renunț
                        </button>
                      </div>
                    </div>
                  }
                />
              )
            }
          </Container >

        </>
        :
        navigate('/')
      }
    </>
  );
};

export default AddEditRaportCronologic;
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
import DropdownComponent from '../../../../componente/Dropdown/Dropdown';
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
      setIstoricPosturi(response.data);
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
    if (pagina === 'editPremii' || pagina === 'adaugaPremii') {
      const newRows = [...realizariPersonale];
      const index = realizariPersonale.findIndex((data) => data.idRealizariPersonale === id);
      newRows[index][name] = value;
      setRealizariPersonale(newRows);
    }
  };
  const handleChangeDropdown = (e, id) => {
    const { value, label } = e;
    if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
      const newRows = [...istoricPosturi];
      const index = istoricPosturi.findIndex((data) => data.idIstoricPersoana === id);
      newRows[index].post = value;
      setIstoricPosturi(newRows);
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
        const newRows = [...realizariPersonale];
        const index = realizariPersonale.findIndex((data) => data.idRealizariPersonale === id);
        newRows[index].dataObtinerii = data_Obtinerii;
        setRealizariPersonale(newRows);
      }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
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
    }
  };

  const handleUpdate = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
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
    }
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
  const checkErrors = (name, value) => {

    if (name === 'denumireRezultat') {
      if (value.length < 5 && value.length  > 0) {
        return 'Numele premiului trebuie sa conțină cel puțin 5 caractere!';
      } else if (value.length > 50) {
        return 'Numele premiului trebuie să conțină maxim 50 de caractere!';
      } else if (value.length === 0) {
        return 'Numele premiului este obligatoriu!';
      }
    }
    if(name === 'dataObtinerii'){
      if(value.length === 0){
        return 'Alegerea unei date este obligatorie!';
      }
    }

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
        // Object.keys(realizariPersonale).forEach((field) => {
        //   console.log(realizariPersonale[field].denumireRezultat,realizariPersonale[field].idRealizariPersonale);
        //     if (checkErrors(realizariPersonale[field].denumireRezultat,realizariPersonale[field].idRealizariPersonale)) {
        //       isValid = false;
        //     }
        // });
        const newRows = [...realizariPersonale];
        newRows.map(premiu =>{
          if(checkErrors('denumireRezultat',premiu.denumireRezultat))
            isValid = false;
          if(isValid && checkErrors('dataObtinerii',premiu.dataObtinerii))
            isValid = false;
      })
        return isValid;
      }
  };

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
      if (pagina === 'adaugaPremii' || pagina === 'editPremii')
        setRealizariPersonale([...realizariPersonale.filter(data => data.idRealizariPersonale !== id)]);
  }

  //popup
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  const [oldDates, setOldDates] = useState({});

  const handleStartDateClick = (idIstoricPersoana) => {
    const oldDate = istoricPosturi.find(post => post.idIstoricPersoana === idIstoricPersoana).dataInceput;

    setOldDates({ ...oldDates, [idIstoricPersoana]: oldDate });
    setDataTypeDateButton('data de început');
    setShowCalendar({ ...showCalendar, [idIstoricPersoana]: true });
  }

  const handleEndDateClick = (idIstoricPersoana) => {
    const oldDate = istoricPosturi.find(post => post.idIstoricPersoana === idIstoricPersoana).dataFinal;
    setOldDates({ ...oldDates, [idIstoricPersoana]: oldDate });
    setDataTypeDateButton('data de final');
    setShowCalendar({ ...showCalendar, [idIstoricPersoana]: true });
  }

  const handleDataObtineriiClick = (idRealizariPersonale) => {
    const oldDate = realizariPersonale.find(premiu => premiu.idRealizariPersonale === idRealizariPersonale).dataObtinerii;

    setOldDates({ ...oldDates, [idRealizariPersonale]: oldDate });
    setDataTypeDateButton('data obținerii');
    setShowCalendar({ ...showCalendar, [idRealizariPersonale]: true });
  }

  const handleCalendarClose = (id) => {
    if (dataTypeDateButton === 'data de început') {
      changeData(id, oldDates[id], '', '');
    }
    else if (dataTypeDateButton === 'data de final') {
      changeData(id, '', oldDates[id], '')
    }
    else if (dataTypeDateButton === 'data obținerii') {
      changeData(id, '', '', oldDates[id])
    }
    setShowCalendar({ ...showCalendar, [id]: false });
  }

  let Posturi = [
    { value: 'PRINCIPAL', label: 'PRINCIPAL' },
    { value: 'SECUNDAR', label: 'SECUNDAR' },
    { value: 'CENTRU', label: 'CENTRU' },
    { value: 'OPUS', label: 'OPUS' },
    { value: 'RIDICATOR', label: 'RIDICATOR' },
    { value: 'LIBERO', label: 'LIBERO' },
    { value: 'EXTREMA', label: 'EXTREMA' },
    { value: 'ANTRENOR', label: 'ANTRENOR' },
  ];


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
                      <DropdownComponent
                        title={rol.post ? rol.post : 'Denumire post'}
                        options={Posturi}
                        onChange={(e) => { handleChangeDropdown(e, rol.idIstoricPersoana) }}
                      ></DropdownComponent>

                      {pagina === 'adaugaRoluri' ?
                        <>
                          <label>Data de început {rol.dataInceput && <strong><br />{moment(rol.dataInceput, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>}</label>
                          <Calendar onChange={(e) => {
                            changeData(rol.idIstoricPersoana, getNewDateFormat(e), '', '');
                          }} />
                          <div className='mt-5'>
                            <label>Data de încheiere {rol.dataFinal && <strong><br />{moment(rol.dataFinal, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>}</label>
                            <Calendar onChange={(e) => {
                              changeData(rol.idIstoricPersoana, '', getNewDateFormat(e), '');
                            }} />
                          </div>
                        </>
                        :
                        <>
                          <Row>
                            <Col>
                              <label>Data de început <br /><strong>{moment(rol.dataInceput, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong></label>
                            </Col>
                            <Col />
                            <Col>
                              <label>Data de încheiere <br /><strong>{moment(rol.dataFinal, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong></label>
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
                                label='Schimbă data de încheiere'
                                onClick={() => {
                                  handleEndDateClick(rol.idIstoricPersoana)
                                }}
                              />
                            </Col>
                          </Row>
                          {showCalendar[rol.idIstoricPersoana] && (
                            <Row className='mt-5'>
                              <label>Schimbă {dataTypeDateButton}</label>
                              <Calendar onChange={
                                dataTypeDateButton === 'data de început' ?
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
                {realizariPersonale.map((premiu, index) => (
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
                          onChange={(e) => { handleChange(e, premiu.idRealizariPersonale) }}
                          error={showErrors && checkErrors('denumireRezultat', premiu.denumireRezultat) ? true : false}
                          helper={showErrors ? checkErrors('denumireRezultat', premiu.denumireRezultat) : ''}
                        />
                        {pagina === 'adaugaPremii' ?
                          <>
                            <label>Data obținerii {premiu.dataObtinerii && <strong><br />{moment(premiu.dataObtinerii, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>}</label>
                            <Calendar onChange={(e) => {
                              changeData(premiu.idRealizariPersonale, '', '', getNewDateFormat(e));
                            }} />
                          </>
                          :
                          <>
                            <Row>
                              <Col>
                                <label>Data obținerii<br /><strong>{moment(premiu.dataObtinerii, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong></label>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Buton
                                  id='dataObtinerii'
                                  variant='primary'
                                  label='Schimbă data obținerii'
                                  onClick={() => {
                                    handleDataObtineriiClick(premiu.idRealizariPersonale)
                                  }}
                                />
                              </Col>
                            </Row>
                            {showCalendar[premiu.idRealizariPersonale] && (
                              <Row className='mt-5'>
                                <label>Schimbă {dataTypeDateButton}</label>
                                <Calendar onChange={(e) => changeData(premiu.idRealizariPersonale, '', '', getNewDateFormat(e))} />
                                <Buton
                                  variant='secondary'
                                  label='Anulează'
                                  onClick={() => { handleCalendarClose(premiu.idRealizariPersonale); }} />
                              </Row>
                            )}
                          </>

                        }

                      </div>
                    </Col>

                    <Col>
                      <Tooltip title='Șterge rubrică' placement='right' arrow onClick={() => { setIdFieldToDelete(premiu.idRealizariPersonale); togglePopup(); }}>
                        <IconButton className={styles.iconStyle}>
                          <RiDeleteBinFill />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Row>
                ))}
                {pagina === "adaugaPremii" &&
                  <Tooltip title='Adaugă premiu' placement='top' arrow className={styles.addRowButton} onClick={handleAddRow}>
                    <IconButton className={styles.iconStyle}>
                      <MdAddCircleOutline className={styles.add} />
                    </IconButton>
                  </Tooltip>
                }
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
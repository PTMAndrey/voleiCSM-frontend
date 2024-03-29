/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Calendar } from 'react-calendar';

import { updateMeci, getMeciById, addMeci } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';
import Popup from '../../PaginaPrincipala/Popup';
import Input from '../../../componente/Input/Input';
import Buton from '../../../componente/Buton/Buton';
import DropdownComponent from '../../../componente/Dropdown/Dropdown';
import styles from './AddEditMeciuri.module.scss';
import moment from 'moment/moment';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AddEdit = () => {
  const navigate = useNavigate();
  const { editii, echipe, setAlert, filtruMeciuri, setFiltruMeciuri } = useStateProvider();
  const { id } = useParams();
  const {width} = useWindowDimensions();

  const [showErrors, setShowErrors] = useState(false);
  const [showEroareCalendar, setShowEroareCalendar] = useState(false);
  const [dataCalendar, setDataCalendar] = useState('');
  const [dataCalendarEdit, setDataCalendarEdit] = useState()
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [eroareCalendar, setEroareCalendar] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };
  const [formValue, setFormValue] = useState({
    id: '',
    idEditie: '',
    numeEditie: '',
    data: '',
    numeAdversar: '',
    logoAdversar: '',
    locatie: '',
    scorCSM: '',
    scorAdversar: '',
    teren: 'ACASA',
    link: '',
  });

  const getMeci = async () => {
    const response = await getMeciById(id);
    if (response?.status === 200) {
      setFormValue({
        id: response.data.id,
        idEditie: response.data.idEditie,
        numeEditie: response.data.numeEditie,
        data: response.data.data,
        numeAdversar: response.data.numeAdversar,
        logoAdversar: response.data.logoAdversar,
        locatie: response.data.locatie || '',
        scorCSM: response.data.scorCSM || '',
        scorAdversar: response.data.scorAdversar || '',
        teren: response.data.teren,
        link: response.data.link || '',
      });

      setDataCalendarEdit(moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate())
      setDataCalendar(response.data.data)
      if (moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate().getHours() < 10)
        setSelectedHour('0' + moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate().getHours())
      else
        setSelectedHour(moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate().getHours())

      if (moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate().getMinutes() < 10)
        setSelectedMinute('0' + moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate().getMinutes())
      else
        setSelectedMinute(moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate().getMinutes())
    }
  };

  useEffect(() => {
    if (id) {
      getMeci();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  useEffect(() => {
    if (id && !formValue) {
      navigate('/not-found')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  

  useEffect(() => {
    setFiltruMeciuri({ ...filtruMeciuri, status: 'VIITOR' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let Editii = [];
  useEffect(() => {
    editii?.map(editie =>
      Editii.push({ value: `${editie.idEditie}`, label: `${editie.numeEditie}` })
    )
  }, [editii, Editii]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let Echipe = [];
  useEffect(() => {
    echipe?.map(echipa =>
      Echipe.push({ value: `${echipa.numeClubSportiv}`, label: `${echipa.numeClubSportiv}` })
    )
  }, [echipe, Echipe]);



  //------------------------------- HANDLERE

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setShowEroareCalendar(true);
      setShowErrors(true);
      setDisabledButton(false);
      setAlert({ type: 'danger', message: 'Câmpurile trebuie completate!' });
    }
    if (isFormValid()) {
      setShowEroareCalendar(false);
      setShowErrors(false);
      try {
        setDisabledButton(true);
        const response = await addMeci(formValue);

        if (response.status === 200) {
          navigate('/calendar');
          setAlert({ type: 'success', message: 'Meciul a fost publicat' });
        }
        else {
          setDisabledButton(false);
          setAlert({ type: 'danger', message: 'Eroare la trimiterea datelor!' });
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!isFormValid()) {
      setShowEroareCalendar(true);
      setDisabledButton(false);
      setShowErrors(true);
      setAlert({ type: 'danger', message: 'Câmpurile trebuie completate!' });
    }
    if (isFormValid()) {
      setShowEroareCalendar(false);
      setShowErrors(false);
      try {
        setDisabledButton(true);
        const response = await updateMeci(formValue);
        if (response?.status === 200) {
          navigate('/calendar');
        }
        else {
          setDisabledButton(false);
          setAlert({ type: 'danger', message: 'Eroare la actualizarea datelor!' });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChoice = (e) => {
    setFormValue({ ...formValue, numeAdversar: e.value });
  }

  //-------------------------------- VALIDARI
  // check errors
  const checkErrors = (field) => {

    if (field === 'locatie') {
      if (formValue.locatie.length > 0 && formValue.locatie.length < 10) {
        return 'Locatia trebuie sa conțină cel puțin 10 caractere!';
      } else if (formValue.locatie.length > 50) {
        return 'Locatia trebuie să conțină maxim 50 de caractere!';
      } else if (formValue.locatie.length === 0) {
        return 'Locatia este obligatorie!';
      }
    }

    if (field === 'numeAdversar') {
      if (!formValue.numeAdversar)
        return 'Echipa adversară este obligatoriu de selectat!';
    }

    if (field === 'idEditie') {
      if (!formValue.idEditie)
        return 'Campionatul este obligatoriu de selectat!';
    }

    if (field === 'data') {
      if (!dataCalendar) {
        setShowEroareCalendar(true);
        setEroareCalendar('Alegeti data calendaristică!');
        return 'Alegeti data calendaristică!';
      }
      else
        setShowEroareCalendar(false);
    }

    if (field === 'scorCSM') {
      if (dataCalendarEdit) {
        if (dataCalendarEdit < new Date(new Date().setHours(0, 0, 0, 0)) && !formValue.scorCSM) {
          return 'Introduceti scor';
        }
        if (dataCalendarEdit.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) && Number(selectedHour) <= new Date().getHours() && Number(selectedMinute) < new Date().getMinutes()) {
          return 'Introduceti scor'
        }
      }
    }

    if (field === 'scorAdversar') {
      if (dataCalendarEdit) {
        if (dataCalendarEdit < new Date().setHours(0, 0, 0, 0) && !formValue.scorAdversar) {
          return 'Introduceti scor';
        }
        if (dataCalendarEdit.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) && Number(selectedHour) <= new Date().getHours() && Number(selectedMinute) < new Date().getMinutes()) {
          return 'Introduceti scor'
        }
      }
    }

    if (field === 'link') {
      if (formValue.link) {
        const regex = /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
        if (!regex.test(formValue.link))
          return 'Link-ul introdus este invalid';
      }
    }

    if (field === 'ora') {
      if (!dataCalendar) {
        return 'Alegeti ora!';
      }
    }

    if (field === 'minut') {
      if (!dataCalendar) {
        return 'Alegeti minutele!';
      }
    }

    return '';
  };

  // check if form is valid
  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  const hours = [];
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    if (i < 10 && i < 24)
      hours.push({ value: `0${i}`, label: `0${i}` },);
    else
      if (i < 24)
        hours.push({ value: `${i}`, label: `${i}` },);

    if (i < 10 && i < 60)
      minutes.push({ value: `0${i}`, label: `0${i}` },);
    else
      minutes.push({ value: `${i}`, label: `${i}` },);
  }

  const getDataFromCalendar = (e) => {
    return !e ? null : ((e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear());
  }
  return (
    <Container>
      {id ? <h1 className={styles.addTitlu}>Editare meci</h1> :
        <h1 className={styles.addTitlu}>Adăugare meci</h1>}
      <Row>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Echipa 1</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={`${styles.inputs} mt-3`}>
            <Input
              name='echipa1'
              id='echipa1'
              value='C.S.M. Suceava'
              label=''
              placeholder='C.S.M. Suceava'
              disabled
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Echipa 2 *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <DropdownComponent
              title={id ? formValue.numeAdversar ? formValue.numeAdversar : 'Alege echipa' : 'Alege echipa'}
              options={Echipe}
              searchable={width < 750 ? false : true}
              onChange={(e) => {
                e === null ?
                  setFormValue({ ...formValue, numeAdversar: '' }) :
                  handleChoice(e);
              }}
              error={showErrors && checkErrors('numeAdversar') ? true : false}
              helper={showErrors ? checkErrors('numeAdversar') : ''}
            />
          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Teren *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <div>
              <label htmlFor='teren1'>
                <input
                  id='teren1'
                  type='radio'
                  name='teren'
                  value='ACASA'
                  checked={formValue.teren === 'ACASA'}
                  onChange={(e) => {
                    handleChange(e);
                    setFormValue({ ...formValue, teren: 'ACASA' });
                  }}
                />
                {' '} ACASĂ
              </label>
            </div>
            <div className='mt-3'>
              <label htmlFor='teren2'>
                <input
                  id='teren2'
                  type='radio'
                  name='teren'
                  value='DEPLASARE'
                  checked={formValue.teren === 'DEPLASARE'}
                  onChange={(e) => {
                    handleChange(e);
                    setFormValue({ ...formValue, teren: 'DEPLASARE' });
                  }}
                />
                {' '} DEPLASARE
              </label>
            </div>
          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Detalii *</h3>
          </div>
        </Col>
        <Col md={{ span: 8, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.publicare}>
            <DropdownComponent
              title={id ? formValue.idEditie ? formValue.numeEditie : 'Alege campionat' : 'Alege campionat'}
              options={Editii}
              onChange={(e) => {
                e === null ?
                  setFormValue({ ...formValue, idEditie: '' }) :
                  setFormValue({ ...formValue, idEditie: e.value });
              }}
              error={showErrors && checkErrors('idEditie') ? true : false}
              helper={showErrors ? checkErrors('idEditie') : ''}
            />
            <Input
              name='locatie'
              id='locatie'
              value={formValue.locatie}
              label='Locatia'
              placeholder='Locatia'
              onChange={handleChange}
              error={showErrors && checkErrors('locatie') ? true : false}
              helper={showErrors ? checkErrors('locatie') : ''}
            />
            <div className={styles.alegeZiua}>
              <div>
                {!id ? <p>Alege zi </p>
                  : moment(getDataFromCalendar(dataCalendarEdit), 'DD-MM-YYYY').format('DD MMMM YYYY') && <p>Data meci: {moment(getDataFromCalendar(dataCalendarEdit), 'DD-MM-YYYY').format('DD MMMM YYYY')}</p>
                }
                <Calendar
                  className={` ${showEroareCalendar && eroareCalendar && styles.helperErr}`}
                  name='data'
                  value={dataCalendarEdit}
                  onChange={(e) => {
                    setFormValue({ ...formValue, data: getDataFromCalendar(e) + ' ' + selectedHour + ':' + selectedMinute })
                    setDataCalendar(getDataFromCalendar(e))
                    setDataCalendarEdit(e)
                    setShowEroareCalendar(false);
                  }}
                  minDate={new Date(2010, 1, 1)} />
                {showEroareCalendar && <p className='mt-4 text-danger'>{eroareCalendar}</p>}
              </div>
              <div>
                <p>Ore</p>
                <DropdownComponent
                  title={formValue.data.length <= 10 ? 'Alege ora' : selectedHour}
                  options={hours}
                  searchable={width < 750 ? false : true}
                  onChange={(e) => {
                    setFormValue({ ...formValue, data: formValue.data.split(' ')[0] + ' ' + e.value + ':' + selectedMinute })
                    setSelectedHour(e.value);
                  }}
                  error={showErrors && checkErrors('ora') ? true : false}
                  helper={showErrors ? checkErrors('ora') : ''}
                />

                <p>Minute</p>
                <DropdownComponent
                  title={formValue.data.length <= 13 ? 'Alege minutele' : selectedMinute}
                  options={minutes}
                  searchable={width < 750 ? false : true}
                  onChange={(e) => {
                    setFormValue({ ...formValue, data: formValue.data.split(':')[0] + ':' + e.value })
                    setSelectedMinute(e.value);
                  }}
                  error={showErrors && checkErrors('minut') ? true : false}
                  helper={showErrors ? checkErrors('minut') : ''}
                />
              </div>
            </div>
            <Input
              type='number'
              name='scorCSM'
              id='scorCSM'
              value={formValue.scorCSM}
              label='Scor C.S.M. Suceava'
              placeholder='Scor'
              min='0'
              onChange={handleChange}
              error={showErrors && checkErrors('scorCSM') ? true : false}
              helper={showErrors ? checkErrors('scorCSM') : ''}
            />
            <Input
              type='number'
              name='scorAdversar'
              id='scorAdversar'
              value={formValue.scorAdversar}
              label={'Scor ' + (formValue.numeAdversar ? formValue.numeAdversar : 'echipa adversară')}
              placeholder='Scor'
              min='0'
              onChange={handleChange}
              error={showErrors && checkErrors('scorAdversar') ? true : false}
              helper={showErrors ? checkErrors('scorAdversar') : ''}
            />
          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>LIVE</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={`mt-2 ${styles.inputs}`}>
            <Input
              name='link'
              id='link'
              type="url"
              label='Link vizualizare LIVE'
              placeholder={"https://www.example.com"}
              pattern="https://www*.*.*"
              title="Adresa url de forma: https://www.example.com"
              value={formValue.link}
              onChange={handleChange}
              error={showErrors && checkErrors('link') ? true : false}
              helper={showErrors ? checkErrors('link') : ''}
            />
          </div>
        </Col>
      </Row>

      <Row className='mt-5 mb-5'>
        <Col md={{ span: 5, offset: 0 }}></Col>
        <Col md={{ span: 5, offset: 0 }}>
          <Row>
            <Col sm={{ span: 4, offset: 0 }}>
              <Buton
                variant='primary'
                disabled={disabledButton}
                label={id ? 'Actualizează' : 'Publică'}
                onClick={() => {
                  if (id) handleUpdate(); else handleSubmit();
                }} />
            </Col>
            <Col sm={{ span: 4, offset: 2 }} className={styles.phoneResolutionMarginTop}>
              <Buton
                variant='destructive'
                disabled={disabledButton}
                label='Anulează'
                onClick={() => togglePopup()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {openPopup && (
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
                <button
                  className={styles.backPopup}
                  onClick={() => { navigate(-1) }}
                >
                  Confirm
                </button>
                <button
                  className={styles.deletePopup}
                  onClick={() => { togglePopup(); }}
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
  );
};

export default AddEdit;
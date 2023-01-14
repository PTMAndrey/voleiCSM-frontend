import React, { useState, useCallback, useEffect } from 'react';

import { ReactComponent as Add } from '../../../assets/icons/add.svg';

import { Container, Row, Col } from 'react-bootstrap';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Calendar } from 'react-calendar';

import { updateMeci, getMeciById, addMeci } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';
import useAuth from '../../../hooks/useAuth';

import Popup from '../../PaginaPrincipala/Popup';
import Input from '../../../componente/Input/Input';
import Buton from '../../../componente/Buton/Buton';
import DropdownComponent from '../../../componente/Dropdown/Dropdown';

import styles from './AddEditMeciuri.module.scss';
import moment from 'moment/moment';

const AddEdit = () => {
  const navigate = useNavigate();

  const { editii, echipe, setAlert, filtruMeciuri, setFiltruMeciuri } = useStateProvider();
  const { userId } = useAuth();

  const { id } = useParams();

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);

  const [dataFinala, setDataFinala] = useState('');
  const [dataCalendar, setDataCalendar] = useState('');
  const [dataCalendarEdit, setDataCalendarEdit] = useState()
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [eroareCalendar, setEroareCalendar] = useState('');
  const [valueInHour, setValueInHour] = useState(true);

  const [openPopup, setOpenPopup] = useState(false);
  //popup
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  // form data
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
    if (response.status === 200) {
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
      console.log('edit- ', response.data);

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
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // handleSubmit
  const handleSubmit = async () => {

    console.log('inainte de validare', formValue);
    if (!isFormValid()) {
      setShowErrors(true);
      setAlert({ type: 'danger', message: 'Câmpurile trebuie completate!' });
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        console.log('mno, inainte de add', formValue);
        const response = await addMeci(formValue);
        console.log('\nraspuns\n', response);

        if (response.status === 200)
          navigate('/calendar');

      } catch (error) {
        console.log(error);
      }
    }
  };

  // handleUpdate
  const handleUpdate = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        const response = await updateMeci(formValue);
        if (response.status === 200) {
          navigate('/calendar');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleChangeData = (e, tipData) => {
  //   if (tipData === 'data')
  //     if (!e)
  //       setDataCalendar(getDataFromCalendar(e));
  //     else
  //       setDataCalendar('');
  //   if (tipData === 'ora')
  //     if (!e)
  //       setSelectedHour(e.value);
  //     else
  //       setSelectedHour('')

  //   if (tipData === 'minute')
  //     if (!e)
  //       setSelectedMinute(e.value);
  //     else
  //       setSelectedMinute('')

  //   setForm();
  // }
  // const setForm = () => { setFormValue({ ...formValue, data: dataCalendar + ' ' + selectedHour + ':' + selectedMinute }); }

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
        setEroareCalendar('Alegeti data calendaristică!');
        return 'Alegeti data calendaristică!';
      }
    }

    if (field === 'ora') {
      if (!selectedHour) {
        return 'Alegeti ora!';
      }
    }

    if (field === 'minut') {
      if (!selectedMinute) {
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

  console.log('log-->', formValue);
  return (
    <Container className={styles.addBackgroundColor}>
      {id ?
        <h1 className={styles.addTitlu}>Editare meci</h1>
        :
        <h1 className={styles.addTitlu}>Adăugare meci</h1>
      }
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
              // title='Alege echipa'
              title={id ? formValue.numeAdversar ? formValue.numeAdversar : 'Alege echipa' : 'Alege echipa'}
              options={Echipe}
              clearable={true}
              searchable={true}
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
              // title='Alege campionat'
              title={id ? formValue.idEditie ? formValue.numeEditie : 'Alege campionat' : 'Alege campionat'}
              options={Editii}
              clearable={true}
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
                {/* {console.log('\n\nTEEEEEEEEST\n',dataCalendar, '\n',dataCalendarEdit,'\nTEEEEEEEEEEEST\n\n')} */}
                {!id ? <p>Alege zi </p>
                  : moment(getDataFromCalendar(dataCalendarEdit), 'DD-MM-YYYY').format('DD MMMM YYYY') && <p>Data meci: {moment(getDataFromCalendar(dataCalendarEdit), 'DD-MM-YYYY').format('DD MMMM YYYY')}</p>
                }
                <Calendar
                  className={` ${showErrors && eroareCalendar && styles.helperErr}`}
                  name='data'
                  value={dataCalendarEdit}
                  onChange={(e) => {
                    // (selectedHour && selectedMinute) ?
                    setFormValue({ ...formValue, data: getDataFromCalendar(e) + ' ' + selectedHour + ':' + selectedMinute })
                    // :
                    // selectedHour ?
                    // setFormValue({ ...formValue, data: getDataFromCalendar(e) + ' ' + selectedHour})
                    // :
                    // setFormValue({ ...formValue, data: getDataFromCalendar(e)})


                    setDataCalendar(getDataFromCalendar(e))
                    setDataCalendarEdit(e)

                    // setSelectedHour('');
                    // setSelectedMinute('');
                  }}
                  minDate={new Date(2010, 1, 1)} />
                {showErrors && <p className='mt-4 text-danger'>{eroareCalendar}</p>}
              </div>
              <div>
                <p>Ore</p>
                <DropdownComponent
                  title={formValue.data.length <= 10 ? 'Alege ora' : selectedHour}
                  options={hours}
                  // clearable={true}
                  searchable={true}
                  onChange={(e) => {
                    // setFormValue({ ...formValue, data: '' })
                    // !e ? setFormValue({ ...formValue, data: dataCalendar }) :
                    //   setFormValue({ ...formValue, data: dataCalendar + ' ' + e.value });
                    // !e ? setSelectedHour('') : setSelectedHour(e.value);

                    // e.value !== 'Alege ora' ?
                    // selectedMinute ?
                    setFormValue({ ...formValue, data: formValue.data.split(' ')[0] + ' ' + e.value + ':' + selectedMinute })
                    // :
                    // setFormValue({ ...formValue, data: formValue.data.split(' ')[0] + ' ' + e.value})
                    // :
                    // setFormValue({ ...formValue, data: dataCalendar})
                    setSelectedHour(e.value);

                    // setSelectedMinute('');
                  }}
                  error={showErrors && checkErrors('ora') ? true : false}
                  helper={showErrors ? checkErrors('ora') : ''}
                />

                <p>Minute</p>
                <DropdownComponent
                  title={formValue.data.length <= 13 ? 'Alege minutele' : selectedMinute}
                  options={minutes}
                  // clearable={true}
                  searchable={true}
                  onChange={(e) => {
                    // e.value !== 'Alege minutele' ?
                    setFormValue({ ...formValue, data: formValue.data.split(':')[0] + ':' + e.value })
                    // :
                    // setFormValue({ ...formValue, data: dataCalendar + ' ' + selectedHour });
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
          <div className={styles.inputs}>
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
                label={id ? 'Actualizează' : 'Publică'}
                // onClick={id ? handleUpdate : handleSubmit}
                onClick={() => {
                  if (id) {
                    handleUpdate();
                  } else {
                    handleSubmit();
                  }
                }}
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
                  <button
                    className={styles.backPopup}
                    onClick={() => { id ? navigate('/calendar/' + id) : navigate('/calendar') }}
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
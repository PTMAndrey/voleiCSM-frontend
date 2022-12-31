import React, { useState, useCallback, useEffect } from 'react';

import { ReactComponent as Add } from '../../../../assets/icons/add.svg';

import { Container, Row, Col } from 'react-bootstrap';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Calendar } from 'react-calendar';

import { getRealizariPersonaleByPersoanaId, addIstoricPosturiToId, addRealizarePersonaleToId, getIstoricPosturiByPersoanaId } from '../../../../api/API';
import useStateProvider from '../../../../hooks/useStateProvider';

import Input from '../../../../componente/Input/Input';
import Buton from '../../../../componente/Buton/Buton';

import styles from './AddEditRaportCronologic.module.scss';
import moment from 'moment';
import 'moment/locale/ro';

const AddEditRaportCronologic = ({ pagina }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);


  // istoric posturi
  const [istoricPosturi, setIstoricPosturi] = useState({
    idIstoricPersoana: '',
    id: '',
    post: '',
    dataInceput: '',
    dataFinal: '',
  });

  const getIstoricPosturiPentruEdit = async () => {
    const response = await getIstoricPosturiByPersoanaId(id);
    if (response.status === 200) {
      setIstoricPosturi(response.data);
      console.log('posturi', response.data);
    }
  };

  // realizari personale ( premii )
  const [realizariPersonale, setRealizariPersonale] = useState({
    idRealizariPersonale: '',
    id: '',
    denumireRezultat: '',
    dataObtinerii: '',
  });

  const getRealizariPersonalePentruEdit = async () => {
    const response = await getRealizariPersonaleByPersoanaId(id);
    if (response.status === 200) {
      // setRealizariPersonale({
      //   idRealizariPersonale: response.data.idRealizariPersonale,
      //   id: response.data.id,
      //   denumireRezultat: response.data.denumireRezultat,
      //   dataObtinerii: response.data.dataObtinerii,
      // });
      setRealizariPersonale(response.data);
      console.log('realizari', response.data);
    }
  };


  //------------------------------ useEffect

  // get stire by id to edit
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
  // handleChange

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
      setIstoricPosturi((prev) => {
        return { ...prev, [name]: value };
      });
    }
    else
      if (pagina === 'editPremii' || pagina === 'adaugaPremii')
        setRealizariPersonale((prev) => {
          return { ...prev, [name]: value };
        });
  };

  const changeData = (id, data_Inceput = '', data_Final = '', data_Obtinerii = '') => {
    // const { name } = e.target;

    console.log("\n\nposturi before",istoricPosturi,"\n\n");
    if (pagina === 'editRoluri' || pagina === 'adaugaRoluri') {
      // for (let i = 0; i < istoricPosturi.length; i++) {
      //   if (istoricPosturi[i].idIstoricPersoana === id) {
      //     if (dataInceput)
      //     {

      //     }
      //     if (dataFinal)
      //     {

      //     }
      //   }
      // }
      const modifiedArray = istoricPosturi.map(obj => {
        if (obj.idIstoricPersoana === id) {
          return { ...obj, dataInceput: data_Inceput };
        }
        return obj;
      });
      // setIstoricPosturi(modifiedArray);
      console.log("array nou",modifiedArray);

      console.log('default values', id, data_Inceput, data_Final);
      console.log("\n\nposturi after ",istoricPosturi,"\n\n");
    }
    // else
    //   if (pagina === 'editPremii' || pagina === 'adaugaPremii')
    //     setRealizariPersonale((prev) => {
    //       return { ...prev, [name]: dataModificata };
    //     });

  };
  console.log("---", istoricPosturi);

  // handleSubmit
  const handleSubmit = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
      console.log('Required fields must be completed!');
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

        console.log('\nraspuns\n', response);

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
        // const response = await updateStire(formValue);
        // if (response.status === 200) {
        //   navigate('/confirmation');
        //   setPrevizualizareStiri({});
        // }
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

  // check if form is valid
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

  const getData = (data) => {
    let fullDate = data.split('-');
    let zi = fullDate[0];
    let luna = fullDate[1];
    let an = fullDate[2];
    return new Date(an, luna - 1, zi);
  }
  const getNewDateFormat = (e) => {
    return String(e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear();
  }
  
  return (
    <Container className={styles.addBackgroundColor}>

      {pagina === 'adaugaRoluri' && <h1 className={styles.addTitlu}>Adăugare raport cronologic - Rolul</h1>}
      {pagina === 'adaugaPremii' && <h1 className={styles.addTitlu}>Adăugare raport cronologic - Premiul</h1>}
      {pagina === 'editRoluri' && <h1 className={styles.addTitlu}>Editează roluri</h1>}
      {pagina === 'editPremii' && <h1 className={styles.addTitlu}>Editează premii</h1>}

      {(pagina === 'adaugaRoluri' || pagina === 'editRoluri') &&
        <>
          {istoricPosturi.length > 0 && istoricPosturi.map((rol) => (
            <Row key={rol.id + '_' + rol.idIstoricPersoana} className='mt-4'>
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
                    onChange={handleChange}
                    error={showErrors && checkErrors('titlu') ? true : false}
                    helper={showErrors ? checkErrors('titlu') : ''}
                  />
                  <label>Data început</label>
                  <Calendar value={getData(rol.dataInceput)} onChange={(e) => {
                    changeData(rol.idIstoricPersoana, getNewDateFormat(e),'','');
                  }} />
                  <div className='mt-5'>
                    <label>Data final</label>
                    <Calendar value={getData(rol.dataFinal)} onChange={(e) => {
                    changeData(rol.idIstoricPersoana, '', getNewDateFormat(e),'');
                    }} />
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </>
      }

      {
        (pagina === 'adaugaPremii' || pagina === 'editPremii') &&
        <>
          {realizariPersonale.length > 0 && realizariPersonale.map((premiu) => (
            <Row key={premiu.id + '_' + premiu.idRealizariPersonale} className='mt-4'>
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
                  <Calendar name="dataObtinerii" value={getData(premiu.dataObtinerii)} onChange={(e) => {
                  
                  }} />
                </div>
              </Col>
            </Row>
          ))}
        </>
      }

      <Row style={{ marginTop: '40px', marginBottom: '60px' }}>
        <Col md={{ span: 4, offset: 0 }}></Col>
        <Col md={{ span: 6, offset: 0 }}>
          <Row>
            <Col sm={{ span: 4, offset: 3 }}>
              <Buton
                variant='primary'
                label={id ? 'Actualizează' : 'Publică'}
                // onClick={id ? handleUpdate : handleSubmit}
                onClick={
                  id
                    ? () => {
                      handleUpdate();
                    }
                    : handleSubmit
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container >
  );
};

export default AddEditRaportCronologic;


function Dropzone({ onDrop, accept, open }) {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/jpeg': [],
      'image/bmp': [],
    },
    maxFiles: 9,
    onDrop,
  });

  const [isHovered, setHovered] = useState(false);
  return (
    <div
      onMouseLeave={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
    >
      <div
        {...getRootProps({
          className: `${styles.dropzone} ${isDragAccept && styles.accept} ${isDragReject && styles.reject
            }`,
        })}
      >
        <input {...getInputProps()} />
        <div>
          {isDragActive ? (
            isDragReject ? (
              <p>File not supported</p>
            ) : (
              <p>Release here</p>
            )
          ) : isHovered ? (
            <p>Drag and drop or click</p>
          ) : (
            <Add />
          )}
        </div>
      </div>
    </div>
  );
}
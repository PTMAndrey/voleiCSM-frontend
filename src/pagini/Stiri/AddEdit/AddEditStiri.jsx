/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';

import { ReactComponent as Add } from '../../../assets/icons/add.svg';

import { Container, Row, Col } from 'react-bootstrap';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { addStire, updateStire, getStireById } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';
import useAuth from '../../../hooks/useAuth';

import Input from '../../../componente/Input/Input';
import Buton from '../../../componente/Buton/Buton';
import TextArea from '../../../componente/TextArea/TextArea';
import DropdownComponent from '../../../componente/Dropdown/Dropdown';

import styles from './AddEditStiri.module.scss';
import Popup from '../../PaginaPrincipala/Popup';
import moment from 'moment/moment';
import useWindowDimensions from '../../../hooks/useWindowDimensions';


const AddEditStiri = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { setAlert } = useStateProvider();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (id && id.length < 30)
      navigate('/not-found');
  }, [id]);

  const [showErrors, setShowErrors] = useState(false);
  // const [showCalendar, setShowCalendar] = useState(false);
  const [showEroareCalendar, setShowEroareCalendar] = useState(false);
  const [showEroareDescriere, setShowEroareDescriere] = useState(false);
  const [dataCalendar, setDataCalendar] = useState('');
  const [dataCalendarEdit, setDataCalendarEdit] = useState()
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [eroareCalendar, setEroareCalendar] = useState('');
  const [eroareDescriere, setEroareDescriere] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  // form data

  const [file, setFile] = useState({ file: [] });
  const [fileInForm, setFileInForm] = useState({ file: [] });
  const [formValue, setFormValue] = useState({
    titlu: '',
    autor: sessionStorage.getItem('userId'),
    descriere: '',
    status: 'PUBLICAT',
    dataPublicarii: String(getCurrentData()),
    hashtag: '',
    imagini: [],
    imaginiURL: [],
    videoclipuri: '',
    file: [],
  });

  const getStire = async () => {
    const response = await getStireById(id);
    if (response?.status === 200) {
      setFormValue({
        id: response.data.id,
        titlu: response.data.titlu,
        autor: response.data.autor,
        descriere: response.data.descriere,
        hashtag: response.data.hashtag || '',
        status: response.data.status,
        dataPublicarii: response.data.dataPublicarii,
        imagini: response.data.imagini,
        imaginiURL: response.data.imaginiURL,
        videoclipuri: response.data.videoclipuri,
      });
      setDataCalendarEdit(moment(response.data.dataPublicarii, 'DD-MM-YYYY hh:mm').toDate())
      setDataCalendar(response.data.dataPublicarii)
    }
  };


  const [editorState, setEditorState] = useState(
    EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    formValue.descriere = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  }

  //------------------------------ useEffect

  // get stire by id to edit
  useEffect(() => {
    if (id) {
      getStire();
    }
  }, [id]);

  useEffect(() => {
    formValue.file = fileInForm.file;
  }, [fileInForm])

  useEffect(() => {
    if (formValue.descriere) {
      const content = JSON.parse(formValue.descriere);
      const contentState = convertFromRaw(content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [formValue.descriere])

  //------------------------------- HANDLERE
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // handleDrop
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) =>
      setFileInForm((prevState) => {
        return {
          ...prevState,
          file: [...prevState.file, file]
        }
      })
    )

    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFile((prevState) => {
          return {
            ...prevState,
            file: [...prevState.file, e.target.result],
          };
        });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  // handleDelete imagine
  const handleDelete = (index) => {
    setFile((prevState) => {
      return {
        file: prevState.file.filter((imagine, i) => i !== index),
      };
    });
    setFileInForm((prevState) => {
      return {
        file: prevState.file.filter((imagine, i) => i !== index),
      };
    });

    if (id) {
      let imagini = formValue.imagini.split(", ");
      imagini.splice(1, 1);
      if (imagini.length === 0) {
        formValue.imagini = "";
      } else if (imagini.length === 1) {
        formValue.imagini = imagini[0];
      } else {
        formValue.imagini = imagini.join(", ");
      }

      setFormValue((prevState) => {
        return {
          ...prevState,
          imaginiURL: prevState.imaginiURL.filter((image, i) => i !== index),
        };
      });
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setDisabledButton(false);
      setShowEroareCalendar(true);
      setShowErrors(true);
      setAlert({ type: 'danger', message: 'Câmpurile trebuie completate!' });
    }
    if (isFormValid()) {
      setShowEroareCalendar(false);
      setShowErrors(false);
      try {
        setDisabledButton(true);
        var FormData = require('form-data');
        var fs = require('fs');
        var data = new FormData();

        data.append('titlu', formValue.titlu);
        data.append('descriere', formValue.descriere);
        data.append('status', formValue.status);
        data.append('dataPublicarii', formValue.dataPublicarii);
        data.append('autor', formValue.autor);
        data.append('hashtag', formValue.hashtag);
        formValue.file.map((img, i) => {
          data.append('file', img);
        })
        console.log(formValue.file[0], '\n\n\n',formValue)
        const response = await addStire(data);
        if (response?.status === 200) {
          navigate("/confirmare/noutati/");
        }
        else {
          setDisabledButton(false);
          setAlert({ type: 'danger', message: 'Eroare la trimiterea datelor!' });
        }
      } catch (error) {
        setDisabledButton(false);
        console.log(error);
      }
    }
  };

  // handleUpdate
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
        var FormData = require('form-data');
        var fs = require('fs');
        var data = new FormData();
        data.append('titlu', formValue.titlu);
        data.append('descriere', formValue.descriere);
        data.append('status', formValue.status);
        data.append('dataPublicarii', formValue.dataPublicarii);
        data.append('autor', formValue.autor);
        data.append('hashtag', formValue.hashtag);
        data.append('imagini', formValue.imagini);
        formValue.file ?
          formValue?.file.map((img, i) => {
            data.append('file', img);
          }) : data.append('file', null)
        const response = await updateStire(id, data);
        if (response?.status === 200) {
          navigate("/confirmare/noutati/");
        }
        else {
          setDisabledButton(false);
          setAlert({ type: 'danger', message: 'Eroare la actualizarea datelor!' });
        }
      } catch (error) {
        setDisabledButton(false);
        console.log(error);
      }
    }
  };




  //-------------------------------- VALIDARI
  // check errors
  const checkErrors = (field) => {
    // title
    if (field === 'titlu') {
      if (formValue.titlu.length < 10 && formValue.titlu.length > 0) {
        return 'Titlul trebuie sa conțină cel puțin 10 caractere!';
      } else if (formValue.titlu.length > 100) {
        return 'Titlul trebuie să conțină maxim 100 de caractere!';
      } else if (formValue.titlu.length === 0) {
        return 'Titlul este obligatoriu!';
      }
    }

    if (field === "descriere") {
      if (formValue.descriere.length < 15) {
        setShowEroareDescriere(true);
        setEroareDescriere("Descrierea este obligatorie!")
        return "Descrierea este obligatorie!";
      }
      else {
        setShowEroareDescriere(false);
      }
    }

    if (field === 'status') {
      if (formValue.status.length === 0) {
        return 'Selectați una dintre opțiunile de publicare existente!'
      }
    }

    if (field === "file") {
      if (formValue.file.length > 9)
        return "Maxim 9 imagini";
    }

    if (formValue.status === 'PROGRAMAT') {
      if (field === 'dataPublicarii') {
        if (!dataCalendar) {
          setShowEroareCalendar(true);
          setEroareCalendar('Alegeti data calendaristică!');
          return 'Alegeti data calendaristică!';
        }
        else
          setShowEroareCalendar(false);
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
    }

    return '';
  };

  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  function getCurrentData() {
    const e = new Date();
    const hour = e.getHours();
    const minutes = e.getMinutes();
    return ((e.getDate() < 10 ? '0' + String(e.getDate()) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear() + ' ' + (hour < 10 ? ('0' + String(hour)) : hour) + ':' + (minutes < 10 ? ('0' + String(minutes)) : minutes));

  }
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
    <Container className={styles.addBackgroundColor}>
      <h1 className={styles.addTitlu}>Adaugă știre</h1>
      <Row>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Detalii *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <Input
              name='titlu'
              id='titlu'
              value={formValue.titlu}
              label='Titlu'
              placeholder='Titlu'
              onChange={handleChange}
              error={showErrors && checkErrors('titlu') ? true : false}
              helper={showErrors ? checkErrors('titlu') : ''}
            />
            <Input
              name='hashtag'
              id='hashtag'
              value={formValue.hashtag}
              placeholder='#tag'
              label='Definire hashtaguri'
              onChange={handleChange}
              error={showErrors && checkErrors('hashtag') ? true : false}
              helper={showErrors ? checkErrors('hashtag') : ''}
            />

          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Imagini</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* previzualizareStiri */}
          <Col
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {formValue?.imaginiURL &&
              <>{formValue?.imaginiURL.map((img, index) => (
                <div key={index} className={styles.previzualizareStiri}>
                  <img src={img} alt="" />
                  <RiDeleteBinFill onClick={() => {
                    handleDelete(index);
                  }} />
                </div>
              ))}</>}

            {file?.file &&
              <>{file?.file.map((img, index) => (
                <div key={index} className={styles.previzualizareStiri}>
                  <img src={img} alt="" />
                  <RiDeleteBinFill onClick={() => {
                    handleDelete(index);
                  }} />
                </div>
              ))}</>}

            {/* dropzone */}
            <Dropzone onDrop={handleDrop}
              error={showErrors && checkErrors('file') ? true : false}
              helper={showErrors ? checkErrors('file') : ''}
            />

          </Col>
          {showErrors && (
            <div>
              <p className={styles.error}>{checkErrors('imagini')}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 2, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>
              Descriere *
            </h3>
          </div>
        </Col>
        <Col md={{ span: 10, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName={styles.wrapperClass}
              editorClassName={styles.editorClass}
              toolbarClassName={styles.toolbarClass} />
            {showEroareDescriere && <p className='mt-4 text-danger'>{eroareDescriere}</p>}
          </div>

        </Col>

      </Row>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Publicare *</h3>
          </div>
        </Col>
        <Col md={{ span: 8, offset: 0 }} className={styles.bottomBorder}>

          <div className={styles.publicare}>
            {/* Publica acum */}
            <div>
              <label htmlFor='publicaAcum'>
                <input
                  id='publicaAcum'
                  type='radio'
                  name='status'
                  value='PUBLICAT'
                  checked={formValue.status === 'PUBLICAT'}
                  onChange={(e) => {
                    handleChange(e);
                    setFormValue({ ...formValue, status: 'PUBLICAT', dataPublicarii: getCurrentData() });
                    setSelectedHour('');
                    setSelectedMinute('');
                    setDataCalendar('')
                    setDataCalendarEdit();
                    setShowEroareCalendar('');
                  }}
                />
                {' '} Publică acum
              </label>
            </div>

            <div>
              <label>
                <input
                  id='programeaza'
                  type='radio'
                  name='status'
                  value='PROGRAMAT'
                  checked={formValue.status === 'PROGRAMAT'}
                  onChange={(e) => { handleChange(e); setFormValue({ ...formValue, status: 'PROGRAMAT' }); }}
                />
                {' '}Programează publicarea
              </label>
              {formValue.status === 'PROGRAMAT' &&
                <div className={styles.programeazaStire}>
                  <div>
                    {!id ? <p>Alege zi </p>
                      : moment(getDataFromCalendar(dataCalendarEdit), 'DD-MM-YYYY').format('DD MMMM YYYY') && <p>Data știre: {moment(getDataFromCalendar(dataCalendarEdit), 'DD-MM-YYYY').format('DD MMMM YYYY')}</p>
                    }
                    <Calendar
                      className={` ${showEroareCalendar && eroareCalendar && styles.helperErr}`}
                      name='dataPublicarii'
                      value={dataCalendarEdit}
                      onChange={(e) => {
                        setFormValue({ ...formValue, dataPublicarii: getDataFromCalendar(e) + ' ' + selectedHour + ':' + selectedMinute })
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
                      title={formValue.dataPublicarii.length <= 10 ? 'Alege ora' : selectedHour}
                      options={hours}
                      searchable={width < 750 ? false : true}
                      onChange={(e) => {
                        setFormValue({ ...formValue, dataPublicarii: formValue.dataPublicarii.split(' ')[0] + ' ' + e.value + ':' + selectedMinute })
                        setSelectedHour(e.value);
                      }}
                      error={showErrors && checkErrors('ora') ? true : false}
                      helper={showErrors ? checkErrors('ora') : ''}
                    />
                    <p>Minute</p>
                    <DropdownComponent
                      title={formValue.dataPublicarii.length <= 13 ? 'Alege minutele' : selectedMinute}
                      options={minutes}
                      searchable={width < 750 ? false : true}
                      onChange={(e) => {
                        setFormValue({ ...formValue, dataPublicarii: formValue.dataPublicarii.split(':')[0] + ':' + e.value })
                        setSelectedMinute(e.value);
                      }}
                      error={showErrors && checkErrors('minut') ? true : false}
                      helper={showErrors ? checkErrors('minut') : ''}
                    />
                  </div>
                </div>
              }
            </div>
            <div>
              <label>
                <input
                  id='draft'
                  type='radio'
                  name='status'
                  value='DRAFT'
                  checked={formValue.status === 'DRAFT'}
                  onChange={(e) => {
                    handleChange(e);
                    setFormValue({ ...formValue, status: 'DRAFT', dataPublicarii: getCurrentData() });
                    setSelectedHour('');
                    setSelectedMinute('');
                    setDataCalendar('')
                    setDataCalendarEdit();
                    setShowEroareCalendar('');
                  }}
                />
                {' '} Salveaza ca draft
              </label>
            </div>

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
                onClick={id ? () => {
                  handleUpdate()
                } : handleSubmit}
              />
            </Col>
            <Col sm={{ span: 4, offset: 2 }} className={styles.phoneResolutionMarginTop}>
              <Buton
                variant='destructive'
                label='Anulează'
                disabled={disabledButton}
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

export default AddEditStiri;


function Dropzone({ onDrop, accept, open, error, helper }) {
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
          className: `${styles.dropzone} 
          ${isDragAccept && styles.accept} 
          ${isDragReject && styles.reject}
          ${error && styles.error}
          `,
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
      <p className={error ? styles.helperErr : null}>{helper}</p>
    </div>
  );
}
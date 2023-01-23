/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";

import { ReactComponent as Add } from "../../../../assets/icons/add.svg";

import { Container, Row, Col } from "react-bootstrap";
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Calendar } from "react-calendar";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import moment from 'moment/moment';


import { addPersoana, updatePersoana, getPersonalById } from "../../../../api/API";
import useStateProvider from "../../../../hooks/useStateProvider";
import useAuth from "../../../../hooks/useAuth";

import Input from "../../../../componente/Input/Input";
import Buton from "../../../../componente/Buton/Buton";
import DropdownComponent from "../../../../componente/Dropdown/Dropdown";

import styles from "./AddEditPersonal.module.scss";
import Popup from "../../../PaginaPrincipala/Popup";

const AddEditPersonal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setAlert, divizii, Posturi } = useStateProvider();
  const { id } = useParams();
  useEffect(() => {
    if (id && id.length < 30)
      navigate('/not-found');
  }, [id]);

  const [showErrors, setShowErrors] = useState(false);
  const [showEroareCalendar, setShowEroareCalendar] = useState(false);
  const [showEroareDescriere, setShowEroareDescriere] = useState(false);
  const [eroareCalendar, setEroareCalendar] = useState('');
  const [eroareDescriere, setEroareDescriere] = useState('');
  const [dataCalendar, setDataCalendar] = useState('');
  const [dataCalendarEdit, setDataCalendarEdit] = useState()
  const [disabledButton, setDisabledButton] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  // form data
  const [file, setFile] = useState({});
  const [fileInForm, setFileInForm] = useState({});
  const [formValue, setFormValue] = useState({
    nume: '',
    prenume: '',
    dataNasterii: '',
    inaltime: "",
    nationalitate: '',
    personal: 'JUCATOR',
    post: '',
    descriere: '',
    numeDivizie: '',
    imagine: '',
    file: [],
  });

  const getPersoana = async () => {
    const response = await getPersonalById(id);
    if (response.status === 200) {
      setFormValue({
        nume: response.data.nume,
        prenume: response.data.prenume,
        dataNasterii: response.data.dataNasterii,
        inaltime: response.data.inaltime,
        nationalitate: response.data.nationalitate,
        personal: response.data.personal,
        post: response.data.post,
        descriere: response.data.descriere,
        numeDivizie: response.data.numeDivizie,
        imagine: response.data.imagine,
      });
      setDataCalendarEdit(moment(response.data.dataNasterii, 'DD-MM-YYYY hh:mm').toDate())
      setDataCalendar(response.data.dataNasterii)

      console.log('edit', response.data);
    }
  };

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    formValue.descriere = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  }

  //------------------------------ useEffect 
  useEffect(() => {
    if (formValue.descriere) {
      const content = JSON.parse(formValue.descriere);
      const contentState = convertFromRaw(content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [formValue.descriere])

  // get personal by id to edit
  useEffect(() => {
    if (id) {
      getPersoana();
    }
  }, [id]);

  let Divizii = [];
  useEffect(() => {
    divizii?.map(divizie =>
      Divizii.push({ value: `${divizie.denumireDivizie}`, label: `${divizie.denumireDivizie}` })
    )
  }, [divizii, Divizii]);


  useEffect(() => {
    setFormValue({ ...formValue, file: fileInForm.file })
  }, [fileInForm])

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
    //! setez imaginile
    setFileInForm({ file: acceptedFiles[0] })
    //! afisez imaginile
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFile({ file: e.target.result });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  // handleDelete imagine
  const handleDelete = (index) => {
    setFile({ file: '' });
    setFileInForm({ file: '' })
    if (id)
      setFormValue({ ...formValue, imagine: '', file: '' });
  };

  // handleSubmit
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
        const response = await addPersoana(formValue.file, formValue);
        if (response?.status === 200) {
          navigate("/confirmare/personal/");
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
        const response = await updatePersoana(id, formValue.file, formValue);
        if (response) {
          navigate("/confirmare/personal/");
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

  //-------------------------------- VALIDARI

  const checkErrors = (field) => {
    if (field === "nume") {
      if (!formValue.nume) {
        return "Numele este obligatoriu de introdus!";
      }
    }
    if (field === "prenume") {
      if (!formValue.prenume) {
        return "Prenumele este obligatoriu de introdus!";
      }
    }
    if (field === "inaltime") {
      if (!formValue.inaltime) {
        return "Inaltimea este obligatoriu de introdus!";
      }
    }
    if (field === "nationalitate") {
      if (!formValue.nationalitate) {
        return "Nationalitatea este obligatoriu de introdus!";
      }
    }
    if (field === "numeDivizie") {
      if (!formValue.numeDivizie) {
        return "Echipa este obligatoriu de selectat!";
      }
    }
    if (field === "post") {
      if (!formValue.post) {
        return "Postul este obligatoriu de selectat!";
      }
    }
    if (field === "dataNasterii") {
      if (!dataCalendar) {
        setShowEroareCalendar(true);
        setEroareCalendar('Alegeti data calendaristică!');
        return 'Alegeti data calendaristică!';
      }
      else
        setShowEroareCalendar(false);
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

    if (field === "file") {
      if (!formValue.file)
        return 'Alegeti o imagine de profil';
      if (formValue.file.length > 1)
        return "Doar o imagine";
    }


    return "";
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

  const getDataFromCalendar = (e) => {
    return !e ? null : ((e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear());
  }

  return (
    <>
      {user?.role === 'Administrator' ?
        <>
          <Container className={styles.addBackgroundColor}>
            <h1 className={styles.addTitlu}>Adaugă Personal</h1>
            <Row className='mt-5'>
              <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                <div className={styles.info}>
                  <h3>Imagine *</h3>
                </div>
              </Col>
              <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                <Col
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <label>Poza de profil persoană</label>
                  <br />
                  {file?.file ?
                    <div className={styles.previzualizarePersonal}>
                      <img src={file?.file} alt="" />
                      <RiDeleteBinFill onClick={() => {
                        handleDelete();
                      }} />
                    </div>
                    :
                    formValue?.imagine &&
                    <div className={styles.previzualizarePersonal}>
                      <img src={formValue?.imagine} alt="" />
                      <RiDeleteBinFill onClick={() => {
                        handleDelete();
                      }} />
                    </div>
                  }
                  {/* dropzone */}
                  {!formValue.imagine ? <>
                    {fileInForm?.file?.length < 1 &&
                      <Dropzone onDrop={handleDrop}
                        error={showErrors && checkErrors('file') ? true : false}
                        helper={showErrors ? checkErrors('file') : ''}
                      />}

                    {fileInForm?.file === undefined &&
                      <Dropzone onDrop={handleDrop}
                        error={showErrors && checkErrors('file') ? true : false}
                        helper={showErrors ? checkErrors('file') : ''}
                      />}
                  </>
                    : null}
                </Col>
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                <div className={styles.info}>
                  <h3>Echipă *</h3>
                </div>
              </Col>
              <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                <div className={styles.inputs}>
                  <DropdownComponent
                    title={id ? formValue.numeDivizie : 'Alege echipa'}
                    options={Divizii}
                    searchable={true}
                    onChange={(e) => {
                      e === null ?
                        setFormValue({ ...formValue, numeDivizie: '' }) :
                        setFormValue({ ...formValue, numeDivizie: e.value });
                    }}
                    error={showErrors && checkErrors('numeDivizie') ? true : false}
                    helper={showErrors ? checkErrors('numeDivizie') : ''}
                  />
                </div>
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                <div className={styles.info}>
                  <h3>Personal *</h3>
                </div>
              </Col>
              <Col md={{ span: 8, offset: 0 }} className={styles.bottomBorder}>

                <div className={styles.inputs}>
                  <div>
                    <label htmlFor='jucator'>
                      <input
                        id='jucator'
                        type='radio'
                        name='personal'
                        value='JUCATOR'
                        checked={formValue.personal === 'JUCATOR'}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValue({ ...formValue, personal: 'JUCATOR' });
                        }}
                      />
                      {' '} JUCATOR
                    </label>
                  </div>
                  <div className='mt-3'>
                    <label htmlFor='antrenor'>
                      <input
                        id='antrenor'
                        type='radio'
                        name='personal'
                        value='ANTRENOR'
                        checked={formValue.personal === 'ANTRENOR'}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValue({ ...formValue, personal: 'ANTRENOR' });
                        }}
                      />
                      {' '} ANTRENOR
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
              <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                <div className={styles.inputs}>
                  <Input
                    name='nume'
                    id='nume'
                    label='Nume'
                    placeholder="Nume"
                    value={formValue.nume}
                    onChange={handleChange}
                    error={showErrors && checkErrors('nume') ? true : false}
                    helper={showErrors ? checkErrors('nume') : ''}
                  />
                  <Input
                    name='prenume'
                    id='prenume'
                    label='Prenume'
                    placeholder='Prenume'
                    value={formValue.prenume}
                    onChange={handleChange}
                    error={showErrors && checkErrors('prenume') ? true : false}
                    helper={showErrors ? checkErrors('prenume') : ''}
                  />
                  <label>Data nașterii</label>
                  <Calendar
                    className={` ${showEroareCalendar && eroareCalendar && styles.helperErrCalendar} mb-4`}
                    name='data'
                    value={dataCalendarEdit}
                    onChange={(e) => {
                      setFormValue({ ...formValue, dataNasterii: getDataFromCalendar(e) })
                      setDataCalendar(getDataFromCalendar(e))
                      setDataCalendarEdit(e)
                      setShowEroareCalendar(false);
                    }} />
                  {showEroareCalendar && <p className={`mt-2 ${styles.helperErr}`}>{eroareCalendar}</p>}
                  <Input
                    name='inaltime'
                    id='inaltime'
                    label='Înălțime'
                    placeholder='Înălțime'
                    value={formValue.inaltime}
                    onChange={handleChange}
                    error={showErrors && checkErrors('inaltime') ? true : false}
                    helper={showErrors ? checkErrors('inaltime') : ''}
                  />
                  <Input
                    name='nationalitate'
                    id='nationalitate'
                    label='Naționalitate'
                    placeholder='Naționalitate'
                    value={formValue.nationalitate}
                    onChange={handleChange}
                    error={showErrors && checkErrors('nationalitate') ? true : false}
                    helper={showErrors ? checkErrors('nationalitate') : ''}
                  />
                  <label>Post</label>
                  <DropdownComponent
                    title={id ? formValue.post : 'Alege post'}
                    options={Posturi}
                    onChange={(e) => {
                      setFormValue({ ...formValue, post: e.value });
                    }}
                    error={showErrors && checkErrors('post') ? true : false}
                    helper={showErrors ? checkErrors('post') : ''}
                  />
                </div>
              </Col>
            </Row>

            <Row className='mt-5'>
              <Col md={{ span: 2, offset: 0 }} className={styles.bottomBorder}>
                <div className={styles.info}>
                  <h3
                    onClick={() =>
                      setFormValue({
                        ...formValue,
                        descriere:
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum recusandae molestiae consequuntur tempora, esse omnis fugiat quam harum iure?",
                      })
                    }
                  >
                    Descriere *
                  </h3>
                </div>
              </Col>
              <Col md={{ span: 10, offset: 0 }} className={styles.bottomBorder}>
                {/* descriere */}
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

            <Row className='mt-5 mb-5'>
              <Col md={{ span: 5, offset: 0 }}></Col>
              <Col md={{ span: 5, offset: 0 }}>
                <Row>

                  <Col sm={{ span: 4, offset: 0 }}>
                    <Buton
                      variant="primary"
                      disabled={disabledButton}
                      label={id ? "Actualizează" : "Publică"}
                      onClick={
                        id
                          ? () => {
                            handleUpdate();
                          }
                          : handleSubmit
                      }
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
        </>
        :
        navigate('/')
      }
    </>
  );
};


export default AddEditPersonal;


function Dropzone({ onDrop, accept, open, error, helper }) {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/bmp": [],
    },
    maxFiles: 5,
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

      </div> <p className={error ? styles.helperErr : null}>{helper}</p>
    </div>
  );
}
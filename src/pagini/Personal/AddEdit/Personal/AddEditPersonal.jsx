import React, { useState, useCallback, useEffect, useMemo } from "react";

import { ReactComponent as Add } from "../../../../assets/icons/add.svg";

import { Container, Row, Col } from "react-bootstrap";
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Calendar } from "react-calendar";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import moment from 'moment/moment';


import { addPersoana, updatePersoana, getPersonalById } from "../../../../api/API";
import useStateProvider from "../../../../hooks/useStateProvider";
import useAuth from "../../../../hooks/useAuth";

import Input from "../../../../componente/Input/Input";
import Buton from "../../../../componente/Buton/Buton";
import DropdownComponent from "../../../../componente/Dropdown/Dropdown";

import styles from "./AddEditPersonal.module.scss";

const AddEditPersonal = () => {
  const navigate = useNavigate();

  const { previzualizarePersonal, setPrevizualizarePersonal, divizii, Posturi } = useStateProvider();
  const { userId } = useAuth();

  const { id } = useParams();

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);

  // descriere - form
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent())); {/* new */ }


  // show calendar if clicked to Publica Acum
  const [showEroareCalendar, setShowEroareCalendar] = useState(false);
  const [showEroareDescriere, setShowEroareDescriere] = useState(false);
  const [eroareCalendar, setEroareCalendar] = useState('');
  const [eroareDescriere, setEroareDescriere] = useState('');
  const [dataCalendar, setDataCalendar] = useState('');
  const [dataCalendarEdit, setDataCalendarEdit] = useState()

  // form data
  const [file, setFile] = useState({ file: previzualizarePersonal.file } || []);
  const [fileInForm, setFileInForm] = useState({ file: previzualizarePersonal.file } || []);
  const [formValue, setFormValue] = useState({
    nume: previzualizarePersonal.nume || '',
    prenume: previzualizarePersonal.prenume || '',
    dataNasterii: previzualizarePersonal.dataNasterii || '',
    inaltime: previzualizarePersonal.inaltime || "",
    nationalitate: previzualizarePersonal.nationalitate || '',
    personal: previzualizarePersonal.personal || 'JUCATOR',
    post: previzualizarePersonal.post || '',
    descriere: previzualizarePersonal.descriere || '',
    numeDivizie: previzualizarePersonal.numeDivizie || '',
    imagine: previzualizarePersonal.imagine || '',
    file: previzualizarePersonal.file || [],
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
      setDataCalendarEdit(moment(response.data.data, 'DD-MM-YYYY hh:mm').toDate())
      setDataCalendar(response.data.data)

      console.log('edit', response.data);
    }
  };


  //------------------------------ useEffect
  useEffect(() => {
    setPrevizualizarePersonal(formValue);
  }, [formValue]);

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
    setFormValue({ ...formValue, descriere: getHtml(editorState) })
    setShowEroareDescriere(false)
    setEroareDescriere('')
  }, [editorState])

  useEffect(() => {
    setFormValue({ ...formValue, file:fileInForm.file })
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
    // setFormValue({ ...formValue, file: acceptedFiles[0] })
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
      setShowErrors(true);
      console.log("Required fields must be completed!");
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        const response = await addPersoana(formValue.file, formValue);
        console.log("\nraspuns\n", response);
        if (response?.status === 200) {
          navigate("/confirmare/personal/");
          setPrevizualizarePersonal({});
        }
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
        const response = await updatePersoana(id, formValue.file, formValue);
        if (response.status === 200) {
          navigate("/confirmare/personal/");
          setPrevizualizarePersonal({});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //handle Previzualizare
  const handlePrevizualizare = () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
      setPrevizualizarePersonal(formValue);
      navigate("./preview");
    }
  };

  //-------------------------------- VALIDARI

  const checkErrors = (field) => {
    if (field === "nume") {
      if (formValue.nume.length === 0) {
        return "Numele este obligatoriu de introdus!";
      }
    }
    if (field === "prenume") {
      if (formValue.prenume.length === 0) {
        return "Prenumele este obligatoriu de introdus!";
      }
    }
    if (field === "inaltime") {
      if (formValue.inaltime.length === 0) {
        return "Inaltimea este obligatoriu de introdus!";
      }
    }
    if (field === "nationalitate") {
      if (formValue.nationalitate.length === 0) {
        return "Nationalitatea este obligatoriu de introdus!";
      }
    }
    if (field === "numeDivizie") {
      if (formValue.numeDivizie.length === 0) {
        return "Echipa este obligatoriu de selectat!";
      }
    }
    if (field === "post") {
      if (formValue.post.length === 0) {
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
        if (formValue.file.length === 0)
          return 'Alegeti o imagine de profil';
        if (formValue.file.length > 1)
          return "Doar o imagine";
      }

    }



    return "";
  };

  // check if form is valid
  const isFormValid = () => {
    // setFormValue({ ...formValue, file: fileInForm.file });
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

  console.log(formValue, "formValue");

  return (
    <Container className={styles.addBackgroundColor}>
      <h1 className={styles.addTitlu}>Adaugă Personal</h1>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Imagine *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* previzualizarePersonals */}
          <Col
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <label>Poza de profil persoană</label>
            {/* {formValue?.file === undefined && <p className="text-danger"> Doar o imagine!</p>} */}
            <br />
            {file?.file ?
              <div className={styles.previzualizarePersonal}>
                <img src={file?.file} alt="" />
                <RiDeleteBinFill onClick={() => {
                  handleDelete();
                }} />
              </div>
              :
              // edit - incarcare link imagine azure
              formValue?.imagine &&
              <div className={styles.previzualizarePersonal}>
                <img src={formValue?.imagine} alt="" />
                <RiDeleteBinFill onClick={() => {
                  handleDelete();
                }} />
              </div>
            }
            {/* dropzone */}
            {fileInForm?.file?.length < 1 && <Dropzone onDrop={handleDrop}/>}
            {fileInForm?.file === undefined && <Dropzone onDrop={handleDrop} />}
          </Col>
          {showErrors && (
            <div>
              <p className={styles.error}>{checkErrors("imagini")}</p>
            </div>
          )}
        </Col>
      </Row>
      {/* {file?.file?.length > 0 ? <> */}
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Echipă *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <DropdownComponent
              title='Alege echipa'
              options={Divizii}
              clearable={true}
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
              className={` ${showEroareCalendar && eroareCalendar && styles.helperErr} mb-4`}
              name='data'
              value={dataCalendarEdit}
              onChange={(e) => {
                setFormValue({ ...formValue, dataNasterii: getDataFromCalendar(e) })
                setDataCalendar(getDataFromCalendar(e))
                setDataCalendarEdit(e)
                setShowEroareCalendar(false);
              }}
              minDate={new Date(2010, 1, 1)} />
            {showEroareCalendar && <p className='mt-4 text-danger'>{eroareCalendar}</p>}
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
              title='Alege post'
              options={Posturi}
              clearable={true}
              onChange={(e) => {
                e === null ?
                  setFormValue({ ...formValue, post: '' }) :
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
          {/* <TextArea
            name="descriere"
            id="descriere"
            label="Detalii descriere"
            placeholder="Descriere"
            value={formValue.descriere}
            onChange={handleChange}
            error={showErrors && checkErrors('descriere') ? true : false}
            helper={showErrors ? checkErrors('descriere') : ''}
          /> */}
          <div className={styles.inputs}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName={styles.wrapperClass}
              editorClassName={styles.editorClass}
              toolbarClassName={styles.toolbarClass}
            />
            {showEroareDescriere && <p className='mt-4 text-danger'>{eroareDescriere}</p>}
          </div>
          {/* 
        <div className="html-output">{getHtml(editorState)}</div>
        <div className="modal-body" dangerouslySetInnerHTML={{ __html: getHtml(editorState) }} /> */}
        </Col>
      </Row>

      <Row className='mt-5 mb-5'>
        <Col md={{ span: 4, offset: 0 }}></Col>
        <Col md={{ span: 6, offset: 0 }}>
          <Row>
            <Col sm={{ span: 4, offset: 1 }}>
              {!id && (
                <Buton
                  variant="secondary"
                  label="Previzualizare"
                  onClick={handlePrevizualizare}
                />
              )}
            </Col>

            <Col sm={{ span: 4, offset: 3 }}>
              <Buton
                variant="primary"
                label={id ? "Actualizează" : "Publică"}
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

export default AddEditPersonal;


function Dropzone({ onDrop, accept, open }) {
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
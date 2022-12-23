import React, { useState, useCallback, useEffect } from "react";

import { ReactComponent as Add } from "../../../assets/icons/add.svg";

import { Container, Row, Col } from "react-bootstrap";
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Calendar } from "react-calendar";

import { addStire, updateStire, getStireById } from "../../../api/API";
import useStateProvider from "../../../hooks/useStateProvider";
import useAuth from "../../../hooks/useAuth";

import Input from "../../../componente/Input/Input";
import Buton from "../../../componente/Buton/Buton";
import DropdownComponent from "../../../componente/Dropdown/Dropdown";

import styles from "./AddEditMeciuri.module.scss";
import { createReadStream } from 'fs';

const AddEdit = () => {
  const navigate = useNavigate();

  const { previzualizareMeciuri, setPrevizualizareMeciuri } = useStateProvider();
  const { userId } = useAuth();

  const { id } = useParams();

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);

  const [dataProgramata, setDataProgramata] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  // form data
  const [file, setFile] = useState(previzualizareMeciuri.file || []);
  const [formValue, setFormValue] = useState({
    // file: previzualizareMeciuri.file || [],
    titlu: previzualizareMeciuri.title || "",
    autor: userId || '',
    descriere: previzualizareMeciuri.descriere || "",
    status: previzualizareMeciuri.status || "PUBLICAT",
    dataPublicarii: previzualizareMeciuri.dataPublicarii || String(getCurrentData()),
    hashtag: previzualizareMeciuri.hashtag || "",
    imagini: previzualizareMeciuri.imagini || [],
    videoclipuri: previzualizareMeciuri.videoclipuri || '',
  });

  const getStire = async () => {
    const response = await getStireById(id);
    if (response.status === 200) {
      setFormValue({
        autor: response.data.autor,
        id: response.data.id,
        titlu: response.data.titlu,
        imagini: response.data.imagini,
        imaginiURL: response.data.imaginiURL,
        descriere: response.data.descriere,
        hashtag: response.data.hashtag,
        status: response.data.status,
        dataPublicarii: response.data.dataPublicarii,
        videoclipuri: response.data.videoclipuri,
      });
      console.log(response.data);
    }
  };


  //------------------------------ useEffect

  //set previzualizareMeciuri in useEffect
  useEffect(() => {
    setPrevizualizareMeciuri(formValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  // get stire by id to edit
  useEffect(() => {
    if (id) {
      getStire();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);




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
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFormValue((prevState) => {
          return {
            ...prevState,
            imagini: [...prevState.imagini, e.target.result],
          };
        });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  // handleDelete imagine
  const handleDelete = (index) => {
    setFormValue((prevState) => {
      return {
        imagini: prevState.imagini.filter((imagine, i) => i !== index),
      };
    });
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
        const response = await addStire(formValue);
        console.log("\nraspuns\n", response);
        if (response?.status === 200) {
          navigate("/confirmation");
          setPrevizualizareMeciuri({});
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
        const response = await updateStire(formValue);
        if (response.status === 200) {
          navigate("/confirmation");
          setPrevizualizareMeciuri({});
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
      setPrevizualizareMeciuri(formValue);
      navigate("./preview");
    }
  };



  //-------------------------------- VALIDARI
  // check errors
  const checkErrors = (field) => {
    // title
    if (field === "titlu") {
      if (formValue.titlu.length < 10 && formValue.titlu.length > 0) {
        return "Titlul trebuie sa conțină cel puțin 10 caractere!";
      } else if (formValue.titlu.length > 50) {
        return "Titlul trebuie să conțină maxim 50 de caractere!";
      } else if (formValue.titlu.length === 0) {
        return "Titlul este obligatoriu!";
      }
    }

    // imagini
    if (field === "imagini") {
      if (file.length > 9) {
        return "Maxim 9 imagini";
      }
    }
    // descriere
    if (field === "descriere") {
      if (formValue.descriere?.length < 2)
        return `${formValue.descriere?.length} / 250 caractere obligatorii`;
      // } 
      // else if (formValue.descriere.length > 500) {
      //   return "Description must be less than 500 characters long";
      else if (formValue.descriere.length === 0) {
        return "Descrierea este obligatorie!";
      }
    }

    if (field === "status") {
      if (formValue.status.length === 0) {
        return "Selectați una dintre opțiunile de publicare existente!"
      }
    }

    if (formValue.status === 'PROGRAMAT') {
      if (field === "data")
        if (dataProgramata === '')
          return <p style={{ color: 'red', marginTop: '20px' }}>Alegeti data pentru a programa publicarea!</p>;

      if (field === "ora")
        if (selectedHour === '')
          return "Alegeti o ora pentru a programa publicarea!";

      if (field === "minut")
        if (selectedMinute === '')
          return "Alegeti minutele pentru a programa publicarea!";
    }

    return "";
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

  function getCurrentData() {
    const e = new Date();
    const hour = e.getHours();
    const minutes = e.getMinutes();

    return (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1) + '-' + e.getFullYear() + ' ' + (hour < 10 ? ('0' + hour) : hour) + ':' + (minutes < 10 ? ('0' + minutes) : minutes));

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

  console.log(formValue, "formValue");

  return (
    <Container className={styles.addBackgroundColor}>
      <h1 className={styles.addTitlu}>Adăugare meci</h1>
      <Row>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Echipa 1 *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <Input
              name="echipa1"
              id="echipa1"
              value={formValue.titlu}
              label="Echipa 1"
              placeholder="Echipa 1"
              onChange={handleChange}
              error={showErrors && checkErrors("titlu") ? true : false}
              helper={showErrors ? checkErrors("titlu") : ""}
            />
            {formValue?.imagini?.map((img, index) => (
              <div key={index} className={styles.preview}>
                <img src={img} alt="" />
                <RiDeleteBinFill onClick={() => {
                  handleDelete(index);
                }} />

              </div>
            ))}

            {/* dropzone */}
            {formValue?.imagini?.length < 9 && <Dropzone onDrop={handleDrop} />}
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Echipa 2 *</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <Input
              name="echipa2"
              id="echipa2"
              value={formValue.titlu}
              label="Echipa 2"
              placeholder="Echipa 2"
              onChange={handleChange}
              error={showErrors && checkErrors("titlu") ? true : false}
              helper={showErrors ? checkErrors("titlu") : ""}
            />
            {formValue?.imagini?.map((img, index) => (
              <div key={index} className={styles.preview}>
                <img src={img} alt="" />
                <RiDeleteBinFill onClick={() => {
                  handleDelete(index);
                }} />

              </div>
            ))}

            {/* dropzone */}
            {formValue?.imagini?.length < 9 && <Dropzone onDrop={handleDrop} />}
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Detalii *</h3>
          </div>
        </Col>
        <Col md={{ span: 8, offset: 0 }} className={styles.bottomBorder}>

          <div className={styles.publicare}>
            {/* <div> */}
            <Input
              name="campionat"
              id="campionat"
              value={formValue.titlu}
              label="Campionat"
              placeholder="Campionat"
              onChange={handleChange}
              error={showErrors && checkErrors("titlu") ? true : false}
              helper={showErrors ? checkErrors("titlu") : ""}
            />
             <Input
              name="locatia"
              id="locatia"
              value={formValue.titlu}
              label="Locatia"
              placeholder="Locatia"
              onChange={handleChange}
              error={showErrors && checkErrors("titlu") ? true : false}
              helper={showErrors ? checkErrors("titlu") : ""}
            />
              <div className={styles.alegeZiua}>
                <div>
                  <p>Alege zi</p>
                  <Calendar onChange={(e) => {
                    console.log("calendar", (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear());
                    // setFormValue({...formValue, dataPublicarii:(e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear()})
                    setDataProgramata(String(e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear())
                  }} minDate={new Date(2010, 1, 1)} />

                  {showErrors ? checkErrors("data") : ""}
                </div>
                <div>
                  <p>Ore</p>
                  <DropdownComponent
                    title="00"
                    options={hours}
                    clearable={true}
                    searchable={true}
                    onChange={(e) => {
                      !e ? setSelectedHour('') : setSelectedHour(e.value);
                    }}
                    error={showErrors && checkErrors("ora") ? true : false}
                    helper={showErrors ? checkErrors("ora") : ""}
                  />
                  { }
                  <p>Minute</p>
                  <DropdownComponent
                    title="00"
                    options={minutes}
                    clearable={true}
                    searchable={true}
                    onChange={(e) => {
                      e === null ? setSelectedMinute('') : setSelectedMinute(e.value);
                    }}
                    error={showErrors && checkErrors("minut") ? true : false}
                    helper={showErrors ? checkErrors("minut") : ""}
                  />
                </div>
              </div>
            {/* </div> */}
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>LIVE</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            <Input
              name="link"
              id="link"
              value={formValue.titlu}
              label="Link vizualizare LIVE"
              placeholder="LINK"
              onChange={handleChange}
              error={showErrors && checkErrors("titlu") ? true : false}
              helper={showErrors ? checkErrors("titlu") : ""}
            />
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "40px", marginBottom: "60px" }}>
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

export default AddEdit;


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
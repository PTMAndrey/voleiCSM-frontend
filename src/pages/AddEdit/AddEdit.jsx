import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { Input, Button, Select } from "../../components";
// import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import styles from "./AddEdit.module.scss";

import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { RiDeleteBinFill } from 'react-icons/ri';

import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";

import { addStire, updateStire } from "../../api/API";

import useAuth from "../../hooks/useAuth";

import TextArea from "../../components/TextArea/TextArea";
import { useParams } from "react-router-dom";
import { getStireById } from "../../api/API";
import { Calendar } from "react-calendar";

const AddEdit = () => {
  const { setAlert } = useStateProvider();
  const navigate = useNavigate();
  // const [address, setAddress] = useState({});
  // const [coords, setCoords] = useState({});
  const { preview, setPreview } = useStateProvider();
  const { userId } = useAuth();

  const { id } = useParams();

  const [stire, setStire] = useState({});

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
        status: response.data.status,
        dataPublicarii: response.data.dataPublicarii,
        videoclipuri: response.data.videoclipuri,
      });
      console.log(response.data);
    }
  };
  useEffect(() => {
    if (id) {
      getStire();
    }
  }, [id]);

  //console.log(userId, "userId");
  // form data
  const [formValue, setFormValue] = useState({
    file: preview.file || [],
    titlu: preview.title || "",
    autor: userId || '44232',
    descriere: preview.descriere || "",
    status: preview.status || "PUBLICAT",
    dataPublicarii: preview.dataPublicarii || "03-12-2022 20:00",
    imagini: preview.imagini || '',
    videoclipuri: preview.videoclipuri || '',
  });

  //------------------------------ useEffect

  //set preview in useEffect
  useEffect(() => {
    setPreview(formValue);
  }, [formValue]);

  //------------------------------- HANDLERS
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // handleDrop
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((_file) => {
      console.log("@####@#@#@#@#@#\n",_file.path);

      const reader = new FileReader();
      reader.onload = function (e) {
        setFormValue((prevState) => {
          console.log("prev state", prevState.file.path, "\n e.target.result ", e.target.result)
          return {
            ...prevState,
            file: [...prevState.file, e.target.result],
          };
        });
      };
      reader.readAsDataURL(_file);
      return _file;
    });
  }, []);

  // handleDelete imagine
  const handleDelete = (index) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        file: prevState.file.filter((imagine, i) => i !== index),
      };
    });
  };

  //-------------------------------- validations
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
    if (field === "file") {
      if (formValue.file.length > 9) {
        return "Maxim 9 imagini";
      }
    }
    // descriere
    if (field === "descriere") {
      if (formValue.descriere.length < 250) {// && formValue.descriere.toLowerCase() !== 'draft') {
        return `${formValue.descriere.length} / 250 caractere obligatorii`;
        // } 
        // else if (formValue.descriere.length > 500) {
        //   return "Description must be less than 500 characters long";
      } else if (formValue.descriere.length === 0) {
        return "Descrierea este obligatorie";
      }
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

  // show errors only if clicked to submit
  const [showErrors, setShowErrors] = useState(false);

  //handle Preview
  const handlePreview = () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
      setPreview(formValue);
      navigate("./preview");
    }
  };

  // handleSubmit
  const handleSubmit = async () => {
    console.log("intrat",formValue);
    if (!isFormValid()) {
      setShowErrors(true);
      console.log("not form valid");
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        const response = await addStire(formValue);
        console.log("AAAAAAAAAAAAAAAAAA",response);
        if (response.status === 200) {
          navigate("/confirmation");
          setPreview({});
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
          setPreview({});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(formValue, "formValue");
  console.log(showErrors, "showErrors");

  console.log(id, "id");

  return (
    <Container className={styles.addBackgroundColor}>
      <h1 className={styles.addTitle}>Adaugă știre</h1>
      <Row>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Detalii</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.inputs}>
            {/* titlu */}
            <label>Titlu</label>
            <input
              name="titlu"
              id="titlu"
              placeholder="Titlu"
              value={formValue.titlu}
              onChange={handleChange}
            />
              {showErrors ? <>{checkErrors("title")}</> : null}
              {/* {showErrors ? checkErrors("title"): null} */}
            <label>Definire hashtaguri</label>
            <input
              disabled
              style={{ cursor: "pointer" }}
              placeholder="#FRVolei #suceava #csmsuceava #romania #volei #CupaRomaniei #suceavacounty"
            error={showErrors && checkErrors("hashtag") ? true : false}
            helper={showErrors ? checkErrors("hashtag") : ""}
            // name="hashtag"
            // id="hashtag"
            // onChange={handleChange}
            // value={formValue.price}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>{"Imagini & videoclipuri"}</h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* previews */}
          <Col
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {formValue?.file?.map((img, index) => (
              <div key={index} className={styles.preview}>
                <img src={img} alt="" />
                <RiDeleteBinFill onClick={() => {
                  handleDelete(index);
                }} />

              </div>
            ))}

            {/* dropzone */}
            {formValue?.file?.length < 9 && <Dropzone onDrop={handleDrop} />}
          </Col>
          {showErrors && (
            <div>
              <p className={styles.error}>{checkErrors("imagini")}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
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
              Descriere
            </h3>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
          {/* descriere */}
          <TextArea
            name="descriere"
            id="descriere"
            label="Detalii descriere"
            placeholder="Descriere"
            error={(showErrors && checkErrors("descriere")) ? true : false}
            helper={checkErrors("descriere")}
            value={formValue.descriere}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
          <div className={styles.info}>
            <h3>Publicare</h3>
          </div>
        </Col>
        <Col md={{ span: 8, offset: 0 }} className={styles.bottomBorder}>

          <div className={styles.publicare}>
            {/* Publica acum */}
            <div>
              <label htmlFor="publicaAcum">
                <input
                  id="publicaAcum"
                  type="radio"
                  name="status"
                  value="PUBLICAT"
                  onChange={handleChange}
                />
                {" "} Publică acum
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  // name="phone"
                  // id="phone"
                  // value={formValue.phone}
                  onChange={handleChange}
                />
                {" "}Programează publicarea
              </label>

              <div className={styles.programeazaStire}>
                <div>
                <p>Alege zi</p>
                  <Calendar onChange={(e) => {
                    console.log("calendar", (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear());
                  }} minDate={new Date(2010, 1, 1)} />
                </div>
                <div>
                  <p>Alege ora</p>
                  <input />
                </div>
              </div>
            </div>
            <div>
              {/* Daca salveaza ca draft si nu are descriere sa pot inlocui textul cu 'draft' sau ceva asemanator
              astfel incat sa ii permit sa puna camp gol
              * ! sau vorbeste cu Ana sa schimbe in BD
               */}
              <label>
                <input
                  type="radio"
                  value="DRAFT"
                />
                {' '} Salveaza ca draft
              </label>
            </div>

          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px", marginBottom: "60px" }}>
        <Col md={{ span: 4, offset: 0 }}></Col>
        <Col md={{ span: 6, offset: 0 }}>
          <Row>
            <Col sm={{ span: 2, offset: 5 }}>
              {!id && (
                <Button
                  variant="secondary"
                  label="Preview"
                  onClick={handlePreview}
                />
              )}
            </Col>

            <Col sm={{ span: 2, offset: 2 }}>
              <Button
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

export default AddEdit;

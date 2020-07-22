import React from "react";
import Recaptcha from "react-recaptcha";
import AddBtn from "../../SVG/add";
import SubstractBtn from "../../SVG/substract";
import { Row, Col, Button } from "reactstrap";
import UploadIcon from "../../SVG/upload";

const fieldsArr = [
  {
    value: "firstName",
    label: "First Name",
    wraperClass: "",
    type: "text"
  },
  {
    value: "lastName",
    label: "Last Name",
    wraperClass: "mobile-no-margin",
    type: "text"
  },
  { value: "email", label: "Email", wraperClass: "mt-0", type: "email" },
  { value: "phone", label: "Phone", wraperClass: "mt-0", type: "number" },
  {
    value: "currentCompany",
    label: "Current Company",
    wraperClass: "mb-0",
    type: "text"
  },
  {
    value: "totalExp",
    label: "Total Experience",
    wraperClass: "mb-0",
    type: "number"
  }
];

const getStateValue = (props, label) => props[label];

const getFields = (props, index) => {
  const { errorType, errorText, onUpdate } = props;
  return (
    <Col xs={6} key={index}>
      <div className={`md-form ${fieldsArr[index].wraperClass}`}>
        <input
          type={fieldsArr[index].type}
          id={fieldsArr[index].label}
          value={getStateValue(props, fieldsArr[index].value)}
          className={`form-control ${errorType === fieldsArr[index].value &&
            "inp-error"}`}
          onChange={e => onUpdate(e, fieldsArr[index].value)}
        />
        <label htmlFor={fieldsArr[index].label}>{fieldsArr[index].label}</label>
        {errorType === fieldsArr[index].value && (
          <span className="inp-error-msg">{errorText}</span>
        )}
      </div>
    </Col>
  );
};

const eduFields = (props, data, index, name, label) => {
  const { onUpdateEducation } = props;
  return (
    <Col className="inp-col">
      <div
        className={`${index === 0 ? "md-form" : "md-form mobile-no-margin"}`}
      >
        <input
          type="text"
          id={`Graduation-${name}-${index}`}
          className="form-control "
          value={data}
          onChange={e => onUpdateEducation(index, e.currentTarget.value, name)}
        />
        <label htmlFor={`Graduation-${name}-${index}`}>{label}</label>
      </div>
    </Col>
  );
};

const Form = props => {
  const {
    errorType,
    errorText,
    comments,
    uploadName,
    education,
    done,
    keyCaptcha
  } = props;

  return (
    <form className="form carrer-form" action="#" method="post">
      <Row>
        <Col>
          <h2 className="title text-uppercase styled rounded ">
            <span>Personal Details</span>
          </h2>
        </Col>
      </Row>
      <Row>
        {fieldsArr.map((data, index) => {
          if (index < 4) {
            return getFields(props, index);
          }
          return null;
        })}
      </Row>
      <Row>
        <Col>
          <h2 className="title text-uppercase styled">
            <span>Educational Details</span>
          </h2>
        </Col>
      </Row>
      {education.map((data, index) => {
        return (
          <Row className="edu-details" key={index}>
            {eduFields(props, data.degree, index, "degree", "Degree")}
            {eduFields(props, data.grade, index, "grade", "Grade")}
            <Col className="btn-col">
              {data.isAdded ? (
                <Button
                  onClick={event => props.addField(event)}
                  className="edu-btn"
                >
                  <AddBtn />
                </Button>
              ) : (
                <Button
                  onClick={event => props.deleteField(event, index)}
                  className="edu-btn "
                >
                  <SubstractBtn />
                </Button>
              )}
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col>
          <h2 className="title text-uppercase styled">
            <span>Work Experience</span>
          </h2>
        </Col>
      </Row>
      <Row>
        {getFields(props, 4)}
        {getFields(props, 5)}
        <Col xs={12}>
          <div className="md-form mb-0">
            <textarea
              onChange={props.commentsUpdate}
              id="comments"
              className="md-textarea form-control"
              defaultValue={comments}
            />
            <label htmlFor="Comments">Comments</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="md-form text-center mt-4 mb-0">
            <div className="file-field">
              <div className="btn waves-effect waves-light">
                <input
                  type="file"
                  id="file"
                  accept=".pdf"
                  ref={props.uploadCv}
                  onChange={props.handleFileChange}
                />
                <UploadIcon />
              </div>
              <span className="text">Upload CV</span>

              {errorType === "uploadCv" ? (
                <span className="inp-error-msg">{errorText}</span>
              ) : (
                <span className="upload-name">
                  {uploadName ? uploadName : "No File Choosen"}
                </span>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col style={{ position: "relative" }}>
          <Recaptcha
            key={keyCaptcha}
            render="explicit"
            sitekey="6Le-fJQUAAAAAHJmArrjVYPRkPr6d-eTPDgL2V-W"
            verifyCallback={props.verifyCallback}
          />

          {errorType === "captchaToken" && (
            <span className="inp-error-msg">{errorText}</span>
          )}
        </Col>
      </Row>

      <center>
        {done && (
          <p className="mt-3">
            Thank you for contacting us we will get back to you soon.
          </p>
        )}
      </center>
      <div className="text-center mt-4 mb-0">
        <button
          className="btn btn-theme small w-100 waves-effect waves-light"
          onClick={props.onSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;

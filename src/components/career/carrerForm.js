import React, { Component } from "react";
import Form from "./form";

class CarrerForm extends Component {
  state = {
    count: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentCompany: "",
    totalExp: "",
    comments: "",
    done: false,
    errorText: "",
    errorType: "",
    captchaToken: "",
    cvSelected: false,
    uploadName: "",
    keyCaptcha: new Date().getTime(),
    education: [
      {
        degree: "",
        grade: "",
        isAdded: true
      }
    ]
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        keyCaptcha: new Date().getTime()
      });
    }, 1000);
  }

  uploadCv = React.createRef();

  onUpdateEducation = (key, value, name) => {
    const obj = this.state.education;
    Object.values(obj).map((data, id) => {
      if (id === key) {
        const newArr = {
          ...data,
          [name]: value
        };
        return obj.splice(key, 1, newArr);
      }
      return null;
    });
    this.setState({ education: obj });
  };

  addField = event => {
    event.preventDefault();
    const count = this.state.count;
    const obj = this.state.education;
    let arr = [];
    Object.values(obj).map(data => {
      const newArr = {
        ...data,
        isAdded: false
      };
      return arr.push(newArr);
    });
    if (count === 3) {
      const data = {
        degree: "",
        grade: "",
        isAdded: false
      };
      arr.push(data);
    } else {
      const data = {
        degree: "",
        grade: "",
        isAdded: true
      };
      arr.push(data);
    }
    this.setState({
      education: arr,
      count: count + 1
    });
  };

  deleteField = (event, index) => {
    event.preventDefault();
    let arr = this.state.education;
    Object.values(arr).map((data, id) => {
      let i = 1;
      if (index === 4) {
        i = 2;
      }
      if (id === arr.length - i) {
        const newArr = {
          ...data,
          isAdded: true
        };
        return arr.splice(id, 1, newArr);
      }
      return null;
    });
    arr.splice(index, 1);
    this.setState({
      education: arr,
      count: this.state.count - 1
    });
  };

  onUpdate = (e, type) => {
    e.preventDefault();
    this.setState({ [type]: e.target.value });
  };

  validEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? false
      : true;

  getExtension = filename => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };

  handleFileChange = e => {
    var ext = this.getExtension(e.target.value);
    if (ext.toLowerCase() !== "pdf") {
      this.setState({ errorText: "Only 'pdf' supported", errorType: "CV" });
    } else {
      if (e.target.files[0].size > 5242880) {
        this.setState({
          errorText: "Files size should be less than 5 MB",
          errorType: "CV"
        });
      } else {
        let index = e.target.value.lastIndexOf("\\");
        let uploadName = e.target.value.slice(index + 1);
        this.setState({
          errorText: "",
          errorType: "",
          cvSelected: true,
          uploadName: uploadName
        });
      }
    }
  };

  getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      cb(btoa(reader.result));
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  };

  verifyCallback = token => {
    if (this.state.errorType === "captchaToken") {
      this.setState({ captchaToken: token, errorType: "", errorText: "" });
    } else {
      this.setState({ captchaToken: token });
    }
  };

  messageBody = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      currentCompany,
      totalExp,
      comments,
      education
    } = this.state;
    const educationList = education.map(data => {
      return `<tr> <td>${data.degree}</td> <td>${data.grade}</td> </tr>`;
    });
    let showComm = ``;
    if (education.length !== 0) {
      showComm = `<h2>Educational Details</h2>
      <table>
        <tr>
          <th style='text-align:left'>Degree</th>
          <th style='text-align:left'>Grade</th>
        </tr>
        ${educationList}
      </table>`;
    }
    return `
    <h2>Personal Details</h2>
    <table>
     <tr><td><strong>First Name:</strong></td><td>${firstName}</td></tr>
     <tr><td><strong>Last Name:</strong></td><td>${lastName}</td></tr>
     <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
     <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
     <tr><td><strong>Current Company:</strong></td><td>${currentCompany}</td></tr>
     <tr><td><strong>Total Exp:</strong></td><td>${totalExp}</td></tr>
     <tr><td><strong>Comments:</strong></td><td>${comments}</td></tr>
    </table>
    <br />
    ${showComm} 
    `;
  };

  resetState = () => {
    this.setState({
      count: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentCompany: "",
      errorText: "",
      errorType: "",
      totalExp: "",
      comments: "",
      uploadName: "",
      education: [
        {
          degree: "",
          grade: "",
          isAdded: true
        }
      ],
      captchaToken: ""
    });
    window.grecaptcha.reset();
    document.getElementById("comments").value = "";
  };

  fetch = () => {
    this.messageBody();
    var formData = new FormData();
    let reader = new FileReader();
    reader.readAsDataURL(this.uploadCv.current.files[0]);
    this.getBase64(this.uploadCv.current.files[0], res => {
      if (res) {
        formData.append("messageBody", this.messageBody());
        formData.append("cv", res);
        fetch("http://www.innow8.com/mail-api/mailMainAttachementApi.php", {
          method: "POST",
          body: formData
        })
          .then(res => {
            this.setState({ done: true });
            this.resetState();
            setTimeout(() => {
              this.setState({
                done: false
              });
            }, 10000);
          })
          .catch(() => {
            this.resetState();
          });
      }
    });
  };

  onSubmit = e => {
    e && e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
      currentCompany,
      totalExp,
      captchaToken,
      keyCaptcha
    } = this.state;
    let obj = {};
    if (firstName === "") {
      obj.errorText = "First name cannot empty";
      obj.errorType = "firstName";
    } else if (lastName === "") {
      obj.errorText = "Last name cannot empty";
      obj.errorType = "lastName";
    } else if (email === "") {
      obj.errorText = "Email cannot empty";
      obj.errorType = "email";
    } else if (phone === "") {
      obj.errorText = "Phone number cannot empty";
      obj.errorType = "phone";
    } else if (phone.length < 10) {
      obj.errorText = "Please enter valid phone number";
      obj.errorType = "phone";
    } else if (currentCompany === "") {
      obj.errorText = "Current company cannot empty";
      obj.errorType = "currentCompany";
    } else if (totalExp === "") {
      obj.errorText = "Total exp cannot empty";
      obj.errorType = "totalExp";
    } else if (this.uploadCv.current.files.length === 0) {
      obj.errorText = "CV cannot empty";
      obj.errorType = "uploadCv";
    } else if (captchaToken === "" || captchaToken === undefined) {
      obj.errorText = "Captcha cannot empty";
      obj.errorType = "captchaToken";
      obj.keyCaptcha = keyCaptcha + 1;
    }
    const isValidEmail = this.validEmail(email);
    if (!isValidEmail) {
      obj.errorText = "Invalid email address";
      obj.errorType = "email";
    }
    if (obj.errorText !== undefined) {
      this.setState(obj);
      return;
    }

    this.fetch();
  };

  commentsUpdate = e => {
    e.preventDefault();
    this.setState({ comments: e.target.value });
  };

  render() {
    return (
      <Form
        {...this.state}
        onUpdate={this.onUpdate}
        onUpdateEducation={this.onUpdateEducation}
        addField={this.addField}
        deleteField={this.deleteField}
        commentsUpdate={this.commentsUpdate}
        handleFileChange={this.handleFileChange}
        onSubmit={this.onSubmit}
        uploadCv={this.uploadCv}
        verifyCallback={this.verifyCallback}
      />
    );
  }
}

export default CarrerForm;

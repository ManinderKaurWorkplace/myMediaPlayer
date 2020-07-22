import React, { Component } from "react";
import InputData from "../inputs/inputData";

class QuoteForm extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    message: "",
    errorType: "",
    errorText: "",
    done: false,
    comMethod: "email"
  };

  handleChange = (event, type) => {
    this.setState({ [type]: event.target.value });
  };

  handleComMethod = (e, comType) => {
    if (this.state.comMethod !== comType) {
      this.setState({ comMethod: comType });
    }
  };

  validEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? false
      : true;

  messageBody = () => {
    const { name, email, phone, message, comMethod } = this.state;
    const { id } = this.props;
    let showComm = ``;
    if (id === "contact") {
      showComm = `<tr><td><strong>Comm. Type:</strong></td><td>${comMethod}</td></tr>`;
    }
    return `<table>
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        ${showComm}
        <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
       <table>`;
  };

  stateReset = () => {
    this.setState({
      name: "",
      phone: "",
      email: "",
      message: "",
      errorText: "",
      errorType: ""
    });
  };

  fetch = () => {
    this.messageBody();
    var formData = new FormData();
    formData.append("messageBody", this.messageBody());
    fetch("http://www.innow8.com/mail-api/mailMainTextApi.php", {
      method: "POST",
      body: formData
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        this.stateReset();
        this.setState({ done: true });
        setTimeout(() => {
          this.setState({ done: false });
        }, 10000);
      })
      .catch(function(e) {
        this.stateReset();
      });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, email, phone } = this.state;
    let obj = {};

    if (name === "") {
      obj.errorText = "Name cannot empty";
      obj.errorType = "name";
    } else if (email === "") {
      obj.errorText = "Email cannot empty";
      obj.errorType = "email";
    } else if (phone === "") {
      obj.errorText = "Phone cannot empty";
      obj.errorType = "phone";
    } else if (phone.length < 10) {
      obj.errorText = "Please enter valid phone number";
      obj.errorType = "phone";
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

  renderComponent = () => {
    const { comMethod } = this.state;
    const { id } = this.props;
    return (
      <div className="formcreate">
        <form className="form" action="# ">
          <InputData
            type="text"
            id={`name${id}`}
            placeholder="name"
            check={id}
            state={this.state}
            handleChange={this.handleChange}
          />
          <InputData
            type="email"
            id={`email${id}`}
            placeholder="email"
            check={id}
            state={this.state}
            handleChange={this.handleChange}
          />
          <InputData
            type="number"
            id={`phone${id}`}
            placeholder="phone"
            check={id}
            state={this.state}
            handleChange={this.handleChange}
          />
          {id === "contact" && (
            <div className="pt-3 md-radio-wraper">
              <h3 className="md-radio-title mb-3">Method of communication</h3>
              <div className="md-radio md-radio-inline">
                <input
                  id="r-email"
                  type="radio"
                  name="comm"
                  defaultChecked={comMethod === "email"}
                  onClick={event => this.handleComMethod(event, "email")}
                />
                <label htmlFor="r-email">Email</label>
              </div>
              <div className="md-radio md-radio-inline">
                <input
                  id="r-phone"
                  type="radio"
                  name="comm"
                  defaultChecked={comMethod === "phone"}
                  onClick={event => this.handleComMethod(event, "phone")}
                />
                <label htmlFor="r-phone">Phone</label>
              </div>
            </div>
          )}
          <InputData
            type="text"
            id={`message${id}`}
            placeholder="message"
            check={id}
            state={this.state}
            handleChange={this.handleChange}
          />

          <center>
            {this.state.done &&
              "Thank you for contacting us we will get back to you soon"}
          </center>
          <div className="text-center mt-4 mb-0">
            <button
              className="btn btn-theme text-uppercase small w-100 waves-effect waves-light"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return this.renderComponent();
  }
}

export default QuoteForm;

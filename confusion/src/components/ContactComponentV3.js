import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contactType: "Tel.",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    // event.preventDefault();
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = "First Name should be >= 3 characters";
    else if (this.state.touched.firstname && firstname.length > 10)
      errors.firstname = "First Name should be <= 10 characters";

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = "Last Name should be >= 3 characters";
    else if (this.state.touched.lastname && lastname.length > 10)
      errors.lastname = "Last Name should be <= 10 characters";

    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = "Tel. Number should contain only numbers";

    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    return errors;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log("Current State is: " + JSON.stringify(this.state));
    alert("Current State is: " + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    const errors = this.validate(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email
    );
    return (
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
        <Row className="form-group">
          <Label htmlFor="firstname" md={2}>
            First Name
          </Label>
          <Col md={10}>
            <Control.text
              model=".firstname"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="lastname" md={2}>
            Last Name
          </Label>
          <Col md={10}>
            <Control.text
              model=".lastname"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="telnum" md={2}>
            Contact Tel.
          </Label>
          <Col md={10}>
            <Control.text
              model=".telnum"
              id="telnum"
              name="telnum"
              placeholder="Tel. Number"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="email" md={2}>
            Email
          </Label>
          <Col md={10}>
            <Control.text
              model=".email"
              id="email"
              name="email"
              placeholder="Email"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={{ size: 6, offset: 2 }}>
            <div className="form-check">
              <Label check>
                <Control.checkbox
                  model=".agree"
                  name="agree"
                  className="form-check-input"
                />{" "}
                <strong>May we contact you?</strong>
              </Label>
            </div>
          </Col>
          <Col md={{ size: 3, offset: 1 }}>
            <Control.select
              model=".contactType"
              name="contactType"
              className="form-control"
            >
              <option>Tel.</option>
              <option>Email</option>
            </Control.select>
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="message" md={2}>
            Your Feedback
          </Label>
          <Col md={10}>
            <Control.textarea
              model=".message"
              id="message"
              name="message"
              rows="12"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={{ size: 10, offset: 2 }}>
            <Button type="submit" color="primary">
              Send Feedback
            </Button>
          </Col>
        </Row>
      </LocalForm>
    );
  }
}

export default Contact;

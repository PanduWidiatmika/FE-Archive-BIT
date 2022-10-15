import {
  CButton,
  CCard,
  CCol,
  CCardHeader,
  CLink,
  CRow,
  CCardBody,
  CForm,
  CInputGroup,
  CInput,
  CInputGroupText,
  CInputGroupPrepend,
  CCardGroup,
  CContainer,
} from "@coreui/react";
import React, { Component } from "react";
import swal from "sweetalert";
import { api, authToken } from "../plugins/api";

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userBak: [],
      first_name: null,
      last_name: null,
      user_email: null,
      user_password: null,
      role: null,
    };
  }

  insertData = function () {
    const cekToken = window.sessionStorage.getItem("token");
    api
      .post("/insert", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_email: this.state.user_email,
        user_password: this.state.user_password,
        token: cekToken,
      })
      .then((res) => {
        swal("Good job!", "Add user success!", "success");
        window.location.href = "http://localhost:3001/#/viewAdminpage";
      })
      .catch((err) => {
        window.location.href = "http://localhost:3001/#/loginUser";
        swal({ icon: "warning", text: err.response.statusText });
      });
  };

  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  APICheck = (e) => {
    e.preventDefault();

    const email = this.state.user_email;
    if (this.validateEmail(email)) {
      const users = this.state.userBak.filter(
        (f) =>
          f.user_email.toLowerCase() === this.state.user_email.toLowerCase()
      );

      if (users.length > 0) {
        swal("Warning", "Email already exists!", "warning");
      } else {
        this.insertData();
      }
    } else {
      swal({ icon: "warning", text: "Not an Email Format!" });
    }
  };

  async componentDidMount() {
    const cekToken = window.sessionStorage.getItem("token");
    if (cekToken) {
      if (authToken().rid === 0) {
        api
          .post("/get", { token: cekToken })
          .then((res) => {
            this.setState({
              userBak: res.data,
            });
          })
          .catch(async (err) => {
            await swal({ icon: "warning", text: err.response.statusText });
            window.location.href = "http://localhost:3001/#/login";
          });
      } else {
        await swal({ icon: "warning", text: "Unauthorized" });
        window.location.href = "http://localhost:3001/"; //redirect ke user
      }
    } else {
      await swal({ icon: "warning", text: "No Token Provided!" });
      window.location.href = "http://localhost:3001/#/login";
    }
  }

  render() {
    return (
      <div>
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol md="10">
                      <h2>Add User</h2>
                    </CCol>
                    <CCol md="2" className="text-right">
                      <CLink to={{ pathname: "/viewAdminPage" }}>
                        <CButton color="danger">Kembali</CButton>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCardHeader>

                <CCardBody>
                  <CForm method="post" onSubmit={(e) => this.APICheck(e)}>
                    <CRow>
                      <CInputGroup className="mb-3">
                        <CCol md="2">
                          <CInputGroupText>First Name</CInputGroupText>
                        </CCol>
                        <CCol>
                          <CInput
                            type="text"
                            placeholder="John"
                            required
                            onChange={(e) => {
                              this.setState({ first_name: e.target.value });
                            }}
                          ></CInput>
                        </CCol>
                      </CInputGroup>
                    </CRow>

                    <CRow>
                      <CInputGroup className="mb-3">
                        <CCol md="2">
                          <CInputGroupText>Last Name</CInputGroupText>
                        </CCol>
                        <CCol>
                          <CInput
                            type="text"
                            placeholder="Doe"
                            required
                            onChange={(e) => {
                              this.setState({ last_name: e.target.value });
                            }}
                          ></CInput>
                        </CCol>
                      </CInputGroup>
                    </CRow>

                    <CRow>
                      <CInputGroup className="mb-3">
                        <CCol md="2">
                          <CInputGroupText>Email</CInputGroupText>
                        </CCol>
                        <CCol>
                          <CInput
                            type="email"
                            placeholder="johndoe@email.com"
                            required
                            onChange={(e) => {
                              this.setState({ user_email: e.target.value });
                            }}
                          ></CInput>
                        </CCol>
                      </CInputGroup>
                    </CRow>

                    <CRow>
                      <CInputGroup className="mb-3">
                        <CCol md="2">
                          <CInputGroupText>Password</CInputGroupText>
                        </CCol>
                        <CCol>
                          <CInput
                            type="password"
                            required
                            onChange={(e) => {
                              this.setState({ user_password: e.target.value });
                            }}
                          ></CInput>
                        </CCol>
                      </CInputGroup>
                    </CRow>
                    <CRow className="text-center">
                      <CCol>
                        <CButton color="primary" className="px-4" type="submit">
                          Create
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default AddUser;

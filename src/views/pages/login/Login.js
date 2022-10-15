import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { api, authToken } from "../../plugins/api";
import swal from "sweetalert";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user_email: null,
      user_password: null,
    };
  }

  loginData = function (e) {
    e.preventDefault();
    api
      .post("/login", {
        user_email: this.state.user_email,
        user_password: this.state.user_password,
      })
      .then(async (res) => {
        if (res.data.message) {
          swal({ icon: "warning", text: res.data.message });
        } else {
          sessionStorage.setItem("token", res.data);
          if (authToken().ilc === 0) {
            if (authToken().rid === 0) {
              console.log("admin");
              await swal({ text: "Welcome " + authToken().urn + "!" });
              window.location.href = "http://localhost:3001/";
            } else {
              console.log("user");
              await swal({ text: "Welcome " + authToken().urn + "!" });
              window.location.href = "http://localhost:3001/";
            }
          } else {
            // window.location.reload();
            await swal({ icon: "warning", text: "Account is Locked!" });
            window.sessionStorage.removeItem("token");
          }
        }
      });
  };

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="3"></CCol>
            <CCol md="6">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm method="post" onSubmit={(e) => this.loginData(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          placeholder="Email"
                          required
                          onChange={(e) =>
                            this.setState({
                              user_email: e.target.value,
                            })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          required
                          onChange={(e) =>
                            this.setState({
                              user_password: e.target.value,
                            })
                          }
                        />
                      </CInputGroup>
                      <CRow className="text-center">
                        <CCol>
                          <CButton
                            color="primary"
                            className="px-4"
                            type="submit"
                          >
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
            <CCol md="3"></CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;

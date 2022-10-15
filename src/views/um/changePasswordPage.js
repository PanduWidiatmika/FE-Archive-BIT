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
import swal from "sweetalert";
import { api } from "../plugins/api";

class ChangePasswordPage extends Component {
  constructor() {
    super();
    this.state = {
      user_password: "",
      user_passwordRes: "",
    };
  }

  resetPassword = async function (e) {
    e.preventDefault();
    const query = new URLSearchParams(this.props.location.search);
    const email = query.get("email");
    if (this.state.user_password !== this.state.user_passwordRes) {
      await swal({ icon: "warning", text: "Password Not Match" });
      window.location.href = `http://localhost:3001/#/changePassword?email=${email}`;
    } else {
      const query = new URLSearchParams(this.props.location.search);
      const email = query.get("email");
      api
        .put("/changePassword", {
          user_password: this.state.user_password,
          params_user_email: email,
          is_locked: false,
        })
        .then(async (res) => {
          if (res.data.success) {
            await swal({ icon: "success", text: res.data.success });
            window.location.href = `http://localhost:3001/#/login`;
          } else {
            await swal({ icon: "error", text: res.data.failed });
            window.location.href = `http://localhost:3001/#/login`;
          }
        })
        .catch(async (err) => {
          if (err) {
            await swal({ icon: "warning", text: err.message });
            window.location.href = `http://localhost:3001/#/insertVerifCode?email=${email}`;
          }
        });
    }
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
                    <CForm
                      method="post"
                      onSubmit={(e) => this.resetPassword(e)}
                    >
                      <p className="text-muted">Insert your new Password</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          required
                          onChange={(e) =>
                            this.setState({
                              user_password: e.target.value,
                            })
                          }
                        />
                      </CInputGroup>
                      <p className="text-muted">Re-enter Password</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          required
                          onChange={(e) =>
                            this.setState({
                              user_passwordRes: e.target.value,
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
                            Submit
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

export default ChangePasswordPage;

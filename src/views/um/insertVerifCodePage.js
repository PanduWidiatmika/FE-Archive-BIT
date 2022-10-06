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

class InsertVerifCodePage extends Component {
  constructor() {
    super();
    this.state = {
      user_email: "",
      verif_code: "",
    };
  }

  cekVerifCode = function (e) {
    e.preventDefault();

    const query = new URLSearchParams(this.props.location.search);
    const email = query.get("email");
    api
      .post("/cekOtp", {
        user_email: this.state.user_email,
        verif_code: this.state.verif_code,
        params_user_email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          window.location.href = `http://localhost:3000/#/insertVerifCode?email=${email}`;
          swal({ icon: "warning", text: res.data.message });
        } else {
          // window.sessionStorage.setItem("code", res.data[0].verif_code);
          window.location.href = `http://localhost:3000/#/changePassword?email=${email}`;
        }
      })
      .catch((err) => {
        if (err) {
          window.location.href = `http://localhost:3000/#/insertVerifCode?email=${email}`;
          swal({ icon: "warning", text: err.message });
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
                    <CForm method="post" onSubmit={(e) => this.cekVerifCode(e)}>
                      <p className="text-muted">Insert your Email</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          placeholder="johndoe@email.com"
                          required
                          onChange={(e) =>
                            this.setState({
                              user_email: e.target.value,
                            })
                          }
                        />
                      </CInputGroup>
                      <p className="text-muted">Insert your OTP Code</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          required
                          onChange={(e) =>
                            this.setState({
                              verif_code: e.target.value,
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
                            Next
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

export default InsertVerifCodePage;

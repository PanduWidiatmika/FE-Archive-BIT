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
import { api, authToken } from "../plugins/api";
import swal from "sweetalert";

class ViewUser extends Component {
  constructor() {
    super();
    this.state = {
      user: [
        {
          first_name: "",
          last_name: "",
          user_email: "",
          nama_role: "",
        },
      ],
    };
  }

  getOneData = async function (id) {
    const cekToken = window.sessionStorage.getItem("token");
    if (cekToken) {
      if (authToken().rid === 0) {
        api
          .post(`/getOne/${id}`, {
            token: cekToken,
          })
          .then((res) => {
            this.setState({ user: res.data });
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
  };

  componentDidMount() {
    this.getOneData(this.props.match.params.id);
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
                      <h2>View User</h2>
                    </CCol>
                    <CCol md="2" className="text-right">
                      <CLink to={{ pathname: "/viewAdminPage" }}>
                        <CButton color="danger">Kembali</CButton>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCardHeader>

                <CCardBody>
                  <CForm method="post">
                    <CRow>
                      <CInputGroup className="mb-3">
                        <CCol md="2">
                          <CInputGroupText>First Name</CInputGroupText>
                        </CCol>
                        <CCol>
                          <CInput
                            value={this.state.user[0].first_name}
                            disabled
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
                            value={this.state.user[0].last_name}
                            disabled
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
                            value={this.state.user[0].user_email}
                            disabled
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
                            value={this.state.user[0].nama_role}
                            disabled
                          ></CInput>
                        </CCol>
                      </CInputGroup>
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

export default ViewUser;

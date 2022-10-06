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
          id_user: "",
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
            window.location.href = "http://localhost:3000/#/login";
          });
      } else {
        await swal({ icon: "warning", text: "Unauthorized" });
        window.location.href = "http://localhost:3000/"; //redirect ke user
      }
    } else {
      await swal({ icon: "warning", text: "No Token Provided!" });
      window.location.href = "http://localhost:3000/#/login";
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
                    <CCol md="2">
                      <CLink to={{ pathname: "/viewAdminPage" }}>
                        <CButton color="danger">Kembali</CButton>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCardHeader>

                <CCardBody>
                  <CForm method="post">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>User Id</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="John"
                        value={this.state.user[0].id_user}
                        disabled
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>First Name</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="John"
                        value={this.state.user[0].first_name}
                        disabled
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Last Name</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Doe"
                        value={this.state.user[0].last_name}
                        disabled
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Email</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="johndoe1@email.com"
                        value={this.state.user[0].user_email}
                        disabled
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Role</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="role"
                        value={this.state.user[0].nama_role}
                        disabled
                      ></CInput>
                    </CInputGroup>
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

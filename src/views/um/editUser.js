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

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      user: [
        // {
        //   first_name: "",
        //   last_name: "",
        //   user_email: "",
        //   id_user: "",
        //   nama_role: "",
        // },
      ],
      users: [],
      first_name: "",
      last_name: "",
      user_email: "",
      id_user: "",
      nama_role: "",
    };
  }

  getOneData = async function (id) {
    const cekToken = window.sessionStorage.getItem("token");
    if (cekToken) {
      if (authToken().rid === 0) {
        api.post(`/getOne/${id}`, { token: cekToken }).then((res) => {
          this.setState({
            first_name: res.data[0].first_name,
            last_name: res.data[0].last_name,
            user_email: res.data[0].user_email,
            id_user: res.data[0].id_user,
            nama_role: res.data[0].nama_role,
            user: res.data[0],
          });
        });
        api
          .post("/get", { token: cekToken })
          .then((res) => {
            this.setState({
              users: res.data,
            });
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

  updateData = async function () {
    const userId = this.props.match.params.id;
    const cekToken = window.sessionStorage.getItem("token");
    api
      .put("/update", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_email: this.state.user_email,
        id: userId,
        token: cekToken,
      })
      .then(async (res) => {
        await swal("Good job!", "Update user success!", "success");
        window.location.href = "http://localhost:3000/#/viewAdminpage";
      })
      .catch(async (err) => {
        await swal({ icon: "warning", text: err.response.statusText });
        window.location.href = "http://localhost:3000/#/login";
      });
  };

  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  APICheck = (e) => {
    e.preventDefault();

    // const email = this.state.user_email;
    if (this.validateEmail(this.state.user_email)) {
      const users = this.state.users.filter(
        (f) =>
          f.user_email.toLowerCase() === this.state.user_email.toLowerCase()
      );

      if (users.length > 0) {
        swal("Warning", "Email already exists!", "warning");
      } else {
        this.updateData();
      }
    } else {
      swal({ icon: "warning", text: "Not an Email Format!" });
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
                      <h2>Edit User</h2>
                    </CCol>
                    <CCol md="2">
                      <CLink to={{ pathname: "/viewAdminPage" }}>
                        <CButton color="danger">Kembali</CButton>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCardHeader>

                <CCardBody>
                  <CForm method="post" onSubmit={(e) => this.APICheck(e)}>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>User Id</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="John"
                        value={this.state.id_user}
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
                        value={this.state.first_name}
                        onChange={(e) => {
                          this.setState({ first_name: e.target.value });
                        }}
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Last Name</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Doe"
                        value={this.state.last_name}
                        onChange={(e) => {
                          this.setState({ last_name: e.target.value });
                        }}
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Email</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="johndoe1@email.com"
                        value={this.state.user_email}
                        onChange={(e) => {
                          this.setState({ user_email: e.target.value });
                        }}
                      ></CInput>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Role</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="role"
                        value={this.state.nama_role}
                        disabled
                      ></CInput>
                    </CInputGroup>
                    <CRow className="text-center">
                      <CCol>
                        <CButton color="primary" className="px-4" type="submit">
                          Update
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

export default EditUser;

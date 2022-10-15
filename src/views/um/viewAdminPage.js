import React, { Component } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CInput,
  CDataTable,
  CBadge,
  CButton,
  CLink,
  CCollapse,
  CTooltip,
  CInputGroup,
  CInputGroupAppend
} from "@coreui/react";
import { api, authToken } from "../plugins/api";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";

const fields = [
  { key: "No" },
  { key: "name" },
  { key: "user_email" },
  { key: "nama_role" },
  { key: "action" },
];

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

class ViewAdminPage extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      details: [],
      cekToken: window.sessionStorage.getItem("token")
    };
  }

  getData = async function () {
    const cekToken = window.sessionStorage.getItem("token");
    if (cekToken) {
      if (authToken().rid === 0) {
        api
          .post("/get", { token: cekToken })
          .then((res) => {
            this.setState({
              userdata: res.data,
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
  };

  generateString = function (length) {
    let result = "";
    const characterslength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterslength));
    }
    return result;
  };

  sendMail = function (id, randomChar) {
    swal({
      title: "Warning",
      text: "Do you want to reset this user's password?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willSend) => {
      if (willSend) {
        api
          .post("/send", {
            id: id,
            is_locked: true,
            verif_code: randomChar,
          })
          .then(async (res) => {
            await swal({ icon: "success", text: "Email sent!" });
          });
      } else {
        await swal("Password reset cancelled!");
        window.location.reload();
      }
    });
  };

  deletedData = function (id) {
    swal({
      title: "Warning",
      text: "Deleted users cannot be restored!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        const cekToken = window.sessionStorage.getItem("token");
        if (willDelete) {
          api
            .delete("/delete", {
              data: { id: id },
              token: cekToken,
            })
            .then(async (res) => {
              await swal({ icon: "success", text: res.data.message });
              window.location.reload();
            });
        } else {
          await swal("Delete user cancelled!");
          window.location.reload();
        }
      })
      .catch((err) => {
        window.location.href = "http://localhost:3001/#/login";
        swal({ icon: "warning", text: err.response.statusText });
      });
  };

  searchUser(e) {
    api.post('/searchUsers', {
      first_name: e.target.value,
      last_name: e.target.value,
      token: this.state.cekToken
    })
      .then(res => {
        this.setState({
          userdata: res.data.search_results
        })
      })
  }

  componentDidMount = function () {
    this.getData();
  };

  render() {
    return (
      <div>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol md="6">
                <h2>Archive Users</h2>
              </CCol>
              <CCol md="4">
                <CInputGroup>
                  <CInput type="text" id="search" name="search" placeholder="Type to search by name ..." onChange={(e) => this.searchUser(e)} />
                  <CInputGroupAppend>
                    <CTooltip content={`Search`} placement={`top`}>
                      <CButton className="btn-sm" type="submit" style={{ backgroundColor: "blue" }}><CIcon name="cil-magnifying-glass"
                        style={{ color: "white" }}></CIcon></CButton>
                    </CTooltip>
                  </CInputGroupAppend>
                </CInputGroup>
              </CCol>
              <CCol md="2" className="text-right">
                <CLink to={{ pathname: "/addUser" }}>
                  <CButton color="primary">Add User</CButton>
                </CLink>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              items={this.state.userdata}
              fields={fields}
              itemsPerPage={5}
              hover
              pagination
              scopedSlots={{
                No: (item, i) => <td>{i + 1}</td>,
                name: (item) => (
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                ),
                action: (item) => {
                  return (
                    <td>
                      {item.id_role ? (
                        <div className="d-flex">
                          <div>
                            <CTooltip content="View">
                              <CLink
                                to={{ pathname: `/viewUser/${item.id_user}` }}
                              >
                                <CIcon
                                  name="cil-user"
                                  style={{ color: "blue" }}
                                ></CIcon>
                              </CLink>
                            </CTooltip>
                          </div>
                          <div
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          >
                            <CTooltip content="Edit">
                              <CLink
                                to={{ pathname: `/editUser/${item.id_user}` }}
                              >
                                <CIcon
                                  name="cil-pencil"
                                  style={{ color: "green" }}
                                ></CIcon>
                              </CLink>
                            </CTooltip>
                          </div>
                          <div>
                            <CTooltip content="Delete">
                              <CLink>
                                <CIcon
                                  name="cil-trash"
                                  style={{ color: "red" }}
                                  onClick={(e) =>
                                    this.deletedData(item.id_user)
                                  }
                                ></CIcon>
                              </CLink>
                            </CTooltip>
                          </div>
                          <div
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          >
                            <CTooltip content="Reset Password">
                              <CLink to={{}}>
                                <CIcon
                                  name="cil-lock-locked"
                                  style={{ color: "orange" }}
                                  onClick={(e) =>
                                    this.sendMail(
                                      item.id_user,
                                      this.generateString(5)
                                    )
                                  }
                                ></CIcon>
                              </CLink>
                            </CTooltip>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default ViewAdminPage;

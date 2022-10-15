import React, { Component } from "react";
//sweetalert
import swal from "sweetalert";
//api
import { api, authToken } from "../plugins/api";
//moment
import moment from "moment";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CForm,
  CInput,
  CInputGroupAppend,
  CInputGroup,
  CLink,
  CTooltip,
} from "@coreui/react";

import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import TicketInsert from "./ticket.insert";

const getBadge = (status) => {
  switch (status) {
    case "Belum Mulai":
      return "warning";
    case "Sedang Dikerjakan":
      return "danger";
    case "Selesai":
      return "success";
    case "Tertunda":
      return "warning";
    case "Batal":
      return "danger";
    default:
      return "primary";
  }
};

const fields = ["name", "status", "created_at", "updated_at", "action"];

class Ticket extends Component {
  constructor() {
    super();
    this.state = {
      ticket: [],
      module: [{ formData: "" }],
      ticket_id: null,
      ticket_title: null,
      cekToken: window.sessionStorage.getItem("token")
    };
  }

  componentDidMount() {
    const url = "http://localhost:8082/get-ticket";
    api.post(url, { token: this.state.cekToken }).then((res) => {
      this.setState({
        ticket: res.data.result,
      });
    });
  }

  deleteDataToAPI = (ticket_id, e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:8082/delete-ticket";
    api.delete(apiUrl, {
      data: {
        ticket_id: ticket_id,
        token: this.state.cekToken
      },
    });
  };

  findOneDataFromApiByTitle(e) {
    // Search by title using Backend
    const apiUrl = `http://localhost:8082/searchTitle-ticket?ticket_title=${e.target.value}`;

    //get -> post
    api.post(apiUrl, { token: this.state.cekToken }).then((res) => {
      this.setState({
        ticket: res.data.result,
      });
    });
  }

  render() {
    return (
      <>
        <>
          <div>
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol md="3">
                        <h5 style={{ marginTop: "2%" }}>
                          Ticket Management Services
                        </h5>
                      </CCol>
                      <CCol md="7">
                        <CInputGroup>
                          <CInput
                            type="text"
                            id="input2-group2"
                            name="input2-group2"
                            placeholder="Search by Name....."
                            onChange={(e) => {
                              this.findOneDataFromApiByTitle(e)
                            }}
                          />
                          <CInputGroupAppend>
                            <CButton type="submit" color="primary">
                              <CIcon name="cil-magnifying-glass" /> Search
                            </CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </CCol>
                      <CCol md="2">
                        {authToken().rid === 0 ? <TicketInsert /> : <div></div>}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.ticket}
                      fields={fields}
                      hover
                      striped
                      bordered
                      itemsPerPage={10}
                      pagination
                      scopedSlots={{
                        name: (item) => <td>{item.ticket_title}</td>,
                        status: (item) => (
                          <td>
                            <CBadge color={getBadge(item.status_title)}>
                              {item.status_title}
                            </CBadge>
                          </td>
                        ),
                        created_at: (item) => {
                          return (
                            <td>
                              {moment(item.created_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </td>
                          );
                        },
                        updated_at: (item) => {
                          return (
                            <td>
                              {moment(item.updated_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </td>
                          );
                        },
                        action: (item) => (
                          <td>
                            {/* auth fungsi admin or user rid = 0 as admin | rid = 1 as user */}
                            {authToken().rid === 0 ? (
                              <CRow>
                                <CCol md="4">
                                  <Link to={`/tview/${item.ticket_id}`}>
                                    <CTooltip content="View & Update">
                                      <CIcon
                                        name="cil-file"
                                        style={{
                                          color: "green",
                                          marginRight: "10%",
                                        }}
                                      ></CIcon>
                                    </CTooltip>
                                  </Link>
                                </CCol>
                                <CCol md="4">
                                  <CLink>
                                    <CTooltip content="Delete">
                                      <CIcon
                                        name="cil-trash"
                                        style={{
                                          color: "red",
                                          marginLeft: "-120%",
                                        }}
                                        onClick={(e) =>
                                          swal(
                                            "Apakah Anda yakin ingin menghapus data ini?",
                                            {
                                              buttons: {
                                                cancel: "Tidak!",
                                                catch: {
                                                  text: "Ya",
                                                  value: "catch",
                                                },
                                              },
                                            }
                                          ).then((value) => {
                                            switch (value) {
                                              case "catch":
                                                this.deleteDataToAPI(
                                                  item.ticket_id,
                                                  e
                                                );
                                                swal(
                                                  "Selamat!",
                                                  "Data Ticket Berhasil Dihapus!",
                                                  "success"
                                                );
                                                window.location.reload();
                                                break;
                                              default:
                                                swal(
                                                  "Warning", "Data Ticket Tidak Dihapus!", "info"
                                                );
                                            }
                                          })
                                        }
                                      ></CIcon>
                                    </CTooltip>
                                  </CLink>
                                </CCol>
                              </CRow>) : <div></div>
                            }
                          </td>
                        ),
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </>
      </>
    );
  }
}

export default Ticket;

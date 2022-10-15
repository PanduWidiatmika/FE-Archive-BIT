import React, { Component, lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CWidgetDropdown,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import TodayNotification from '../calendar/TodayNotification.js'
import MainChartExample from '../charts/MainChartExample.js'
import { api, authToken } from '../plugins/api/index.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      users_count: "",
      total_ticket: "",
      count_archives: "",
      success: true,
      cekToken: window.sessionStorage.getItem("token")
    };
    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  getRegisteredUser = function () {
    if (this.state.cekToken) {
      api
        .post("/countUser", { token: this.state.cekToken })
        .then((res) => {
          this.setState({
            users_count: res.data[0].users_count
          })
        });
    }
  }

  getTotalTicket = () => {
    if (this.state.cekToken) {
      api
        .post('/total-ticket', { token: this.state.cekToken })
        .then((res) => {
          this.setState({
            total_ticket: res.data.result[0].total_ticket
          })
        })
    }
  }

  getEvent = () => {
    if (this.state.cekToken) {
      api
        .post('/getEvent', { token: this.state.cekToken })
        .then((res) => {
          this.setState({
            total_event: res.data.length
          })
        })
    }
  }

  getCountArchives() {
    api
      .post('/count-files', { token: this.state.cekToken })
      .then((res) => {
        this.setState({
          count_archives: res.data.count_files[0].count_files
        })
      })
  }

  componentDidMount = function () {
    this.getRegisteredUser();
    this.getTotalTicket();
    this.getEvent();
    this.getCountArchives();
  }

  render() {
    return (
      <div>
        <CRow>
          {
            authToken().rid === 0 ? <> <CCol>
              <CLink to={{ pathname: '/viewAdminPage' }} style={{ textDecoration: "none" }}>
                <CWidgetDropdown
                  header={this.state.users_count.toString()}
                  text="User Registered"
                  style={{ height: '200px', backgroundColor: "#04c0f0" }}
                ><CIcon content={freeSet.cilUser} /></CWidgetDropdown>
              </CLink>
              {/* <p>{this.state.users_count}</p> */}
            </CCol>
            </> : <></>
          }
          <CCol>
            <CLink to={{ pathname: '/fm' }} style={{ textDecoration: "none" }}>
              <CWidgetDropdown
                header={this.state.count_archives.toString()}
                text="Archive Added"
                style={{ height: '200px', backgroundColor: "#dd4c39" }}
              ><CIcon content={freeSet.cilFolderOpen} /></CWidgetDropdown>
            </CLink>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CLink to={{ pathname: `/calendar` }} style={{ textDecoration: "none" }}>
              <CWidgetDropdown
                header={`${this.state.total_event}`}
                text="Event Added"
                style={{ height: '200px', backgroundColor: "#00a95b" }}
              ><CIcon content={freeSet.cilCalendar} /></CWidgetDropdown>
            </CLink>
          </CCol>
          <CCol>
            <CLink to={{ pathname: `/ticket` }} style={{ textDecoration: "none" }}>
              <CWidgetDropdown
                header={this.state.total_ticket.toString()}
                text="Total Ticket"
                style={{ height: '200px', backgroundColor: "#f39c11" }}
              ><CIcon content={freeSet.cilEnvelopeLetter} /></CWidgetDropdown>
            </CLink>
          </CCol>
        </CRow>

        <TodayNotification toggleSuccess={this.toggleSuccess} success={this.state.success} />
      </div>
    )
  }
}

export default Dashboard

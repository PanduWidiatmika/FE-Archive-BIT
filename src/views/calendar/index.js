import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React, { Component } from 'react';
import Calendars from './Calendar';
// import Form from './Form';
// import TodayNotification from './TodayNotification';

class Index extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     success: true,
  //   };
  //   this.toggleSuccess = this.toggleSuccess.bind(this);
  // }

  //toggle untuk modals
  // toggleSuccess() {
  //   this.setState({
  //     success: !this.state.success,
  //   });
  // }

  render() {
    return (
      <div className="animated fadeIn">
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                <h3>Calendar</h3>
              </CCardHeader>

              <CCardBody>
                <div className="text-center">
                  <h4>Let's Note Your Work!</h4>
                </div>
                <br />
                <br />
                <br />
                {/* <Form /> */}
                <Calendars />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* <TodayNotification toggleSuccess={this.toggleSuccess} success={this.state.success} /> */}
      </div>
    )
  }
}

export default Index;
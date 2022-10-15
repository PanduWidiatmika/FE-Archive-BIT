import { CBadge, CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import parse from 'html-react-parser';
import moment from 'moment';
import React, { Component } from "react";
import { api } from '../plugins/api';

class TodayNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            show: true,
            success: true,

            cekToken: window.sessionStorage.getItem("token"),
        };
        this.toggleSuccess = this.toggleSuccess.bind(this);
    }

    //toggle untuk modals
    toggleSuccess() {
        this.setState({
            success: !this.state.success,
        });
    }

    componentDidMount() {
        api.post(`/todayEventData`, { token: this.state.cekToken }).then(events => {
            this.setState({
                events: events.data,
            })
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.events.length > 0 ?
                        <CModal
                            show={this.props.success}
                            onClose={this.props.toggleSuccess}
                            className="modal-warning"
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>Today's Event</CModalTitle>
                            </CModalHeader>
                            {
                                this.state.events.map((d, i) => {
                                    return (
                                        <div key={i}>
                                            <CModalBody>
                                                <CModalTitle style={{ fontSize: "24px" }}>
                                                    {d.title} <CBadge color="danger" shape="pill" style={{ marginLeft: "5px", fontSize: "12px" }}>{d.deadline > 0 ? `${d.deadline} days` : "less than 24 hours"}</CBadge>
                                                </CModalTitle>

                                                <CModalBody style={{ fontSize: "16px", textAlign: "justify" }}>
                                                    {d.description ? parse(d.description) : "-"}

                                                    <CRow>
                                                        <CCol>
                                                            Location: {d.location ? d.location : "-"}
                                                        </CCol>
                                                        <CCol style={{ textAlign: "end" }}>
                                                            End: {moment(d.end).format('DD MMM, HH:mm a')}
                                                        </CCol>
                                                    </CRow>
                                                </CModalBody>
                                            </CModalBody>
                                        </div>
                                    )
                                })
                            }
                            <CModalFooter>
                                <CButton
                                    color="secondary"
                                    onClick={this.props.toggleSuccess}
                                >Close</CButton>
                            </CModalFooter>
                        </CModal>
                        :
                        <div></div>
                }
            </div>
        )
    }
}

export default TodayNotification;
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CButton, CCol, CForm, CFormGroup, CInput, CInputRadio, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CSelect } from '@coreui/react';
import React, { Component } from "react";
import { api, authToken } from "src/views/plugins/api";
import swal from "sweetalert";

class FormUpdateDelete extends Component {

    async APIUpdate(id, completed, e) {
        e.preventDefault();
        if (completed === 1) {
            swal("Sorry", "This status has Completed", "error")
        } else if (completed === 0) {
            api.put("/updateEvent", {
                title: this.props.data.title,
                description: this.props.data.description,
                category: this.props.data.category,
                location: this.props.data.location,
                start: this.props.data.start,
                end: this.props.data.end,
                status: this.props.data.status,
                id: id,
                token: this.props.data.cekToken
            }).then(async (resp) => { await swal("Success!", resp.data.message, "success"); window.location.reload(); })
        } else {
            await swal("Warning", "Data Failed to Update", "error");
            window.location.reload();
        }
    }

    APIDelete(id, completed, e) {
        e.preventDefault();
        if (completed === 1) {
            api.delete(`/deleteEvent`, {
                data: {
                    id: id,
                    token: this.props.data.cekToken
                },
            }).then(async (resp) => { await swal("Success!", resp.data.message, "success"); window.location.reload(); });
        } else if (completed === 0) {
            swal("Sorry", "This status Not Completed Yet", "error")
        }
        else {
            swal("Warning", "Data Failed to Delete", "error");
        }
    }

    render() {
        return (
            <div>
                <CModal show={this.props.data.more} onClose={this.props.toggleMore}
                    className={this.props.data.temp ? 'modal-warning' : 'modal-primary'} >
                    <CModalHeader onClose={this.props.toggleMore} closeButton>
                        {
                            this.props.data.temp ?
                                "Detail Event"
                                :
                                "Update Event"
                        }
                    </CModalHeader>

                    <CForm action="" method="post" onSubmit={(e) => this.props.data.temp ?
                        this.APIDelete(this.props.data.id, this.props.data.temp, e)
                        :
                        this.APIUpdate(this.props.data.id, this.props.data.temp, e)}>
                        <CModalBody>
                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Event Title</CLabel>
                                        <CInput pattern='[a-zA-Z_]+' minLength="4" name="title" maxLength="25" disabled={this.props.data.temp ? true : false} type="text" id="name" value={this.props.data.title} placeholder="Enter Event Title" onChange={(e) => { this.props.handleChange(e) }} required />
                                        {this.props.data.temp ? <div></div> : <small style={{ color: "red" }}>(min 4 characters without number or any special character(except '_')*)</small>}
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="description">Event Description</CLabel>
                                        <CKEditor name="description" disabled={this.props.data.temp} id="description" editor={ClassicEditor} data={this.props.data.description} onChange={(event, editor) => { this.props.handleChangeEditor(editor); }} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="category">Event Category</CLabel>
                                        <CSelect name="category" disabled={this.props.data.temp} required type="select" autoComplete="category" onChange={(e) => { this.props.handleChange(e) }}>
                                            <option value="" hidden>Select Category</option>
                                            {
                                                this.props.data.categories.map((d, i) => {
                                                    return (
                                                        d.id_category === this.props.data.category ?
                                                            <option key={i} selected hidden={!d.category_status} value={d.id_category}>{d.category_name}</option>
                                                            :
                                                            <option key={i} value={d.id_category} hidden={!d.category_status}>{d.category_name}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                        {/* <CInput disabled type="text" id="category" value={this.state.category} onChange={ (e) => {this.setState({category: e.target.value})}} required /> */}
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="location">Event Location</CLabel>
                                        <CInput pattern='[a-zA-Z_]+' minLength="4" maxLength="25" name="location" disabled={this.props.data.temp ? true : false} type="text" id="location" value={this.props.data.location} placeholder="Enter Event Location" onChange={(e) => { this.props.handleChange(e) }} />
                                        {this.props.data.temp ? <div></div> : <small style={{ color: "red" }}>(min 4 characters without number or any special character(except '_')*)</small>}
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="date">Event Start Date</CLabel>
                                        <CInput name="start" disabled={this.props.data.temp} type="datetime-local" id="date" value={this.props.data.start} onChange={(e) => { this.props.handleChange(e) }} required />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="date">Event End Date</CLabel>
                                        <CInput name="end" disabled={this.props.data.temp} type="datetime-local" id="date" value={this.props.data.end} min={this.props.data.start} onChange={(e) => { this.props.handleChange(e) }} required />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            {
                                this.props.data.temp ?
                                    <CRow>
                                        {!this.props.data.status ?
                                            <></>
                                            :
                                            <CCol xs="12">
                                                <CFormGroup>
                                                    <CLabel htmlFor="date">Event Completed At</CLabel>
                                                    <CInput disabled type="datetime-local" id="date" value={this.props.data.completed_at} min={this.props.data.start} required />
                                                </CFormGroup>
                                            </CCol>
                                        }
                                    </CRow>
                                    :
                                    <div></div>
                            }

                            <CRow>
                                <CCol xs="12">
                                    <CLabel>Event Status</CLabel><br />
                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio disabled={this.props.data.temp} checked={+this.props.data.status ? true : false} custom id={`inline-radio${this.props.id ? 3 : 5}`} name="status" value="1" onChange={(e) => { this.props.handleChange(e); }} />
                                        <CLabel check="true" variant="custom-checkbox" htmlFor={`inline-radio${this.props.id ? 3 : 5}`}>Completed</CLabel>
                                    </CFormGroup>

                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio disabled={this.props.data.temp} checked={+this.props.data.status ? false : true} custom id={`inline-radio${this.props.id ? 4 : 6}`} name="status" value="0" onChange={(e) => { this.props.handleChange(e) }} />
                                        <CLabel check="true" variant="custom-checkbox" htmlFor={`inline-radio${this.props.id ? 4 : 6}`}>On Progress</CLabel>
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                        </CModalBody>

                        <CModalFooter style={{ padding: "8px" }}>
                        </CModalFooter>
                        <CModalFooter>
                            {authToken().rid === 0 ? <><CButton type="submit" color={this.props.data.temp ? "danger" : "success"}>{this.props.data.temp ? "Delete Event" : "Update Event"}</CButton>{' '}</> : <></>}

                            <CButton color="secondary" onClick={this.props.toggleMore}>Cancel</CButton>
                        </CModalFooter>
                    </CForm>
                </CModal>
            </div>
        )
    }
}

export default FormUpdateDelete;
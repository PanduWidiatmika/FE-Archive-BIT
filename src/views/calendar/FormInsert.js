import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CButton, CCol, CForm, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CSelect } from '@coreui/react';
import React, { Component } from "react";
import swal from 'sweetalert';
import { api } from '../plugins/api';

class FormInsert extends Component {

    //insert data event dari API
    saveDataToAPI(e) {
        e.preventDefault();
        api.post("/insertEvent", {
            title: this.props.data.title,
            description: this.props.data.description,
            category: this.props.data.category,
            location: this.props.data.location,
            start: this.props.data.start,
            end: this.props.data.end,
            token: this.props.data.cekToken
        }).then(async () => { await swal("Success!", "Event Success Added", "success"); window.location.reload(); })
    }

    render() {
        return (
            <div>
                <CModal show={this.props.data.success} onClose={this.props.toggleSuccess}
                    className='modal-success' >
                    <CModalHeader onClose={this.props.toggleSuccess} closeButton>New Events</CModalHeader>

                    <CForm action="" method="post" onSubmit={(e) => this.saveDataToAPI(e)}>
                        <CModalBody>
                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Event Title</CLabel>
                                        <CInput pattern='[a-zA-Z_]+' minLength="4" name="title" maxLength="25" type="text" id="name" placeholder="Enter Event Title" onChange={(e) => { this.props.handleChange(e) }} required />
                                        <small style={{ color: "red" }}>((min 4 characters without number or any special character(except '_')*))</small>
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="description">Event Description</CLabel>
                                        <CKEditor name="description" id="description" editor={ClassicEditor} data={this.props.description} onChange={(event, editor) => { this.props.handleChangeEditor(editor) }} />

                                        {/* <CTextarea maxLength="255" type="textarea" id="description" placeholder="Event Description" onChange={ (e) => {this.setprops({description: e.target.value})}}/> */}
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="category">Event Category</CLabel>
                                        <CSelect name="category" required type="select" autoComplete="category" onChange={(e) => { this.props.handleChange(e) }}>
                                            <option value="" hidden>Select Category</option>
                                            {
                                                this.props.data.categories.filter((d, i) => d.category_status).map((d, i) => {
                                                    return (
                                                        <option key={i} value={d.id_category}>{d.category_name}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>

                                        {/* <CInput type="text" id="category" onChange={ (e) => {this.setprops({category: e.target.value})}} required /> */}
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="location">Event Location</CLabel>
                                        <CInput pattern='[a-zA-Z_]+' minLength="4" name="location" maxLength="25" type="text" id="location" placeholder="Enter Event Location" onChange={(e) => { this.props.handleChange(e) }} />
                                        <small style={{ color: "red" }}>((min 4 characters without number or any special character(except '_')*))</small>
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="date">Event Start Date</CLabel>
                                        <CInput name="start" type="datetime-local" id="date" value={this.props.data.start} onChange={(e) => { this.props.handleChange(e) }} required />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="date">Event End Date</CLabel>
                                        <CInput name="end" type="datetime-local" id="date" value={this.props.data.end} min={this.props.data.start} onChange={(e) => { this.props.handleChange(e) }} required />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CModalBody>

                        <CModalFooter style={{ padding: "8px" }}>
                        </CModalFooter>
                        <CModalFooter>
                            <CButton type="submit" color="success">Create Event</CButton>{' '}
                            <CButton color="secondary" onClick={this.props.toggleSuccess}>Cancel</CButton>
                        </CModalFooter>
                    </CForm>
                </CModal>
            </div>
        )
    }
}

export default FormInsert
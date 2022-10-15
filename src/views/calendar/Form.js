import { CButton, CCol, CForm, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react';
import format from 'date-fns/format';
import React, { Component } from "react";
import swal from 'sweetalert';
import { api } from '../../plugins/api';
import FormInsert from "./FormInsert";

//tampilin tombol button add event dan category(tidak dipakai : lewat tekan kalender aja) untuk pemanggilan component terdapat di index.js
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            title: "",
            description: "",
            category: "",
            location: "",
            status: "",
            temp: "",
            id: 0,
            start: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss`),
            end: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss`),

            success: false,
            categoryAdd: false,
            category_name: "",
        };
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.toggleCategoryAdd = this.toggleCategoryAdd.bind(this);
    }

    //toggle untuk modals
    toggleSuccess() {
        this.setState({
            success: !this.state.success,
            start: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss`),
            end: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss`)
        });
    }

    toggleCategoryAdd() {
        this.setState({
            categoryAdd: !this.state.categoryAdd,
        });
    }

    //inisialisasi pada saat awal mengload page
    componentDidMount() {
        api.get(`/getCategories`).then(categories => {
            this.setState({
                categories: categories.data,
            })
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeEditor = (editor) => {
        this.setState({
            description: editor.getData()
        })
    }

    //insert data category dari API
    saveCategoryToAPI(e) {
        e.preventDefault();
        api.post("/insertCategory", {
            category_name: this.state.category_name,
        }).then(async (resp) => {
            if (resp.data.message === "Insert Category Success!") {
                await swal("Success!", resp.data.message, "success");
                window.location.reload()
            } else {
                await swal("Error!", resp.data.message, "error")
            }
        });
    }

    render() {
        return (
            <>
                <CRow>
                    <CCol md="3" className="text-left">
                        <CButton color="info" onClick={this.toggleCategoryAdd}>Add Category</CButton>
                    </CCol>

                    <CCol md="6"></CCol>

                    <CCol md="3" className="text-right">
                        <CButton color="success" onClick={this.toggleSuccess}>Create Events</CButton>
                    </CCol>
                </CRow>

                <br />
                <FormInsert toggleSuccess={this.toggleSuccess} data={this.state} handleChange={this.handleChange} handleChangeEditor={this.handleChangeEditor} />

                <CModal show={this.state.categoryAdd} onClose={this.toggleCategoryAdd}
                    className='modal-success' >
                    <CModalHeader onClose={this.toggleCategoryAdd}>New Category</CModalHeader>

                    <CForm action="" method="post" onSubmit={(e) => this.saveCategoryToAPI(e)}>
                        <CModalBody>
                            <CRow>
                                <CCol xs="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="category">Category Name</CLabel>
                                        <CInput minLength="4" maxLength="25" type="text" id="category" placeholder="Enter Category Name" onChange={(e) => { this.setState({ category_name: e.target.value }) }} required />
                                        <small style={{ color: "red" }}>(minimal 4 huruf tanpa angka maupun spesial karakter dan unik*)</small>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CModalBody>

                        <CModalFooter style={{ padding: "8px" }}>
                        </CModalFooter>

                        <CModalFooter>
                            <CButton type="submit" color="success">Add Category</CButton>{' '}
                            <CButton color="secondary" onClick={this.toggleCategoryAdd}>Cancel</CButton>
                        </CModalFooter>
                    </CForm>
                </CModal>
            </>
        )
    }
}

export default Form;
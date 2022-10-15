import React, { Component } from "react";
import { CCard, CInputRadio, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CForm, CFormGroup, CInput, CLabel, CModal, CTooltip, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import { api } from "src/views/plugins/api";
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],

            categoryAdd: false,
            categoryUpdate: false,
            id: 0,
            category_name: "",
            category_status: "",

            cekToken: window.sessionStorage.getItem("token"),
        };
        this.toggleCategoryAdd = this.toggleCategoryAdd.bind(this);
        this.toggleCategoryUpdate = this.toggleCategoryUpdate.bind(this);
    }

    toggleCategoryAdd() {
        this.setState({
            categoryAdd: !this.state.categoryAdd,
        });
    }

    toggleCategoryUpdate() {
        this.setState({
            categoryUpdate: !this.state.categoryUpdate,
        });
    }

    //inisialisasi pada saat awal mengload page
    componentDidMount() {
        api.post(`/getCategories`, { token: this.state.cekToken }).then(categories => {
            this.setState({
                categories: categories.data,
            })
        });
    }

    saveCategoryToAPI(e) {
        e.preventDefault();
        api.post("/insertCategory", {
            category_name: this.state.category_name,
            token: this.state.cekToken,
        }).then(async (resp) => {
            if (resp.data.message === "Insert Category Success!") {
                await swal("Success!", resp.data.message, "success");
                window.location.reload()
            } else {
                await swal("Error!", resp.data.message, "error")
            }
        });
    }

    APIDelete(e, id, nama, status) {
        e.preventDefault()
        swal("Warning!", `Are You Sure want to ${status === 0 ? `Delete` : "Change Status"} Category "${nama}" ?`, "warning", {
            buttons: {
                catch: {
                    text: "Delete",
                    value: "delete",

                },
                cancel: true,
            },
        }).then((value) => {
            switch (value) {

                case "delete":
                    api.delete(`/deleteCategory`, {
                        data: {
                            id: id,
                            status: status,
                            token: this.state.cekToken
                        },
                    }).then(async (resp) => {
                        resp.data.error ?
                            await swal("Failed!", resp.data.error, "error")
                            :
                            await swal("Success!", resp.data.message, "success");
                        window.location.reload();
                    });
                    break;

                default:
                    swal("Delete Canceled");
            }
        })
    }

    APIUpdate(e) {
        e.preventDefault();
        api.put("/updateCategory", {
            category_name: this.state.category_name,
            status: this.state.category_status,
            id: this.state.id,
            token: this.state.cekToken
        }).then(async (resp) => { await swal("Success!", resp.data.message, "success"); window.location.reload(); })
    }

    APISearch(id) {
        api.post(`/findCategory?id=${id}`, { token: this.state.cekToken }).then(category => {
            this.setState({
                id: id,
                category_name: category.data[0].category_name,
                category_status: category.data[0].category_status,
            })
        });

        this.toggleCategoryUpdate();
    }

    render() {
        return (
            <div>
                <CRow>
                    <CCol xs="12">
                        <CCard>
                            <CCardHeader>
                                <h3>Category Table</h3>
                            </CCardHeader>

                            <CCardBody>
                                <CRow>
                                    <CCol md="3" className="text-left"></CCol>

                                    <CCol md="6"></CCol>

                                    <CCol md="3" className="text-right">
                                        <CButton color="info" onClick={this.toggleCategoryAdd}>Add Category</CButton>
                                    </CCol>
                                </CRow>

                                <CModal show={this.state.categoryAdd} onClose={this.toggleCategoryAdd}
                                    className='modal-success' >
                                    <CModalHeader onClose={this.toggleCategoryAdd} closeButton>New Category</CModalHeader>

                                    <CForm action="" method="post" onSubmit={(e) => this.saveCategoryToAPI(e)}>
                                        <CModalBody>
                                            <CRow>
                                                <CCol xs="12">
                                                    <CFormGroup>
                                                        <CLabel htmlFor="category">Category Name</CLabel>
                                                        <CInput pattern='[a-zA-Z_]+' minLength="4" maxLength="25" type="text" id="category" placeholder="Enter Category Name" onChange={(e) => { this.setState({ category_name: e.target.value }) }} required />
                                                        <small style={{ color: "red" }}>(min 4 characters without number or any special character(except '_') and unique*)</small>
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


                                <CModal show={this.state.categoryUpdate} onClose={this.toggleCategoryUpdate}
                                    className='modal-primary' >
                                    <CModalHeader onClose={this.toggleCategoryUpdate} closeButton>Update Category</CModalHeader>

                                    <CForm action="" method="post" onSubmit={(e) => this.APIUpdate(e)}>
                                        <CModalBody>
                                            <CRow>
                                                <CCol xs="12">
                                                    <CFormGroup>
                                                        <CLabel htmlFor="category">Category Name</CLabel>
                                                        <CInput minLength="4" maxLength="25" type="text" id="category" placeholder="Enter Category Name" value={this.state.category_name} onChange={(e) => { this.setState({ category_name: e.target.value }) }} required />
                                                        <small style={{ color: "red" }}>(min 4 characters without number or any special character(except '_') and unique*)</small>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow>
                                                <CCol xs="12">
                                                    <CLabel>Category Status</CLabel><br />
                                                    <CFormGroup variant="custom-radio" inline>
                                                        <CInputRadio checked={+this.state.category_status ? true : false} custom id="inline-radio1" name="status" value="1" onChange={(e) => { this.setState({ category_status: e.target.value }) }} />
                                                        <CLabel check="true" variant="custom-checkbox" htmlFor="inline-radio1">Aktif</CLabel>
                                                    </CFormGroup>

                                                    <CFormGroup variant="custom-radio" inline>
                                                        <CInputRadio checked={+this.state.category_status ? false : true} custom id="inline-radio2" name="status" value="0" onChange={(e) => { this.setState({ category_status: e.target.value }) }} />
                                                        <CLabel check="true" variant="custom-checkbox" htmlFor="inline-radio2">Tidak Aktif</CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </CModalBody>

                                        <CModalFooter style={{ padding: "8px" }}>
                                        </CModalFooter>

                                        <CModalFooter>
                                            <CButton type="submit" color="success">Update Category</CButton>{' '}
                                            <CButton color="secondary" onClick={this.toggleCategoryUpdate}>Cancel</CButton>
                                        </CModalFooter>
                                    </CForm>
                                </CModal>

                                <CDataTable
                                    items={this.state.categories}
                                    fields={
                                        [
                                            { key: 'No' },
                                            { key: 'Category Name', _style: { width: '20%' } },
                                            { key: 'Category Status', _style: { width: '20%', textAlign: 'center' } },
                                            { key: 'Category Used', _style: { width: '20%', textAlign: 'center' } },
                                            { key: 'Action', _style: { textAlign: 'center', width: '30%' } },
                                        ]
                                    }
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    pagination
                                    scopedSlots={{
                                        'No':
                                            (item, i) => (
                                                <td>
                                                    {i + 1}
                                                </td>
                                            ),

                                        'Category Name':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {item.category_name}
                                                    </td>
                                                )
                                            },

                                        'Category Status':
                                            (item) => {
                                                return (
                                                    <td className="text-center">
                                                        {item.category_status ? "Aktif" : "Tidak Aktif"}
                                                    </td>
                                                )
                                            },

                                        'Category Used':
                                            (item) => {
                                                return (
                                                    <td className="text-center">
                                                        {item.jumlah_event} times
                                                    </td>
                                                )
                                            },

                                        'Action':
                                            (item) => {
                                                return (
                                                    <td className="text-center">
                                                        <CTooltip content={`Edit`} placement={`top`}>
                                                            <Link to="#">
                                                                <FontAwesomeIcon onClick={(e) => this.APISearch(item.id_category)} style={{ color: "green" }} icon={faEdit} />
                                                            </Link>
                                                        </CTooltip>

                                                        <span style={{ marginRight: "15px" }}></span>
                                                        <CTooltip content={`Delete`} placement={`top`}>
                                                            <Link to="#">
                                                                <FontAwesomeIcon onClick={(e) => this.APIDelete(e, item.id_category, item.category_name, item.category_status)} style={{ color: "red" }} icon={faTrash} />
                                                            </Link>
                                                        </CTooltip>
                                                    </td>
                                                )
                                            },
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        )
    }
}

export default Category;
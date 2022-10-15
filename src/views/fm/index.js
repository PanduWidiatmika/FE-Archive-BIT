import React, { Component } from "react"
import { api, authToken } from '../plugins/api'
import moment from 'moment'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CCol,
    CLink,
    CTooltip,
    CButton,
    CDataTable,
    CBreadcrumb,
    CBreadcrumbItem
} from '@coreui/react'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faPlus, faHome, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

var fields = [
    { key: ' ' },
    { key: 'name' },
    { key: 'type' },
    { key: 'created' },
    { key: 'updated' }
]

class FM extends Component {

    constructor(props) {
        super(props)
        this.state = {
            archives: [],
            token: window.sessionStorage.getItem("token")
        }
    }

    postDelete = (archive_id) => {

        swal({
            title: "Are You Sure?",
            text: "You Want To Delete This Folder?",
            buttons: ["No", "Yes"],
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    api.post("/delete-archive-type", {
                        archive_id: archive_id,
                        token: this.state.token
                    })
                        .then(async res => {
                            if (res.data.error) {
                                swal("Attention!", res.data.error, "error")
                            } else {
                                await swal("Attention!", res.data.message, "success")
                                window.location.reload()
                            }
                        })
                }
            });
    }

    postUpdate = (archive_id) => {
        window.location.href = `http://localhost:3001/#/update-archive-type/${archive_id}`
    }

    setArchiveType(archive_type) {
        window.location.href = `http://localhost:3001/#/year/${archive_type}`
    }

    getData() {
        api.post(`/get-archives`, { token: this.state.token })
            .then(res => {
                this.setState({
                    archives: res.data.archives
                })
            })
    }

    componentDidMount() {
        this.getData()

        if (authToken().rid === 0) {
            fields = [
                { key: ' ' },
                { key: 'name' },
                { key: 'type' },
                { key: 'created' },
                { key: 'updated' },
                { key: '   Actions', _style: { textAlign: 'center' } },
            ]
        }
    }

    render() {
        return (
            <>
                <CCard>
                    <CCardHeader>
                        <br />
                        <CBreadcrumb>
                            <CBreadcrumbItem active>
                                <CLink style={{ color: "#3c4b64", pointerEvents: "none", opacity: "0.5" }}>
                                    <FontAwesomeIcon icon={faHome} /> Home
                                </CLink>
                            </CBreadcrumbItem>
                        </CBreadcrumb>
                        <CRow>
                            <CCol className="text-center">
                                <h1><strong>Archives Management</strong></h1>
                            </CCol>
                        </CRow>
                    </CCardHeader>

                    <CCardBody>
                        {
                            authToken().rid === 0 ?
                                <>
                                    <CRow>
                                        <CCol className="text-right">
                                            <CLink to={{ pathname: "/create-archive-type" }}>
                                                <CTooltip content={`Create Folder`} placement={`left`}>
                                                    <CButton style={{ backgroundColor: "#3c4b64", color: "white" }}><FontAwesomeIcon icon={faPlus} /></CButton>
                                                </CTooltip>
                                            </CLink>
                                        </CCol>
                                    </CRow>
                                </>
                                :
                                <></>
                        }
                        <br />
                        <CDataTable
                            items={this.state.archives}
                            fields={fields}
                            itemsPerPageSelect
                            striped
                            hover
                            onRowClick={(e) => this.setArchiveType(e.archive_type)}
                            itemsPerPage={5}
                            sorter
                            pagination
                            scopedSlots={{
                                ' ': () => {
                                    return (
                                        <td> </td>
                                    )
                                },
                                'name': (item) => {
                                    return (
                                        <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><FontAwesomeIcon icon={faFolder} />  {item.archive_type}</td>
                                    )
                                },
                                'type': () => {
                                    return (
                                        <td>File folder</td>
                                    )
                                },
                                'created': (item) => {
                                    return (
                                        <td>{moment(item.archive_created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    )
                                },
                                'updated': (item) => {
                                    return (
                                        <td>{item.archive_updated_at ? moment(item.archive_updated_at).format('MMMM Do YYYY, h:mm:ss a') : "-"}</td>
                                    )
                                },
                                '   Actions': (item) => {
                                    return (
                                        <td className="text-center">
                                            <CLink onMouseOver={() => this.postUpdate(item.archive_id)}>
                                                <CTooltip content={`Update`} placement={`top`}>
                                                    <FontAwesomeIcon style={{ color: "#0d6efd", marginRight: "15px" }} icon={faEdit} />
                                                </CTooltip>
                                            </CLink>

                                            <CLink onMouseOver={() => this.postDelete(item.archive_id)}>
                                                <CTooltip content={`Delete`} placement={`top`}>
                                                    <FontAwesomeIcon style={{ color: "#dc3545", marginLeft: "15px" }} icon={faTrash} />
                                                </CTooltip>
                                            </CLink>
                                        </td>
                                    )
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </>
        )
    }
}

export default FM;
import React, { Component } from "react";
import CIcon from "@coreui/icons-react";
import { api } from "../plugins/api";
import swal from "sweetalert";

const Alert = () => {
  swal("Selamat!", "Data Berhasil Ditambahkan!", "success");
};

import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
} from "@coreui/react";

class TicketInsert extends Component {
  constructor() {
    super();
    this.state = {
      ticket: [],
      module: [{ formData: "" }],
      ticket_title: null,
      ticket_name_client: null,
      ticket_description: null,
      ticket_status: null,
      module_name: null,
      modalCreate: false,
      cekToken: window.sessionStorage.getItem("token")
    };
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  toggleCreate() {
    this.setState({
      modalCreate: !this.state.modalCreate,
    });
  }

  componentDidMount() {
    const url = "http://localhost:8082/get-ticket";
    //get->post
    api.post(url, { token: this.state.cekToken }).then((res) => {
      this.setState({
        ticket: res.data.result,
      });
    });
  }

  handleChange(index, e) {
    const { module } = this.state;

    module[index][e.target.name] = e.target.value;

    this.setState({
      module: module,
    });
  }

  addForm() {
    if (this.state.module[this.state.module.length - 1].formData === "") {
      swal({
        title: "WARNING!",
        text: "Please insert the module name!",
        icon: "warning",
        button: "OK!",
      });
    } else {
      const { module } = this.state;
      this.setState({
        module: [...module, { formData: "" }],
      });
    }
  }

  onSubmit() {
    const { module } = this.state;
  }

  saveDataToAPI(e) {
    e.preventDefault();
    const apiUrl = "http://localhost:8082/insert-ticket";
    const dataTicket = {
      ticket_title: this.state.ticket_title,
      ticket_name_client: this.state.ticket_name_client,
      module_name: this.state.module,
      ticket_description: this.state.ticket_description,
      ticket_status: this.state.ticket_status,
      token: this.state.cekToken
    };

    api.post(apiUrl, dataTicket).then((resp) => {
      Alert();
      window.location.reload(false);
    });
  }

  render() {
    const { module } = this.state;

    return (
      <>
        <div>
          <CButton
            className="float-right"
            color="success"
            onClick={this.toggleCreate}
          >
            Create Ticket
          </CButton>
          <CModal
            show={this.state.modalCreate}
            onClose={this.toggleCreate}
            size="lg"
            color="success"
          >
            <CModalHeader closeButton>
              Create Ticket
            </CModalHeader>
            <CModalBody>
              <CForm
                method="post"
                className="form-horizontal"
                onSubmit={(e) => this.saveDataToAPI(e)}
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Title Apllication</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder=" Insert Title"
                      onChange={(e) => {
                        this.setState({ ticket_title: e.target.value });
                      }}
                      required
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Client Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="text-input"
                      name="text-input"
                      placeholder="Insert name client"
                      onChange={(e) => {
                        this.setState({ ticket_name_client: e.target.value });
                      }}
                      required
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Module</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    {module.map((d, i) => {
                      return (
                        <div key={i}>
                          <CInput
                            type="text"
                            placeholder="Enter module name"
                            name="formData"
                            autoComplete="off"
                            required
                            value={d.formData}
                            onChange={(e) => this.handleChange(i, e)}
                          />
                          <br />
                        </div>
                      );
                    })}

                    <div className="card-header-actions">
                      <CButton
                        color="secondary"
                        onClick={() => {
                          this.addForm();
                        }}
                      >
                        Add
                      </CButton>
                    </div>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Description Apllication</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="5"
                      placeholder=" Insert Content Desription...."
                      onChange={(e) => {
                        this.setState({ ticket_description: e.target.value });
                      }}
                      required
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Status Apllication</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="select"
                      required
                      id="select"
                      onChange={(e) =>
                        this.setState({ ticket_status: e.target.value })
                      }
                    >
                      <option value="0" hidden>
                        Select Status
                      </option>
                      <option value="1">Belum Mulai</option>
                      <option value="2">Sedang Dikerjakan</option>
                      <option value="3">Selesai</option>
                      <option value="4">Tertunda</option>
                      <option value="5">Batal</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CModalFooter>
                  <CButton color="secondary" onClick={this.toggleCreate}>
                    Cancel
                  </CButton>
                  <CButton color="success" type="submit">
                    Create
                  </CButton>
                </CModalFooter>
              </CForm>
            </CModalBody>
          </CModal>
        </div>
      </>
    );
  }
}

export default TicketInsert;

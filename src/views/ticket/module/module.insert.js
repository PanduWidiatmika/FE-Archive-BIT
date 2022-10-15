import React, { Component } from "react";
import { api } from '../../plugins/api'
import swal from "sweetalert";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CInput,
  CLabel,
  CButton,
  CFormGroup,
  CForm,
  CRow,
  CCol,
  CLink
} from "@coreui/react";

const Alert = () => {
  swal("Selamat!", "Module Berhasil Ditambahkan!", "success");
};

class ModuleInsert extends Component {
  constructor() {
    super();
    this.state = {
      module: [{ formData: "" }],
      cekToken: window.sessionStorage.getItem("token")
    };
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
    const apiUrl = "/insert-module";
    const dataModule = {
      ticket_id: this.props.match.params.id,
      module_name: this.state.module,
      token: this.state.cekToken
    };

    api.post(apiUrl, dataModule).then((resp) => {
      Alert();
      window.location.reload(false);
    });
  }

  render() {
    const { module } = this.state;

    return (
      <>
        <CRow>
          <CCol lg="6">
            <CCard>
              <CForm
                method="post"
                className="form-horizontal"
                onSubmit={(e) => this.saveDataToAPI(e)}
              >
                <CCardHeader>
                  <CRow>
                    <CCol md="6" style={{ marginTop: "1%" }}>INSERT MODULE</CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow>
                        <CCol lg="12">
                          <CFormGroup>
                            <CLabel>Module</CLabel>
                            {module.map((d, i) => {
                              return (
                                <div key={i}>
                                  <CInput
                                    type="text"
                                    placeholder="enter module name"
                                    name="formData"
                                    autoComplete="off"
                                    value={d.formData}
                                    onChange={(e) => this.handleChange(i, e)}
                                  />
                                  <br />
                                </div>
                              );
                            })}
                            <CButton
                              style={{ float: "right" }}
                              color="warning"
                              variant="ghost"
                              onClick={() => {
                                this.addForm();
                              }}
                            >
                              ADD
                            </CButton>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCardBody>
                <CCardFooter>
                  <CLink to={{ pathname: `/tview/${this.props.match.params.id}` }} style={{ textDecoration: "none" }}>
                    <CButton color="secondary">
                      BACK
                    </CButton>{" "}
                  </CLink>
                  <CButton type="submit" color="warning">
                    CREATE
                  </CButton>
                </CCardFooter>
              </CForm>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ModuleInsert;

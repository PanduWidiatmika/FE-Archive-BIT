import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { api } from '../../plugins/api'
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Alert = () => {
  swal("Selamat!", "Berhasil Registrasi!", "success");
}

const Register = () => {
  const [name_room, setNameRoom] = useState("");

  const [cekToken, setCekToken] = useState(window.sessionStorage.getItem("token"))

  const roomRegister = (e) => {
    e.preventDefault();
    // setLoading(true);
    api
      .post("/create-room", {
        name_room: name_room,
        token: cekToken
      })
      .then((res) => {
        Alert();
        window.location.reload()
      })
      .catch((res) => {
        res.error;
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CForm method="post" onSubmit={(e) => roomRegister(e)}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your Rooms</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Rooms"
                      autoComplete="off"
                      required
                      onChange={(e) => setNameRoom(e.target.value)}
                    />
                  </CInputGroup>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <CButton type="submit" color="success" block>
                        Create Room
                      </CButton>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <Link to="/livechat">
                        <CButton className="btn-twitter mb-1" block>
                          <span>Chatting</span>
                        </CButton>
                      </Link>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;

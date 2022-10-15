import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//Axios
import { api } from '../plugins/api';
//Sweetalert
import swal from "sweetalert";
//moment
import moment from "moment";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CForm,
  CTextarea,
  CInput,
  CSelect,
  CProgress,
  CSwitch,
  CLink
} from "@coreui/react";

const Alert = () => {
  swal("Selamat!", "Data Berhasil Diubah!", "success");
};

const TicketView = function () {
  const params = useParams();

  //array of object
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [name_client, setNameClient] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [module, setModule] = useState([]);
  const [percent_module, setPercent] = useState("");

  const [cekToken, setCekToken] = useState(window.sessionStorage.getItem("token"))

  const getData = function () {
    //get->post
    api.post(`/viewId-ticket?ticket_id=${params.id}`, { token: cekToken }).then((res) => {
      //array of object (all array views)
      setData(res.data.result);

      //one atribut
      setTitle(res.data.result[0].ticket_title);
      setNameClient(res.data.result[0].ticket_name_client);
      setStatus(res.data.result[0].ticket_status);
      setDescription(res.data.result[0].ticket_description);
      setModule(res.data.result);
    });
  };

  const getPercentModule = function () {
    //get->post
    api.post(`/percent-module?ticket_id=${params.id}`, { token: cekToken }).then((res) => {
      setPercent(res.data.result[0].percent_module);
    });
  };

  const updateData = (e, ticket_id) => {
    e.preventDefault();
    const apiUrl = "/update-ticket";
    const data = {
      ticket_id: ticket_id,
      ticket_title: title,
      ticket_name_client: name_client,
      module: module,
      ticket_description: description,
      ticket_status: status,
      token: cekToken
    };

    api.put(apiUrl, data).then((res) => {
      Alert();
      window.location.reload(false);
    });
  };

  const handleModule = (index) => (e) => {
    const newState = module.map((data, i) => {
      if (index === i) {
        return { ...data, [e.target.name]: e.target.value };
      } else {
        return data;
      }
    });
    setModule(newState);
  };

  const handleModuleStatus = (index) => (e) => {
    const newState = module.map((data, i) => {
      if (index === i) {
        return { ...data, [e.target.name]: e.target.checked };
      } else {
        return data;
      }
    });
    setModule(newState);
  };

  useEffect(() => {
    getData(), getPercentModule();
  }, []);

  return (
    <>
      <div>
        <CCard>
          <CForm method="post" onSubmit={(e) => updateData(e, params.id)}>
            <CCardHeader>
              TICKET MANAGEMENT
            </CCardHeader>
            <CCardBody>
              <CCard>
                <CCardBody>
                  <h6>
                    <b>DATA TICKET</b>
                  </h6>
                  <table className="table table-hover table-striped">
                    <tbody>
                      <tr>
                        <td style={{ width: "20%" }}>
                          <b>CLIENT NAME</b>
                        </td>
                        <td style={{ width: "1%" }}>
                          <b>:</b>
                        </td>
                        <td>
                          <b>
                            <CInput
                              value={data.length && name_client}
                              onChange={(e) => setNameClient(e.target.value)}
                            ></CInput>
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "20%" }}>
                          <b>TITLE APPLICATION</b>
                        </td>
                        <td style={{ width: "1%" }}>
                          <b>:</b>
                        </td>
                        <td>
                          <b>
                            <CInput
                              value={data.length && title}
                              onChange={(e) => setTitle(e.target.value)}
                            ></CInput>
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "20%" }}>
                          <b> STATUS TICKET</b>
                        </td>
                        <td style={{ width: "1%" }}>
                          <b>:</b>
                        </td>
                        <td>
                          <CSelect
                            custom
                            name="ticket_status"
                            id="ticket_status"
                            value={data.length && status}
                            onChange={(e) => setStatus(e.target.value)}
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
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "20%" }}>
                          <b>CREATED AT</b>
                        </td>
                        <td style={{ width: "1%" }}>
                          <b>:</b>
                        </td>
                        <td>
                          <b>
                            <CInput
                              value={
                                data.length &&
                                moment(data[0].created_at).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              }
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                              disabled
                            ></CInput>
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "20%" }}>
                          <b>UPDATED AT</b>
                        </td>
                        <td style={{ width: "1%" }}>
                          <b>:</b>
                        </td>
                        <td>
                          <b>
                            <CInput
                              value={
                                data.length &&
                                moment(data[0].updated_at).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              }
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                              disabled
                            ></CInput>
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
              <CCard>
                <CCardBody>
                  <h6>
                    <b>DESCRIPTION</b>
                  </h6>
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <td>
                          <b>
                            <CTextarea
                              name="ticket_description"
                              id="ticket_description"
                              rows="6"
                              placeholder="Content..."
                              value={data.length && description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol md="5">
                      <h6>
                        <b>LIST MODULE</b>
                      </h6>
                    </CCol>
                    <CCol md="2">
                      <h6>
                        <b>MODULE PROGRESS :</b>
                      </h6>
                    </CCol>
                    <CCol md="5">
                      <CProgress
                        value={percent_module}
                        color="success"
                        showPercentage
                        precision={2}
                        className="mb-3"
                        style={{ marginTop: "0.5%" }}
                      />
                    </CCol>
                  </CRow>
                  <table className="table table-hover table-striped">
                    <tbody>
                      {module.length ? (
                        module.map((d, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <CRow>
                                  <CCol
                                    md="5"
                                    style={{ marginTop: "1%", marginLeft: "2%" }}
                                  >
                                    <b>
                                      <CInput
                                        name="module_name"
                                        value={d.module_name}
                                        onChange={handleModule(i)}
                                      ></CInput>
                                    </b>
                                  </CCol>
                                  <CCol md="6" style={{ marginTop: "1.4%", marginBottom: "0.6%" }}>
                                    <b>
                                      <CSwitch
                                        name="module_status"
                                        className={"mx-1"}
                                        shape={"pill"}
                                        color={"success"}
                                        variant={"opposite"}
                                        labelOn={"\u2713"}
                                        labelOff={"\u2715"}
                                        value={d.module_status}
                                        onChange={handleModuleStatus(i)}
                                        defaultChecked={d.module_status}
                                      />
                                    </b>
                                  </CCol>
                                  <CCol md="1">
                                    <b>
                                      <CInput
                                        type="hidden"
                                        name="module_id"
                                        value={d.module_id}
                                        onChange={handleModule(i)}
                                      ></CInput>
                                    </b>
                                  </CCol>
                                </CRow>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
            </CCardBody>
            <CCardFooter>
              <CLink to={{ pathname: `/ticket` }} style={{ textDecoration: "none" }}>
                <CButton color="secondary">
                  BACK
                </CButton>{" "}
              </CLink>
              <CButton type="submit" color="success">
                UPDATE
              </CButton>{" "}
              <Link to={`/minsert/${params.id}`}>
                <CButton className="float-right" color="warning">INSERT MODULE</CButton>
              </Link>
            </CCardFooter>
          </CForm>
        </CCard>
      </div>
    </>
  );
};

export default TicketView;

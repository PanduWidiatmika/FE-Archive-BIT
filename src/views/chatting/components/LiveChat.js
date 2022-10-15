import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { api, authToken } from '../../plugins/api'
import { Link } from "react-router-dom";
import swal from "sweetalert";

const socket = io.connect("http://localhost:3002");

const LiveChat = function () {
  //array of object (keseluruha array data user & room)
  const [data, setData] = useState([]);
  const [dataRooms, setDataRooms] = useState([]);

  //data array login user
  const [username, SetUsername] = useState("");
  const [id, SetID] = useState("");

  //data array login room
  const [primary_room, setPrimaryRoom] = useState("0");
  const [room, SetRoom] = useState("");

  const [cekToken, setCekToken] = useState(window.sessionStorage.getItem("token"))

  const [showChat, setShowChat] = useState(false);

  //logic join room
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", username, room);
      setShowChat(true);
    }
  };

  //get all array data from db with axios
  const getData = function () {
    //get->post
    api.post("/get-user", { token: cekToken }).then((res) => {
      setData(res.data.result);
    });

    //get->post
    api.post("/get-primaryroom", { token: cekToken }).then((res) => {
      setDataRooms(res.data.result);
    });
  };

  //logic login
  const loginWID = (e) => {
    e.preventDefault();
    api
      .post("/loginID", {
        id_user: id,
        token: cekToken
      })
      .then((res) => {
        if (res.status) {
          res.data.message;
          SetUsername(res.data.result[0].first_name);
          if (primary_room === "0") {
            swal("Warning!", "Kamu belum memilih Room!", "info");
          } else {
            api
              .post("/loginRooms", {
                id: primary_room,
                token: cekToken
              })
              .then((res) => {
                if (res.data.result[0].name_room) {
                  res.data.message;
                  SetRoom(res.data.result[0].name_room);
                  joinRoom();
                }
              });
          }
        }
      })
      .catch((res) => {
        res.error;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {!showChat ? (
          <CRow>
            <CCol lg="3" />
            <CCol lg="6">
              <CCard>
                <CCardHeader color="success">
                  <CRow>
                    <CCol md="7">
                      <h5 style={{ color: "white", marginTop: "3%" }}>
                        BIT LIVE CHATTING
                      </h5>
                    </CCol>
                    <CCol md="5">
                      {authToken().rid === 0 ?
                        (<Link to="/registerPageRoom">
                          <CButton
                            color="primary"
                            variant="ghost"
                            style={{ float: "right" }}
                          >
                            Create Room
                          </CButton>
                        </Link>)
                        :
                        <div></div>
                      }

                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CCard borderColor="success">
                    <CCardBody>
                      <CRow style={{ marginBottom: "5%" }}>
                        <CCol md="3" style={{ marginTop: "1%" }}>
                          <b>Username</b>
                        </CCol>
                        <CCol md="9">
                          <CSelect
                            custom
                            required
                            onChange={(e) => SetID(e.target.value)}
                          >
                            <option value="0" hidden>
                              Select Username
                            </option>
                            <option value={authToken().uid}>
                              {authToken().urn}
                            </option>
                          </CSelect>
                        </CCol>
                      </CRow>
                      <CRow style={{ marginBottom: "2%" }}>
                        <CCol md="3" style={{ marginTop: "1%" }}>
                          <b>Room Key</b>
                        </CCol>
                        <CCol md="9">
                          <CSelect
                            custom
                            required
                            onChange={(e) => setPrimaryRoom(e.target.value)}
                          >
                            <option value="0" hidden>
                              Select Rooms
                            </option>
                            {dataRooms.map((d, i) => {
                              return (
                                <option key={i} value={d.id}>
                                  {d.name_room}
                                </option>
                              );
                            })}
                          </CSelect>
                        </CCol>
                      </CRow>
                      <CButton
                        className="float-right"
                        color="success"
                        onClick={(e) => loginWID(e)}
                      >
                        Join Room
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol lg="3" />
          </CRow>
        ) : (
          <Chat
            socket={socket}
            username={username}
            room={room}
            setShowChat={setShowChat}
            SetUsername={SetUsername}
            setPrimaryRoom={setPrimaryRoom}
          />
        )}
      </div>
    </>
  );
};

export default LiveChat;

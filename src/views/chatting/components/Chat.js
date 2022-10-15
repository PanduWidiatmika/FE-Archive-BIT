import CIcon from "@coreui/icons-react";
import {
  CButton,
  CInput,
  CCard,
  CCol,
  CRow,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CLink,
  CTooltip,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { api } from '../../plugins/api'
import moment from 'moment';

const Chat = function ({
  socket,
  username,
  room,
  setShowChat,
  SetUsername,
  setPrimaryRoom
}) {
  const [currentMessage, setCurrentMassage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [oldMessage, setOldMessage] = useState([]);

  const [cekToken, setCekToken] = useState(window.sessionStorage.getItem("token"))


  //send message to socket & server database
  const sendMassage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: moment(new Date()).format('HH:mm a')
        // new Date(Date.now()).getHours() +
        // ":" +
        // new Date(Date.now()).getMinutes(),
      };
      try {
        api.post("/insert-room", {
          room: room,
          username: username,
          message: currentMessage,
          time: moment(new Date()).format('HH:mm a'),
          // new Date(Date.now()).getHours() +
          // ":" +
          // new Date(Date.now()).getMinutes(),
          token: cekToken

        });
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMassage("");
        const clearInput = document.getElementById("name");
        clearInput.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  };

  //get old message from db
  const getOldMessage = async () => {
    //get->post
    api.post(`/get-messages?room=${room}`, { token: cekToken }).then((res) => {
      setOldMessage(res.data.result);
    });
  };

  //exit room chat
  async function handleExitClick() {
    await socket.disconnect();
    await socket.emit("leave_room", username, room);
    await SetUsername("");
    await setPrimaryRoom("0");
    await setShowChat(false);
    await socket.connect();
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    getOldMessage();
  }, [socket]);

  return (
    <div>
      <CCard>
        <CCardHeader color="success">
          <CRow>
            <CCol md="10">
              <h5 style={{ color: "white", marginTop: "0.5%" }}>
                {room}
              </h5>
            </CCol>
            <CCol md="2">
              <CButton
                color="primary"
                variant="ghost"
                onClick={handleExitClick}
                style={{ float: "right" }}
              >
                Exit Room
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CCard style={{ background: "transparent", border: "none" }}>
            <CCardBody>
              <CCardBody>
                <CCard style={{ background: "transparent", border: "none" }}>
                  {/* Menampilkan history chat pada room tersebut */}
                  {oldMessage.map((messageContent, i) => {
                    if (username !== oldMessage[i].username) {
                      return (
                        <CCardBody style={{ padding: "5px" }} key={i}>
                          <div
                            className="message"
                            style={{
                              background: "#59CE8F",
                              width: "fit-content",
                              padding: "5px 5px 1px 5px",
                              color: "white",
                              borderRadius: "3% 15px",
                              overflowWrap: "break-word",
                              maxWidth: "35%",
                            }}
                          >
                            <small>{messageContent.username}</small>
                            <h5>{messageContent.message}</h5>
                            <div className="authorTime">
                              <small>{messageContent.time}</small>
                            </div>
                          </div>
                        </CCardBody>
                      );
                    } else {
                      return (

                        <CCardBody style={{ padding: "5px" }} key={i}>
                          <div
                            className="message"
                            style={{
                              background: "#31E1F7",
                              width: "fit-content",
                              padding: "5px 5px 1px 5px",
                              color: "white",
                              borderRadius: "15px 3%",
                              float: "right",
                              overflowWrap: "break-word",
                              maxWidth: "35%",
                            }}
                          >
                            <small>{messageContent.username}</small>
                            <h5>{messageContent.message}</h5>
                            <small>{messageContent.time}</small>
                          </div>
                        </CCardBody>

                      );
                    }
                  })}

                  {/* Menampilkan pesan terbaru yg masuk pada chat room */}
                  {messageList.map((messageContent, i) => {
                    if (username !== messageContent.author) {
                      return (
                        <CCardBody style={{ padding: "5px" }} key={i}>
                          <div
                            className="message"
                            style={{
                              background: "#59CE8F",
                              width: "fit-content",
                              padding: "5px 5px 1px 5px",
                              color: "white",
                              borderRadius: "3% 15px",
                              overflowWrap: "break-word",
                              maxWidth: "35%",
                            }}
                          >
                            <small>{messageContent.author}</small>
                            <h5>{messageContent.message}</h5>
                            <div className="authorTime">
                              <small>{messageContent.time}</small>
                            </div>
                          </div>
                        </CCardBody>
                      );
                    } else {
                      return (
                        <CCardBody style={{ padding: "5px" }} key={i}>
                          <div
                            className="message"
                            style={{
                              background: "#31E1F7",
                              width: "fit-content",
                              padding: "5px 5px 1px 5px",
                              color: "white",
                              borderRadius: "15px 3%",
                              float: "right",
                              overflowWrap: "break-word",
                              maxWidth: "35%",
                            }}
                          >
                            <small>{messageContent.author}</small>
                            <h5>{messageContent.message}</h5>
                            <small>{messageContent.time}</small>
                          </div>
                        </CCardBody>
                      );
                    }
                  })}
                </CCard>
              </CCardBody>
              <CCard style={{ background: "transparent", border: "none" }}>
                <CCardBody>
                  <CRow>
                    <CCol md="11">
                      <CInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your Messages"
                        autoComplete="off"
                        onChange={(e) => {
                          setCurrentMassage(e.target.value);
                        }}
                        value={currentMessage}
                        style={{ borderRadius: "20px" }}
                      />
                    </CCol>
                    <CCol
                      md="1"
                      className="text-center"
                      style={{
                        padding: "0px",
                        marginTop: "0.5%",
                        marginLeft: "0%",
                      }}
                    >
                      <CLink>
                        <CTooltip content="send" placement="top">
                          <CIcon
                            name="cil-cursor"
                            size="xl"
                            onClick={() => sendMassage()}
                          ></CIcon>
                        </CTooltip>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Chat;

import { io, emit, on, Socket } from "socket.io-client";
import { url } from "../servirce";

import Peer from "simple-peer";
import { createContext, useCallback, useEffect, useState, useRef } from "react";
export const CallContext = createContext();

export const CallContextProvider = ({ children, user }) => {
  const [mysocket, setMysocket] = useState("");

  const [userCall, setUserCall] = useState(false);
  const [getCall, setGetCall] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callAccepted, setCallAccpected] = useState(false);
  const [callerSignal, setCallSignal] = useState();
  const [recpientUser, setRecpientUser] = useState("");
  const [stream, setStream] = useState();
  const [myid, setId] = useState(user?.id);
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState();
  const recpientVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const mysocketId = onlineUsers?.find((users) => users.userId === user.id);
    setMysocket(mysocketId?.socketId);
  }, [onlineUsers]);

  useEffect(() => {
    socket.on("getCall", (data) => {
      console.log("I get call");
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        setStream(stream);
      });
      setGetCall(true);
      console.log(data);
      setCallSignal(data.signal);
      setRecpientUser(data.name);
    });

    socket.on("callEnded", () => {
      setGetCall(false);
      setCallEnded(true);
      setCallSignal();
      setCallAccpected(false);
      setCallSignal();
      setRecpientUser("");
      connectionRef.current = null;
      window.location.reload();
    });
  }, [socket]);

  const updateOnlineUser = useCallback((onlineUser, socket) => {
    setOnlineUsers(onlineUser);
    setSocket(socket);
  }, []);

  const callUser = useCallback((id) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setStream(stream);
    });
    if (!id) return;
    setUserCall(true);
    setRecpientUser(id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        from: mysocket,
        name: myid,
        id: id,
      });
    });

    peer.on("stream", (stream) => {
      recpientVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccpected(true);
      setUserCall(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }, []);

  const anwserCall = useCallback(() => {
    setCallAccpected(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: recpientUser });
    });

    peer.on("stream", (stream) => {
      if (stream) recpientVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  }, []);

  const leaveCall = useCallback(() => {
    setCallEnded(true);
    setGetCall(false);
    setCallAccpected(false);
    setCallSignal();
    socket.emit("callend", recpientUser);
    connectionRef.current = null;
    window.location.reload();
  }, []);
  return (
    <CallContext.Provider
      value={{
        recpientVideo,
        userCall,
        callUser,
        leaveCall,
        anwserCall,
        callAccepted,
        callEnded,
        mysocket,
        myid,
        recpientUser,
        getCall,
        updateOnlineUser,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

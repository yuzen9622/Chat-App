import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./account/login";
import Sign from "./account/sign";
import Chat from "./chat/chat";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./navbar/Navbar";
import { ChatContext, ChatContextProvider } from "./Context/ChatContext";
import { CallContextProvider } from "./Context/CallContext";
import Setting from "./setting/Setting";
import EditProfile from "./setting/Edit-Profile";
import UserProfile from "./setting/UserProfile";
import View from "./view/view";
function App() {
  const { user } = useContext(AuthContext);

  console.log(user ? 1 : 0);
  window.addEventListener("storage", (e) => {
    sessionStorage.setItem(e.key, e.oldValue);
    localStorage.setItem(e.key, e.oldValue);
  });

  return (
    <div className="App">
      <ChatContextProvider user={user}>
        <Navbar />
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/chat" element={user ? <Chat /> : <Login />} />
          <Route path="/Profile" element={<Setting />} />
          <Route path="/user/:id" Component={UserProfile} />
          <Route path="/Edit" element={<EditProfile />} />
          <Route path="/view" element={<View />} />
          <Route
            path="/"
            element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />}
          />
        </Routes>
      </ChatContextProvider>
    </div>
  );
}

export default App;

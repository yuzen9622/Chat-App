import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './account/login';
import Sign from './account/sign';
import Chat from './chat/chat';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import Navbar from './navbar/Navbar';
import { ChatContextProvider } from './Context/ChatContext';
import Setting from './setting/Setting';
function App() {
  const { user } = useContext(AuthContext);
  console.log(user ? 1 : 0)

  return (

    <div className="App">
      <ChatContextProvider user={user}>
        <Navbar />
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/chat' element={user ? <Chat /> : <Login />} />
          <Route path='/Profile' element={<Setting />} />
          <Route path='/' element={user ? <Navigate to="/chat" /> : <Navigate to='/login' />} />
        </Routes>
      </ChatContextProvider>
    </div>

  );
}

export default App;

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes }
  from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Edit from './components/Edit';
import Home from './components/Home';
import FormSign from './components/Form';
import Formlogin from './components/Loginform';
import { socket } from './socket';
import ChatRoomForm from './components/ChatRoomForm';
import Chat from './components/chat';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }



    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);

  return (
    <div className='App'>

      <Router>
        <Routes>
          <Route path='/'
            element={<Home />} />
          <Route path='/create'
            element={<Create />} />
          <Route path='/edit'
            element={<Edit />} />

          <Route path='/signup'
            element={<FormSign />} />

          <Route path='/login'
            element={<Formlogin />} />
          <Route path='/room'
            element={<ChatRoomForm />} />
                <Route path='/chat'
            element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
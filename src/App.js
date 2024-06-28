import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/noteState';
import { useState } from 'react';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
    
  const [mode, setmode] = useState('#e3f2fd');
  const [m, setm] = useState('dark');
  const [alert, SetAlert] = useState(null);

  const showAlert = (message, type) => {
    SetAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      SetAlert(null);
    }, 3000);
  }
  if(mode === '#e3f2fd'){
    document.body.style.backgroundColor = "rgb(210,252,252)"
  }
  const tooglemode = () => {
    if (mode === '#e3f2fd') {
      setmode('dark');
      setm('light');
      document.body.style.backgroundColor = "black";
      showAlert("Dark Mode Enabled ", "Success");
    }
    else {
      setmode('#e3f2fd');
      setm('dark');
      document.body.style.backgroundColor = "rgb(210, 252, 252)";
      showAlert("Light Mode Enabled ", "Success");


    }

  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="Inotebook" mode={mode} tooglemode={tooglemode} m={m} />
          <Alert alert={alert} mode={mode} />
          <Routes>
            <Route exact path="/" element={<Home mode={mode} showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup mode={mode} showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );

}
export default App;

import './App.css';
import './notes.css'; // Import the CSS file
import { BrowserRouter,  Route,Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <div className="App">
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container"> 
    <Routes>
    <Route exact path='/'  element={<Home showAlert={showAlert}/>}></Route>
    <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
    <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
    <Route exact path='/about' element={<About/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </div>
  );
}

export default App;

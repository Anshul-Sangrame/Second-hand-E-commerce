import { Fragment, useState } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Auth } from './Authentication/Auth';

function App() {
  const getDeafaultValue = () => {
    var item = localStorage.getItem('IsAuth');
    if (item == 'true') return true;
    return false;
  }
  const [IsAuth,setIsAuth] = useState(getDeafaultValue())
  const Onclick = () => {
    localStorage.setItem('IsAuth',!IsAuth);
    setIsAuth(!IsAuth);
  }
  
  return (
    <Fragment>
      <button onClick={() => {Onclick()}}>
        {IsAuth? "Authenticated": "Not Authenticated"}
      </button>
      <h1>try going to http://localhost:3000/home/ when not Authenticated</h1>
      {/* Public routes */}
      <Routes>
        <Route path='' element={<h1>Login By Harsh</h1>} />
        <Route path='signUp' element={<h1>SignUp By Muskan</h1>} />
      </Routes>

      {/* Private routes */}
      <Auth isAuth={IsAuth}>
        <Routes>
          <Route path='home' element={<h1>Home</h1>} />
        </Routes>
      </Auth>
    </Fragment>
  );
}

export default App;

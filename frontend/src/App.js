import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import Login from './Components/Login';
import { Public,Private } from './Authentication/Auth';

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route element={<Public />} >
          <Route index element={<Login />} />
          <Route path='signUp' element={<h1>SignUp By Muskan</h1>} />
        </Route>

        {/* Private routes */}
        <Route element={<Private />}>
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
  );
}

export default App;

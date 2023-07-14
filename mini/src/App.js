import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Success from './components/Success';
import Userpage from './components/Userpage';
import Welcome from './components/Welcome';
import Inbox from './components/Inbox';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <Welcome/> */}
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/user" element={<Userpage />}/>
        <Route path="/success/:username" element={<Success/>}/>
        <Route path="/inbox" element={<Inbox/>}/>
      </Routes>
    </div>
  );
}

export default App;

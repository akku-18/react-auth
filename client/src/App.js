import { useState } from "react";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user && user._id ? (
            <Route path="/" element={<Home setLoginUser={setLoginUser}/>} />
          ) : (
            <Route path="/" element={<Login setLoginUser={setLoginUser} />} />
          )}

          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

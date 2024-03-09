// import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./Pages/Login";
import UserTask from "./Pages/UserTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-task" element={<UserTask/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

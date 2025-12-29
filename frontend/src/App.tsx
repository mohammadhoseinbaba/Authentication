import Dashboard from "./Pages/Dashboard"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import {  Routes, Route, } from "react-router-dom";

function App() {


  return (
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
        </Routes>

  )
}

export default App

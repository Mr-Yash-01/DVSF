import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import VoterDashBoard from "./pages/VoterDashBoard"
import AdminDashboard from "./pages/AdminDashboard"
import AddElection from "./pages/AddElection"
import ElectionPage from "./pages/ElectionPage"
import Result from "./pages/Result"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Signin/>} />
        <Route path="/voterDashboard" element={<VoterDashBoard/>} />
        <Route path="/adminDashboard" element={<AdminDashboard/>} />
        <Route path="/addElection" element={<AddElection/>} />
        <Route path="/electionPage" element={<ElectionPage/>} />
        <Route path="/resultPage" element={<Result/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


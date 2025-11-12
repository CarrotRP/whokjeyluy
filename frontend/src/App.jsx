import { useState, useContext, useEffect } from "react"
import { UrlContext } from './context/UrlContext';
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

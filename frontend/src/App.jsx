import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { useEffect, useState } from "react";
import i18n from "./component/i18n";

function App() {
  const savedLang = localStorage.getItem('language') || i18n.language || 'kh';
  const [language, setLanguage] = useState(savedLang);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home setLanguage={setLanguage} language={language}/>}></Route>
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

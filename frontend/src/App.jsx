import Navbar from "./component/Navbar"
import ContentDisplay from "./component/ContentDisplay"
import { useState, useContext, useEffect } from "react"
import { UrlContext } from './context/UrlContext';
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 5;
  const { url } = useContext(UrlContext);

  // const fetchTransaction = () => {
  //   const pageParams = `page=${currentPage}&limit=${limit}`;
  //   //if the url is `/get-transaction?name=dog` then use & else use ?;
  //   const fetchUrl = url.includes('?') ? `${url}&${pageParams}` : `${url}?${pageParams}`;

  //   fetch(fetchUrl)
  //     .then(res => res.json())
  //     .then(data => {
  //       setTransactions(data.result);
  //       setTotalPage(data.totalPage);
  //     });
  // }

  // const fetchSummary = () => {
  //   fetch('http://localhost:3000/user/summary')
  //     .then(res => res.json())
  //     .then(data => setSummary(data));
  // }

  // useEffect(() => {
  //   fetchTransaction();
  //   fetchSummary();
  // }, [url, currentPage]);

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
      {/* <Navbar fetchTransaction={fetchTransaction} fetchSummary={fetchSummary} setCurrentPage/>
        <ContentDisplay
          info={{
            transactions,
            summary,
            totalPage, currentPage
          }}
          setCurrentPage={setCurrentPage}
          fetcher={{
            fetchTransaction, fetchSummary
          }}/> */}
    </BrowserRouter>
  )
}

export default App

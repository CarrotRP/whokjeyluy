import Navbar from "./component/Navbar"
import ContentDisplay from "./component/ContentDisplay"
import { useState, useContext, useEffect } from "react"
import { UrlContext } from './context/UrlContext';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const { url } = useContext(UrlContext);

  const fetchTransaction = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
      });
  }

  const fetchSummary = () => {
    fetch('http://localhost:3000/user/summary')
      .then(res => res.json())
      .then(data => setSummary(data));
  }

  useEffect(() => {
    fetchTransaction();
    fetchSummary();
  }, [url]);

  return (
    <>
      <Navbar fetchTransaction={fetchTransaction} fetchSummary={fetchSummary}/>
      <ContentDisplay transactions={transactions} summary={summary}/>
    </>
  )
}

export default App

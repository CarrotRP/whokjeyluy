import LeftDisplay from "../component/LeftDisplay";
import RightDisplay from "../component/RightDisplay";
import './Home.css';
import { useOutletContext } from "react-router";

export default function Home(props){
    const {setLanguage, language} = props; //props from App.js
    const {loans, summary, currentPage, setCurrentPage, totalPage, query, setQuery, handlePopupOpen} = useOutletContext();

    return(
        <main className="home">
            <LeftDisplay loans={loans} summary={summary} page={{currentPage, setCurrentPage, totalPage}} query={query} setQuery={setQuery} handlePopupOpen={handlePopupOpen} setLanguage={setLanguage} language={language}/>
            <RightDisplay summary={summary}/>
        </main>
    );
}
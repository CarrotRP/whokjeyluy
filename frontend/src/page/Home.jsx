import LeftDisplay from "../component/LeftDisplay";
import RightDisplay from "../component/RightDisplay";
import './Home.css';
import { useOutletContext } from "react-router";

export default function Home(){
    const {loans, summary, currentPage, setCurrentPage, totalPage, query, setQuery} = useOutletContext();

    return(
        <main className="home">
            <LeftDisplay loans={loans} summary={summary} page={{currentPage, setCurrentPage, totalPage}} query={query} setQuery={setQuery}/>
            <RightDisplay summary={summary}/>
        </main>
    );
}
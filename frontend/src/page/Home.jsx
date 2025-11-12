import LeftDisplay from "../component/LeftDisplay";
import RightDisplay from "../component/RightDisplay";
import './Home.css';
import { useOutletContext } from "react-router";

export default function Home(){
    const {loans, summary, currentPage, setCurrentPage, totalPage} = useOutletContext();

    return(
        <main className="home">
            <LeftDisplay loans={loans} page={{currentPage, setCurrentPage, totalPage}}/>
            <RightDisplay summary={summary}/>
        </main>
    );
}
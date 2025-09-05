import LeftDisplay from "../component/LeftDisplay";
import RightDisplay from "../component/RightDisplay";

export default function Home(){
    return(
        <main className="home">
            <LeftDisplay/>
            <RightDisplay/>
        </main>
    );
}
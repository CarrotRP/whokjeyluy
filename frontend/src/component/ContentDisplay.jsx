import SearchBar from './SearchBar';
import ListContent from './ListContent';
import SummaryBox from "./SummaryBox";
import Footer from './Footer';
import './ContentDisplay.css';

function ContentDisplay() {
    return (
        <main className='display-main'>
            <section className="left-side">
                <SearchBar />
                <ListContent />
                <Footer/>
            </section>
            <section className="right-side">
                <SummaryBox/>
            </section>
        </main>
    );
}

export default ContentDisplay;
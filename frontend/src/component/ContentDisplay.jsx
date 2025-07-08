import SearchBar from './SearchBar';
import ListContent from './ListContent';
import SummaryBox from "./SummaryBox";
import Footer from './Footer';
import './ContentDisplay.css';

function ContentDisplay(props) {
    const {transactions, summary} = props;

    return (
        <main className='display-main'>
            <section className="left-side">
                <SearchBar/>
                <ListContent transactions={transactions} />
                <Footer />
            </section>
            <section className="right-side">
                <SummaryBox summary={summary}/>
            </section>
        </main>
    );
}

export default ContentDisplay;
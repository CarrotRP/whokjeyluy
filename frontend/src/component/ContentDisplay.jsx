import SearchBar from './SearchBar';
import ListContent from './ListContent';
import SummaryBox from "./SummaryBox";
import Footer from './Footer';
import './ContentDisplay.css';

function ContentDisplay(props) {
    const {info, setCurrentPage, fetcher} = props;
    const {transactions, summary, totalPage, currentPage} = info;
    const {fetchTransaction, fetchSummary} = fetcher;

    return (
        <main className='display-main'>
            <section className="left-side">
                <SearchBar setCurrentPage={setCurrentPage}/>
                <ListContent 
                    info={{
                        transactions,
                        totalPage,
                        currentPage,
                    }}
                    setCurrentPage={setCurrentPage}
                    fetcher={{
                        fetchTransaction,
                        fetchSummary
                    }}/>
                <Footer />
            </section>
            <section className="right-side">
                <SummaryBox summary={summary}/>
            </section>
        </main>
    );
}

export default ContentDisplay;
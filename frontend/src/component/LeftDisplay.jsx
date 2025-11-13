import SearchBar from './SearchBar';
import LeftContent from './LeftContent';

export default function LeftDisplay(props) {
    const {loans, summary, page, query, setQuery} = props;
    
    return (
        <section className='left-display'>
            <SearchBar summary={summary} query={query} setQuery={setQuery}/>
            <LeftContent loans={loans} page={page}/>
        </section>
    );
}
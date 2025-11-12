import SearchBar from './SearchBar';
import LeftContent from './LeftContent';

export default function LeftDisplay(props) {
    const {loans, page} = props;
    
    return (
        <section className='left-display'>
            <SearchBar/>
            <LeftContent loans={loans} page={page}/>
        </section>
    );
}
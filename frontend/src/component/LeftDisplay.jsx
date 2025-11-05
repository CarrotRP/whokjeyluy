import SearchBar from './SearchBar';
import LeftContent from './LeftContent';

export default function LeftDisplay() {
    
    return (
        <section className='left-display'>
            <SearchBar/>
            <LeftContent/>
        </section>
    );
}
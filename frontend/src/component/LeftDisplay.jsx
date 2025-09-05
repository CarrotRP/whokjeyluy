import SearchBar from './SearchBar';
import ListContent from './ListContent';

export default function LeftDisplay() {
    
    return (
        <section className='left-display'>
            <SearchBar/>
            <ListContent/>
            {/* add pagination here*/}
            {/* language changer here */}
        </section>
    );
}
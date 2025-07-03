import ListTile from './ListTile';

function ListContent(){
    return(
        <section className='list-content'>
            <p id='date'>20/06/2026</p>
            {[...Array(10)].map((_, i) => {
                return <ListTile name={i} amount='-10 USD'/>
            })}
        </section>
    );
}

export default ListContent;
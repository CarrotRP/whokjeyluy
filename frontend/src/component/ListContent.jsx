import ListTile from './ListTile';

function ListContent(props) {

    return (
        <div className="list">
            <section className='list-content'>
                {
                    // Object.groupBy method from mdn doc
                    //also check out tolocalstring option parameter: https://www.w3schools.com/jsref/jsref_tolocalestring.asp
                    Object.entries(Object.groupBy(props.transactions, ({ date }) => new Date(date).toLocaleString("en-GB", { dateStyle: 'medium' }))).map(grouped => {
                        return <div className='group' key={grouped[0]}>
                            <p id='date'>{grouped[0]}</p>
                            {grouped[1].map(user => {
                                return <ListTile key={user.transaction_id} name={user.name} amount={user.amount} />
                            })}
                        </div>
                    })

                }
            </section>
            <button id='pagi'>1</button>
        </div>
    );
}

export default ListContent;
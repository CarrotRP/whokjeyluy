import ListTile from './ListTile';

function ListContent(props) {
    const {info, setCurrentPage} = props;
    const {transactions, currentPage, totalPage} = info;

    return (
        <div className="list">
            <section className='list-content'>
                {
                    // Object.groupBy method from mdn doc
                    //also check out tolocalstring option parameter: https://www.w3schools.com/jsref/jsref_tolocalestring.asp
                    Object.entries(Object.groupBy(transactions, ({ date }) => new Date(date).toLocaleString("en-GB", { dateStyle: 'medium' }))).map(grouped => {
                        return <div className='group' key={grouped[0]}>
                            <p id='date'>{grouped[0]}</p>
                            {grouped[1].map(user => {
                                return <ListTile key={user.transaction_id} name={user.name} amount={Number(user.amount).toFixed(2)} />
                            })}
                        </div>
                    })

                }
            </section>
            <div className="pagi-btn">
                {currentPage == 1 ? <></> :
                    <button id='prevPagi' onClick={(e) => setCurrentPage(c => c - 1)}>{currentPage - 1}</button>
                }
                <button id='pagi'>{currentPage}</button>
                {currentPage == totalPage ? <></> :
                    <button id='nextPagi' onClick={(e) => setCurrentPage(c => c + 1)}>{currentPage + 1}</button>
                }
            </div>
        </div>
    );
}

export default ListContent;
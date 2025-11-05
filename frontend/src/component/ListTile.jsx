import './ListTile.css';

function ListTile(props) {
    return (
        <div className="tile">
            <p id="name">{props.name}</p>
            <p id="amount"
                style={{
                    color: props.amount == 0 ?
                        'white' 
                        : props.amount < 0 ? 'red' 
                        : 'green'
                }}>
                {
                //if in summary section
                props.loc == 'summary' ?
                    //if amount is 0, then they paid what they owed
                    props.amount == 0 ? 'All money repaid'
                    // if amount if more than 0, user owe them
                    : props.amount > 0 ? `owe them ${props.amount} USD`
                    //else they owe the user 
                    : `owe you ${Math.abs(props.amount)} USD`
                // else in left section
                // if amount is more than 0, they return what they owed
                : props.amount > 0  ? `returned ${props.amount} USD`
                //else they borrowed
                : `borrowed ${props.amount} USD`}
            </p>
        </div>
    );
}

export default ListTile;
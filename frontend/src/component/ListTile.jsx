function ListTile(props) {
    return (
        <div className="tile">
            <p id="name">{props.name}</p>
            <p id="amount" style={{ color: props.amount < 0 ? 'red' : 'green' }}>{props.loc == 'summary' ? `owe ${props.amount} USD` : `${props.amount} USD`}</p>
        </div>
    );
}

export default ListTile;
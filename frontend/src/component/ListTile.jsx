function ListTile(props){
    return(
        <div className="tile">
            <p id="name">{props.name}</p>
            <p id="amount">{props.amount}</p>
        </div>
    );
}

export default ListTile;
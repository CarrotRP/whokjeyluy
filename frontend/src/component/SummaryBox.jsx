import ListTile from "./ListTile";

function SummaryBox(){
    return(
        <div className="summary">
            <h3>Summary</h3>
            {[...Array(3)].map((_, i) => {
                return <ListTile name={i} amount='owe 10 USD'/>
            })}
        </div>
    );
}

export default SummaryBox;
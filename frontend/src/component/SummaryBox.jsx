import ListTile from "./ListTile";

function SummaryBox(props){
    
    return(
        <div className="summary">
            <h3>Summary</h3>
            {props.summary.map((v, i) => {
                return <ListTile key={v.user_id} name={v.name} amount={Number(v.amount).toFixed(2)} loc='summary'/>
            })}
        </div>
    );
}

export default SummaryBox;
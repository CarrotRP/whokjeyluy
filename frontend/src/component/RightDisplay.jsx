import ListTile from './ListTile';
import './RightDisplay.css';

export default function RightDisplay() {

    //dummy for now
    const array = [
        {name: "tpek", amount: 0},
        {name: "hing", amount: 20},
        {name: "tea", amount: -30}
    ]

    return (
        <section className="right-display">
            <h1>Summary</h1>
            {array.map((v, i) => {
                return <ListTile name={v.name} amount={Number(v.amount).toFixed(2)} loc='summary'/>
            })}
        </section>
    );
}
import ListTile from './ListTile';
import './RightDisplay.css';

export default function RightDisplay(props) {
    const { summary } = props;

    return (
        <section className="right-display">
            <h1>Summary</h1>
            {summary.length > 0 ? 
            summary.map(s => {
                return <ListTile key={s.userId} name={s._id} amount={Number(s.totalAmount).toFixed(2)} loc='summary' />
            })
            : <p style={{marginTop: '20px'}}>No summary yet!</p>
            }
        </section>
    );
}
import './ListTile.css';
import { useTranslation } from 'react-i18next';

function ListTile(props) {
    const {t} = useTranslation();

    return (
        <div className="tile" data-list-id={props?.loan_id} data-date={new Date(props?.date).toLocaleString('en-GB', {dateStyle: 'short'})}>
            <p id="name">{props.name} </p>
            <p id="amount"
                style={{
                    color: props.amount == 0 ?
                        'var(--secondary-text)' 
                        : props.amount < 0 ? 'var(--borrow)' 
                        : 'var(--receive)'
                }}>
                {
                //if in summary section
                props.loc == 'summary' ?
                    //if amount is 0, then they paid what they owed
                    props.amount == 0 ? t('all paid')
                    // if amount if more than 0, user owe them
                    : props.amount > 0 ? t('owe them', {amount: props.amount})
                    //else they owe the user 
                    : t('owe you', {amount: Math.abs(props.amount)})
                // else in left section
                // if amount is more than 0, they return what they owed
                : props.amount > 0  ? t('borrowed', {amount: props.amount})
                //else they borrowed
                : t('returned', {amount: props.amount})}
            </p>
        </div>
    );
}

export default ListTile;
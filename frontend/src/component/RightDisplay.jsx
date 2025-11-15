import { useTranslation } from 'react-i18next';
import ListTile from './ListTile';
import './RightDisplay.css';

export default function RightDisplay(props) {
    const { summary } = props;
    const {t} = useTranslation();

    return (
        <section className="right-display">
            <h1>{t('summary')}</h1>
            {summary.length > 0 ? 
            summary.map(s => {
                return <ListTile key={s.userId} name={s._id} amount={Number(s.totalAmount).toFixed(2)} loc='summary' />
            })
            : <p style={{marginTop: '20px'}}>{t('no summary')}</p>
            }
        </section>
    );
}
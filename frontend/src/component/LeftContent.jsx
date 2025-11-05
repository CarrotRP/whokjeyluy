import { useRef } from 'react';
import ListTile from './ListTile';
import './LeftContent.css';
import single from '../assets/single.png';
import double from '../assets/double.png';

function LeftContent() {
    // const {info, setCurrentPage} = props;
    // const {transactions, currentPage, totalPage} = info;
    const langRef = useRef();
    const triRef = useRef(); //this is for the triangle shape, it is near the language dropdown and the currency dropdown

    //dummy
    const lend = [
        {name: "tpek", amount: 28},
        {name: "hing", amount: 30},
        {name: "hing", amount: -30}
    ];

    const handleLangDropdown = () => {
        langRef.current.classList.toggle('ul-active');

        
        triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
    }

    return (
        <div className="left-content">
            <section className='list'>
                {/* {
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

                } */}

                <p id='transaction-date'>27 May 2025</p>
                {lend.map(v => {
                    return <ListTile name={v.name} amount={Number(v.amount).toFixed(2)}/>
                })}
                <p id='transaction-date'>27 May 2025</p>
                {lend.map(v => {
                    return <ListTile name={v.name} amount={Number(v.amount).toFixed(2)}/>
                })}
                {lend.map(v => {
                    return <ListTile name={v.name} amount={Number(v.amount).toFixed(2)}/>
                })}
                {lend.map(v => {
                    return <ListTile name={v.name} amount={Number(v.amount).toFixed(2)}/>
                })}
            </section>
            <div className="page-navi-btn">
                <button id="first-page"><img src={double} alt="first-page icon" /></button>
                <button id='prev-page'><img src={single} alt="previous-page icon" /></button>
                <p id="current-page">1</p>
                <p id="total-page">of 10</p>
                <button id='next-page'><img src={single} alt="" /></button>
                <button id='last-page'><img src={double} alt="" /></button>
            </div>
            <div className="language-selector">
                <p onClick={handleLangDropdown}>English <span className='triangle' ref={triRef}></span></p>
                <ul ref={langRef}>
                    <li>English</li>
                    <li>Khmer</li>
                </ul>
            </div>
        </div>
    );
}

export default LeftContent;
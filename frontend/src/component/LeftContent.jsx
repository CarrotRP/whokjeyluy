import { useRef } from 'react';
import ListTile from './ListTile';
import './LeftContent.css';
import single from '../assets/single.png';
import double from '../assets/double.png';
import { useEffect } from 'react';

function LeftContent(props) {
    // const {info, setCurrentPage} = props;
    // const {transactions, currentPage, totalPage} = info;
    const { loans, page, handlePopupOpen } = props;
    const { currentPage, setCurrentPage, totalPage } = page;

    const langRef = useRef();
    const triRef = useRef(); //this is for the triangle shape, it is near the language dropdown and the currency dropdown

    const handleLangDropdown = (e) => {
        e.stopPropagation();
        langRef.current.classList.toggle('ul-active');

        triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
    }

    const handleListClick = (e) => {
        const tile = e.target.closest('.tile'); //get the nearest parents, or the first parents

        if(tile && tile.dataset.listId){ //if theres nearest parents, and theres listId on it open popup
            const content = tile.textContent.split(' ');
            handlePopupOpen(e, {type: 'update', loan_id: tile.dataset.listId, name: content[0], amount: content[2], currency: content[3], date: tile.dataset.date});   
        }
    }

    useEffect(() => {
        
        //for handle outside click
        const handleOutsideClick = (e) => {
            if (langRef.current && langRef.current.classList.contains('ul-active') && !langRef.current.contains(e.target)) {
                langRef.current.classList.remove('ul-active');
                triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);


    return (
        <div className="left-content">
            {loans.length > 0 ?
                <section className='list' onClick={handleListClick}>
                    {
                        Object.entries(Object.groupBy(loans, ({ date }) => new Date(date).toLocaleString("en-GB", { dateStyle: 'medium' }))).map(data => {
                            return <div className="list-box" key={data[0]}>
                                <p id='transaction-date'>{data[0]}</p>
                                {data[1].map(loan => {
                                    return <ListTile key={loan._id} name={loan.borrower.username} amount={Number(loan.amount).toFixed(2)} loan_id={loan._id} date={data[0]}/>
                                })}
                            </div>
                        })
                    }
                </section>
                : <p>No data yet!</p>
            }
            {
                totalPage > 0 &&
                <div className="page-navi-btn">
                    <button id="first-page" onClick={() => setCurrentPage(1)}><img src={double} alt="first-page icon" /></button>
                    <button id='prev-page' onClick={() => { if (currentPage > 1) setCurrentPage(i => i -= 1) }}><img src={single} alt="previous-page icon" /></button>
                    <p id="current-page">{currentPage}</p>
                    <p id="total-page">of {totalPage}</p>
                    <button id='next-page' onClick={() => { if (currentPage < totalPage) setCurrentPage(i => i += 1)}}><img src={single} alt="" /></button>
                    <button id='last-page' onClick={() => setCurrentPage(totalPage)}><img src={double} alt="" /></button>
                </div>
            }
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
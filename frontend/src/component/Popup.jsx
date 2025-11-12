import { useState, useContext } from 'react';
import { BASE_URL } from '../config/config';
import './Popup.css';
import { LenderContext } from '../context/LenderContext';

function Popup(props) {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [name, setName] = useState('');
    const [type, setType] = useState('Borrow');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');

    const {user} = useContext(LenderContext);

    //props
    const { refs, handlePopupClose, fetcher, summary } = props;
    const { nameRef, nameTriRef, triRef, currencyRef, popupRef, popupContentRef } = refs;
    const { fetchLoans, fetchSummary } = fetcher;

    const currency = ['USD', '៛'];

    const handleNameDropdown = (e) => {
        e.stopPropagation();
        nameRef.current?.classList.toggle('borrower-names-ul-active')
        nameTriRef.current.style.transform = nameTriRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
    }

    //using eventDelegation
    const handleNameClick = (e) => {
        setName(e.target.textContent);
        nameRef.current?.classList.toggle('borrower-names-ul-active')
        nameTriRef.current.style.transform = nameTriRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
    }

    const handleCurrencyDropdown = (e) => {
        e.stopPropagation();
        currencyRef.current.classList.toggle('currency-ul-active');
        triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
    }
    const handleCurrencyClick = (v) => {
        setSelectedCurrency(v);
        currencyRef.current.classList.toggle('currency-ul-active');
        triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
    }

    const handleAddClick = () => {
        console.log(selectedCurrency, typeof selectedCurrency, typeof 'usd');
        if (name && type && amount && date) {
            console.log('heh')
            //convert to USD(from Riel, using 1$ = 4000r)
            var newAmount = selectedCurrency == 'USD' ? amount : (amount / 4000);

            //borrow or receive, if borrow add - to the front
            newAmount = type == 'Borrow' ? -newAmount : newAmount;

            fetch(`${BASE_URL}/add`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { name, lend_type: type, amount: newAmount, date }
                )
            }).then(res => res.json())
                .then(data => {
                    popupRef.current.classList.remove('popup-active');
                    currencyRef.current.classList.remove('dropdown-c-active');
                    setName('');
                    setType('Borrow');
                    setAmount(0);
                    setDate('');
                    setSelectedCurrency('USD');

                    fetchLoans();
                    fetchSummary();
                });
        }
    }

    return (
        <div className="popup" ref={popupRef}>
            <div className="popup-content" ref={popupContentRef}>
                {/* title and close btn */}
                <div className="head">
                    <p onClick={() => console.log('user: ', user)}>{props.type == 'add' ? 'Add Borrower' : 'Edit Borrower'}</p>
                    <button onClick={handlePopupClose}>&#215;</button>
                </div>
                {/* detail inputs */}
                <div className="inputs">
                    <div className="borrower-names">
                        <span onClick={handleNameDropdown}>
                            <input type="text" placeholder="Borrower Name" value={name} onChange={e => setName(e.target.value)} />
                            <span className="triangle" ref={nameTriRef}></span>
                        </span>

                        {/* names dropdown here */}
                        <ul ref={nameRef} onClick={handleNameClick}>
                            {summary?.map(s => {
                                return <li key={s.userId}>{s._id}</li>
                            })}
                        </ul>
                    </div>
                    <div className="type">
                        <span>
                            <label htmlFor="borrow" style={{ color: 'red' }} className='borrow-label'>
                                <input type="radio" id="borrow" value='Borrow' name="type" checked={type == 'Borrow'} onChange={e => setType(e.target.value)} />
                                Borrow
                            </label>
                        </span>
                        <span>
                            <label htmlFor="receive" style={{ color: 'green' }} className='receive-label'>
                                <input type="radio" id="receive" value='Receive' name="type" checked={type == 'Receive'} onChange={e => setType(e.target.value)} />
                                Receive
                            </label>
                        </span>
                    </div>
                    <div className="money">
                        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                        <div className="currency">
                            <p onClick={handleCurrencyDropdown}>{selectedCurrency} <span className='triangle' ref={triRef}></span></p>
                            <ul ref={currencyRef}>
                                {currency.map((v, i) => <li key={i} onClick={() => handleCurrencyClick(v)}>{v}</li>)}
                            </ul>
                        </div>
                        <p id='fyi'>All currency will be converted to USD</p>
                    </div>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                {/* submit, delete, update buttons */}
                {
                    props.type == 'add'
                        ? <button className="add-borrower-btn" onClick={handleAddClick}>Add</button>
                        : <span className='edited'>
                            <button className='delete-borrower-btn'>Delete</button>
                            <button className='update-borrower-btn'>Update</button>
                        </span>
                }
            </div>
        </div>
    );
}

export default Popup;
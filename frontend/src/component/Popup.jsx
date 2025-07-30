import { useState } from 'react';
import './Popup.css';

function Popup(props) {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [name, setName] = useState('');
    const [type, setType] = useState('Borrow');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    
    //props
    const {refs, handlePopupClose, fetcher} = props;
    const {currencyRef, popupRef, popupContentRef} = refs;
    const {fetchTransaction, fetchSummary} = fetcher;

    const currency = ['USD', '៛'];

    const handleCurrencyDropdown = (e) => {
        e.stopPropagation();
        currencyRef.current.classList.toggle('dropdown-c-active');
    }
    const handleCurrencyClick = (v) => {
        setSelectedCurrency(v);
        currencyRef.current.classList.toggle('dropdown-c-active');
    }
    const handleAddClick = () => {
        console.log(selectedCurrency, typeof selectedCurrency, typeof 'usd');
        if (name && type && amount && date) {
            //convert to USD(from Riel, using 1$ = 4000r)
            var newAmount = selectedCurrency == 'USD' ? amount : (amount / 4000);

            //borrow or receive, if borrow add - to the front
            newAmount = type == 'Borrow' ? -newAmount : newAmount;

            fetch('http://localhost:3000/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { name, transaction_type: type, amount: newAmount, date }
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
                    fetchTransaction();
                    fetchSummary();
                });
        }
    }

    return (
        <div className="popup" ref={popupRef}>
            <div className="popup-content" ref={popupContentRef}>
                <div className="head">
                    <p>Add person</p>
                    <button onClick={handlePopupClose}>&#215;</button>
                </div>
                <div className="inputs">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <div className="type">
                        <span>
                            <input type="radio" id="borrow" value='Borrow' name="type" checked={type == 'Borrow'} onChange={e => setType(e.target.value)} />
                            <label htmlFor="borrow" style={{ color: 'red' }}>Borrow</label>
                        </span>
                        <span>
                            <input type="radio" id="receive" value='Receive' name="type" checked={type == 'Receive'} onChange={e => setType(e.target.value)} />
                            <label htmlFor="receive" style={{ color: 'green' }}>Receive</label>
                        </span>
                    </div>
                    <div className="money">
                        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                        <div className="currency">
                            <div className="custom-c-select" onClick={handleCurrencyDropdown}>
                                <p className="selected-opt">{selectedCurrency}</p>
                            </div>
                            <div className="currency-dropdown" ref={currencyRef}>
                                {currency.map((v, i) => <li key={i} className='lang' onClick={() => handleCurrencyClick(v)}>{v}</li>)}
                            </div>
                        </div>
                        <p id='fyi'>All currency will be converted to USD</p>
                    </div>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <button className="add-btn" onClick={handleAddClick}>Add</button>
            </div>
        </div>
    );
}

export default Popup;
import { useRef, useState } from 'react';
import './Popup.css';

function Popup(props) {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const currency = ['USD', '៛'];

    const handleCurrencyDropdown = () => {
        props.currencyRef.current.classList.toggle('dropdown-c-active');
    }
    const handleCurrencyClick = (v) => {
        setSelectedCurrency(v);
        props.currencyRef.current.classList.toggle('dropdown-c-active');
    }
    const handleAddClick = () => {
        // api call here
    }

    return (
        <div className="popup" ref={props.popupRef}>
            <div className="popup-content" ref={props.popupContentRef}>
                <div className="head">
                    <p>Add person</p>
                    <button onClick={props.handlePopupClose}>&#215;</button>
                </div>
                <div className="inputs">
                    <input type="text" placeholder="Name" />
                    <div className="type">
                        <span>
                            <input type="radio" id="borrow" value='borrow' name="type" checked/>
                            <label htmlFor="borrow" style={{color: 'red'}}>Borrow</label>
                        </span>
                        <span>
                            <input type="radio" id="receive" value='receive' name="type" />
                            <label htmlFor="receive" style={{color: 'green'}}>Receive</label>
                        </span>
                    </div>
                    <div className="money">
                        <input type="number" placeholder="Amount" />
                        <div className="currency">
                            <div className="custom-c-select" onClick={handleCurrencyDropdown}>
                                <p className="selected-opt">{selectedCurrency}</p>
                            </div>
                            <div className="currency-dropdown" ref={props.currencyRef}>
                                {currency.map(v => <li className='lang' onClick={() => handleCurrencyClick(v)}>{v}</li>)}
                            </div>
                        </div>
                    </div>
                    <input type="date" />
                </div>
                <button className="add-btn">Add</button>
            </div>
        </div>
    );
}

export default Popup;
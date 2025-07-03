import './Popup.css';

function Popup(props) {
    const currency = ['USD', '៛']

    return (
        <div className="popup" ref={props.popupRef}>
            <div className="popup-content">
                <p>Add person</p>
                <button>&#215;</button>
                <input type="text" placeholder="Name" />

                <span>
                    <input type="radio" id="borrow" value='borrow' name="type" />
                    <label htmlFor="borrow">Borrow</label>
                </span>
                <span>
                    <input type="radio" id="receive" value='receive' name="type" />
                    <label htmlFor="receive">Receive</label>
                </span>
                <div className="money">
                    <input type="text" placeholder="Amount" />
                    <div className="custom-select">
                        <p className="selected-opt"></p>
                    </div>
                    <div className="currency-dropdown">
                        {currency.map(v => <li className='lang' onClick={() => handleLangClick(v)}>{v}</li>)}
                    </div>
                </div>
                <input type="date" />
                <button className="add">Add</button>
            </div>
        </div>
    );
}

export default Popup;
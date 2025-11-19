import { useState, useContext } from 'react';
import { BASE_URL } from '../config/config';
import './Popup.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Popup(props) {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [name, setName] = useState('');
    const [type, setType] = useState('Borrow');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');

    const {t} = useTranslation();
    
    //props
    const { popupType, refs, fetcher, summary } = props;
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


    const handlePopupClose = () => {
        popupRef.current.classList.remove('popup-active');
        currencyRef.current.classList.remove('currency-ul-active');
    }

    //close popup and refetch
    const closeAndFetch = () => {
        popupRef.current.classList.remove('popup-active');
        currencyRef.current.classList.remove('dropdown-c-active');
        setName('');
        setType('Borrow');
        setAmount(0);
        setDate('');
        setSelectedCurrency('USD');

        fetchLoans();
        fetchSummary();
    }

    const handleAddClick = () => {
        if (name && type && amount && date) {
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
                    closeAndFetch();
                });
        }
    }

    const handleUpdateClick = () => {

        //convert to USD(from Riel, using 1$ = 4000r)
        var newAmount = selectedCurrency == 'USD' ? amount : (amount / 4000);

        //borrow or receive, if borrow add - to the front
        newAmount = type == 'Borrow' ? -newAmount : newAmount;

        fetch(`${BASE_URL}/update/${popupType?.loan_id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, lend_type: type, amount: newAmount, date })
        }).then(res => res.json())
            .then(data => {
                closeAndFetch();
            });
    }

    const handleDeleteClick = () => {
        fetch(`${BASE_URL}/delete/${popupType?.loan_id}`, {
            credentials: 'include',
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                closeAndFetch();
            });
    }

    useEffect(() => {
        if (popupType?.loan_id) {

            fetch(`${BASE_URL}/${popupType?.loan_id}`, {
                credentials: 'include'
            }).then(res => res.json())
            .then(data => {
                setName(data?.borrower_id.username);
                setAmount(Math.abs(Number(data?.amount)));
                setType(data?.lend_type);
                setSelectedCurrency('USD');
                setDate(data?.date.split('T')[0]);
            })
        } else{
            setName('');
            setAmount(0);
            setType('Borrow');
            setDate('');
            setSelectedCurrency('USD');
        }
    }, [popupType]);

    return (
        <div className="popup" ref={popupRef}>
            <div className="popup-content" ref={popupContentRef}>
                {/* title and close btn */}
                <div className="head">
                    <p>{popupType.type == 'add' ? t('add borrower') : t('edit borrower')}</p>
                    <button onClick={handlePopupClose}>&#215;</button>
                </div>
                {/* detail inputs */}
                <div className="inputs">
                    <div className="borrower-names">
                        <span onClick={handleNameDropdown}>
                            <input type="text" placeholder={t('borrower name')} value={name} onChange={e => setName(e.target.value)} />
                            {summary.length > 0 && <span className="triangle" ref={nameTriRef}></span>}
                        </span>

                        {/* names dropdown here */}
                        {
                            summary.length > 0 &&
                            <ul ref={nameRef} onClick={handleNameClick}>
                                {summary?.map(s => {
                                    return <li key={s.userId}>{s._id}</li>
                                })}
                            </ul>
                        }
                    </div>
                    <div className="type">
                        <span>
                            <label htmlFor="borrow" style={{ color: 'red' }} className='borrow-label'>
                                <input type="radio" id="borrow" value='Borrow' name="type" checked={type == 'Borrow'} onChange={e => setType(e.target.value)} />
                                {t('borrow')}
                            </label>
                        </span>
                        <span>
                            <label htmlFor="receive" style={{ color: 'green' }} className='receive-label'>
                                <input type="radio" id="receive" value='Receive' name="type" checked={type == 'Receive'} onChange={e => setType(e.target.value)} />
                                {t('receive')}
                            </label>
                        </span>
                    </div>
                    <div className="money">
                        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                        <div className="currency">
                            <p onClick={handleCurrencyDropdown}>{t(selectedCurrency)} <span className='triangle' ref={triRef}></span></p>
                            <ul ref={currencyRef}>
                                {currency.map((v, i) => <li key={i} onClick={() => handleCurrencyClick(v)}>{t(v)}</li>)}
                            </ul>
                        </div>
                        <p id='fyi'>{t('fyi')}</p>
                    </div>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                {/* submit, delete, update buttons */}
                {
                    popupType.type == 'add'
                        ? <button className="add-borrower-btn" onClick={handleAddClick}>{t('add')}</button>
                        : <span className='edited'>
                            <button className='delete-borrower-btn' onClick={handleDeleteClick}>{t('delete')}</button>
                            <button className='update-borrower-btn' onClick={handleUpdateClick}>{t('update')}</button>
                        </span>
                }
            </div>
        </div>
    );
}

export default Popup;
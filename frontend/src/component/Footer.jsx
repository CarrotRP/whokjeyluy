import { useState, useRef, useEffect } from 'react';
import './Footer.css'

function Footer() {
    const [selectedOpt, setSelectedOpt] = useState('English');
    const dropdownRef = useRef(null);
    const selectorRef = useRef(null);

    //available languages
    const options = ['English', 'ខ្មែរ']

    const handleDropdownClick = () => {
        dropdownRef.current.classList.toggle('dropdown-active')
        selectorRef.current.classList.toggle('custom-select-active')
    }
    const handleLangClick = (value) => {
        setSelectedOpt(value);
        dropdownRef.current.classList.toggle('dropdown-active');
        selectorRef.current.classList.toggle('custom-select-active')
    }
    const setLangCookie = (value) => {
        document.cookie = `lang=${value}`
    }

    useEffect(() => {
        const initLanguageCookie = () => {
            document.cookie = `lang=${selectedOpt}`
        }

        initLanguageCookie();
    }, []);

    return (
        <footer>
            <div className="lang-parent">
                <div className="custom-select" onClick={handleDropdownClick} ref={selectorRef}>
                    <p className="selected-opt">{selectedOpt}</p>
                </div>
                <div className="dropdown" ref={dropdownRef}>
                    {options.map(v => <li className='lang' onClick={() => handleLangClick(v)}>{v}</li>)}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
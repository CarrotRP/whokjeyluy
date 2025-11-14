import { Outlet, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import { useContext, useEffect, useState, useRef } from "react";
import { BASE_URL } from "../config/config";
import { LenderContext } from '../context/LenderContext';
import Popup from "../component/Popup";

export default function MainLayout() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { dispatch } = useContext(LenderContext); //setting user data
    const [loans, setLoans] = useState([]); //left display
    const [summary, setSummary] = useState([]); //right display

    //pagination
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    //query
    const [query, setQuery] = useState('');

    //popup
    const [popupType, setPopupType] = useState([]);
    const popupRef = useRef(null);
    const popupContentRef = useRef(null);
    const currencyRef = useRef(null); //currency dropdown
    const nameRef = useRef(); //borrower name dropdown
    const nameTriRef = useRef(); //triangle shape for borrower name
    const triRef = useRef(); //triangle shape ref for animation(currency triangle)

    const fetchLoans = () => {
        fetch(`${BASE_URL}/?page=${currentPage}&query=${query}`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                setTotalPage(data.totalPage);
                setLoans(data.result)
            });
    }

    const fetchSummary = () => {
        fetch(`${BASE_URL}/summary`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                setSummary(data)
            });
    }

    const handlePopupOpen = (e, type) => {
        e.stopPropagation();
        popupRef.current.classList.toggle('popup-active');
        setPopupType(type);
    }

    //check auth effect
    useEffect(() => {
        fetch(`${BASE_URL}/check-auth`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.authenticate) {
                    navigate(data.redirect);
                    dispatch({ type: 'SET_USER', payload: data.user });
                } else {
                    navigate(data.redirect);
                }
            }).finally(() => setIsLoading(false));
    }, [isLoading]);

    //calling fetch on pagination change
    useEffect(() => {
        fetchLoans();
        fetchSummary();
    }, [currentPage]);

    //search debouncer effect
    useEffect(() => {
        const timeout = setTimeout(fetchLoans, 1000); //1s delay after typing, then search

        return () => {
            clearTimeout(timeout); //clean previous timeout, so only latest timeout is running
        }
    }, [query]);

    //popup close on outside click effect
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupRef.current && popupRef.current.classList.contains('popup-active') && !popupContentRef.current.contains(e.target)) {
                popupRef.current.classList.remove('popup-active');
                currencyRef.current.classList.remove('currency-ul-active');
                nameRef.current.classList.remove('borrower-names-ul-active');
            }

            if (currencyRef.current && !currencyRef.current.contains(e.target) && currencyRef.current.classList.contains('currency-ul-active')) {
                currencyRef.current.classList.remove('currency-ul-active');
                triRef.current.style.transform = triRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
            }

            if (nameRef.current && !nameRef.current.contains(e.target) && nameRef.current.classList.contains('borrower-names-ul-active')) {
                nameRef.current.classList.remove('borrower-names-ul-active');
                nameTriRef.current.style.transform = nameTriRef.current.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    if (isLoading) return null;

    return (
        <>
            <Navbar fetchLoans={fetchLoans} fetchSummary={fetchSummary} summary={summary} handlePopupOpen={handlePopupOpen}/>
            <Outlet context={{ loans, summary, currentPage, setCurrentPage, totalPage, query, setQuery, handlePopupOpen}} />
            {popupType &&
            <Popup
                popupType={popupType}
                refs={{
                    nameRef,
                    nameTriRef,
                    triRef,
                    currencyRef,
                    popupRef,
                    popupContentRef
                }}
                fetcher={{
                    fetchLoans,
                    fetchSummary
                }}
                summary={summary}
            />}
        </>
    );
}
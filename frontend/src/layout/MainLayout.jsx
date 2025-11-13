import { Outlet, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import { LenderContext } from '../context/LenderContext';

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

    useEffect(() => {
        fetch(`${BASE_URL}/check-auth`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.authenticate) {
                    navigate(data.redirect);
                    console.log(data);
                    dispatch({ type: 'SET_USER', payload: data.user });
                } else {
                    navigate(data.redirect);
                }
            }).finally(() => setIsLoading(false));
    }, [isLoading]);

    useEffect(() => {
        fetchLoans();
        fetchSummary();
    }, [currentPage]);

    useEffect(() => {
        const timeout = setTimeout(fetchLoans, 1000); //1s delay after typing, then search
        
        return () => {
            clearTimeout(timeout); //clean previous timeout, so only latest timeout is running
        }
    }, [query]);

    if (isLoading) return null;

    return (
        <>
            <Navbar fetchLoans={fetchLoans} fetchSummary={fetchSummary} summary={summary}/>
            <Outlet context={{loans, summary, currentPage, setCurrentPage, totalPage, query, setQuery}}/>
        </>
    );
}
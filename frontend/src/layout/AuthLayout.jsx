import { Link, Outlet, useLocation, useNavigate } from "react-router";
import './AuthLayout.css';
import { useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import { useTranslation, Trans } from "react-i18next";

export default function AuthLayout() {
    const [isLoading, setIsLoading] = useState(true);
    
    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        fetch(`${BASE_URL}/check-auth`, {
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            if(data.authenticate){
                navigate(data.redirect);
            } else{
                navigate(data.redirect);
            }
        }).finally(() => setIsLoading(false));
    }, [isLoading]);

    if(isLoading) return null;

    return (
        <main className="authlayout">
            <div className="left-panel">
                <h1>{t('welcome')}<br></br><span style={{fontFamily: 'Dancing Script'}}>{t('whokjeyluy')}</span></h1>
                <p>{t('platform')}</p>
            </div>
            <div className="right-panel">
                <h1>{t('whokjeyluy')}</h1>
                <div className="form">
                    <Outlet context={{t}}/>
                </div>
                <Link to={location.pathname == '/signup' ? '/login' : '/signup'}>
                    {location.pathname == '/signup' 
                    ? <Trans i18nKey='have account' components={{bold: <b></b>}}/> 
                    : <Trans i18nKey='no account' components={{bold: <b></b>}}/>}
                </Link>
            </div>
        </main>
    );
}
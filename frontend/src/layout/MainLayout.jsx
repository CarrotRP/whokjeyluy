import { Outlet, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import { useEffect } from "react";
import { BASE_URL } from "../config/config";
import { useState } from "react";

export default function MainLayout(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

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

    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}
import { Outlet } from "react-router";
import Navbar from "../component/Navbar";

export default function MainLayout(){
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}
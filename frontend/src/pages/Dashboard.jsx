import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users"
import { useEffect } from "react";
import axios from 'axios';

export default function Dashboard(){
    const navigate = useNavigate();

    useEffect( () => {

            axios.get("http://localhost:3000/api/v1/user/verify-token", {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`
                }
            }).catch(e => {
                navigate('/');
            })

    }, [])

    return (
        <div className="bg-white h-max">
            <Appbar />
            <Balance />
            <Users />
        </div>
    )
}
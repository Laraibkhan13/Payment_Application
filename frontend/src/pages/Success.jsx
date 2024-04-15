import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/successLogo.png";
import axios from 'axios';

export default function Success(){
    const navigate = useNavigate();

    const location = useLocation();
    const id = location.state.id;
    const balance = location.state.balance;
    const name = location.state.name;

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
        <div className="bg-gray-500 flex justify-center h-screen items-center">
            <div className="bg-white p-8 rounded-lg text-center">
                <div className="mb-2">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="mb-2">
                    Congratulations
                </div>
                <div className="mb-2">
                    Payment Successful
                </div>
                <div>
                    <button onClick={() => {
                        navigate("/dashboard", {state: {id: id, firstName: name, balance: balance}});
                        }} 
                        type="button" 
                        className="mb-2 text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";

export const Balance = () => {
    const location = useLocation();
    const [balance, setBalance] = useState("")

    const navigate = useNavigate();

    useEffect( () => {

        axios.get("http://localhost:3000/api/v1/account/balance", {
            params: {
                userId: location.state.id
            },
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBalance(response.data.balance);
        })

    }, [])

    return (
        <div className="flex justify-between">
            <div className="flex h-14">
                <div className="ml-7 flex flex-col justify-center font-bold text-black">
                    Your balance:
                </div>
                <div className="text-xl font-bold text-blue-950 ml-3 flex flex-col justify-center">
                    Rs {parseFloat(balance).toFixed(2)}
                </div>
            </div>

            <div className="mr-3 flex flex-col justify-center">
                <button onClick={() => {
                    localStorage.clear();
                    navigate("/");
                }} type="button" className="mb-2 text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-3 py-1 rounded-md">Logout</button>
            </div>
        </div>
    )
}
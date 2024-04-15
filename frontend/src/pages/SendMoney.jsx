import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SendMoney(){
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const toId = location.state.toId;
    const toName = location.state.toName;
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
        <div className="flex bg-slate-200 h-screen items-center text-center justify-center">
            <div className="bg-white p-8 rounded-md">
                <div className="font-bold text-2xl">
                    Send Money
                </div>
                <div className="flex flex-col mt-5">
                    <div className="flex justify-center">
                        <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center mt-1 mr-2">
                            {/* Center code */}
                            <div className="text-white flex flex-col justify-center h-full text-xl"> 
                                {toName[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center mr-2">
                        {toName.charAt(0).toUpperCase() + toName.slice(1)} 
                    </div>
                </div>
                <div className="my-2">
                    Amount (in Rs)
                </div>
                <div className="mb-2">
                    <input 
                    onChange={e => {
                        setAmount(e.target.value);
                    }}
                    type="number"
                    className="border rounded-md p-2" 
                    placeholder="Enter amount">
                    </input>
                </div>
                <div>
                <button onClick={async () => {
                    try {
                        await axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: toId,
                            amount: amount,
                            userId: id
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        navigate("/success", {state: {toId: toId, toName: toName, id: id, balance: balance, name: name}});
                    }catch(e) {
                        alert(e?.response?.data?.message)
                    }
                }} type="button" className="w-full mb-2 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Transfer
                </button>
                </div>
            </div>
        </div>
        
    )
}
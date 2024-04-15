import { useLocation } from "react-router-dom"

export default function Appbar(){
    const location = useLocation();

    const firstName = location.state.firstName;

    return(
        <div className="flex justify-between shadow h-14">
            <div className="flex">
                <div className="flex flex-col justify-center ml-4 font-sans font-black text-blue-950 text-3xl italic    ">
                    PAY
                </div>
                <div className="flex flex-col justify-center  font-sans font-black text-red-500 text-3xl italic">
                    KRO
                </div>
            </div>
            
            <div className="flex">
                <div className="flex flex-col justify-center mr-2 text-xl font-bold text-white"> 
                    Hello, {firstName.charAt(0).toUpperCase() + firstName.slice(1)} 
                </div>
                <div className="rounded-full h-12 w-12 text-white bg-blue-900 flex justify-center mt-1 mr-2">
                     {/* Center code */}
                    <div className="flex flex-col justify-center h-full text-xl"> 
                        {firstName[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    )
}
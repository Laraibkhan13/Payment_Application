import { useState } from "react";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signin(){
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-slate-950 flex justify-center items-center h-screen ">
            <div className="border bg-slate-200 p-5 rounded-lg">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your credential to access your account"}/>
                <div className=' mt-10'>
                <InputBox  onChange={e => {
                    setUsername(e.target.value);
                }} label={"Email "} placeholder={"lara@gmail.com"} />
                <InputBox placeholder={"867249546"} type={"password"} onChange={e => {
                    setPassword(e.target.value);
                }} label={"Password "}/>
                </div>
                
                <Button onPress={async () => {

                    try {
                            const response = await axios({
                                method: 'post',
                                url: 'http://localhost:3000/api/v1/user/signin',
                                data: {
                                    password: password,
                                    username: username
                                }
                            })
                            if(response.data.message == 'Username or password not valid'){
                                alert(response.data.message);
                            } else {
                                localStorage.setItem("token", response?.data?.token);
                                // console.log(token);
                                if(localStorage.getItem("token")) {
                                    navigate("/dashboard",{state: {id: response.data.id,  balance: response.data.balance, firstName: response.data.firstName}});
                                }
                            }
                        
                        } catch (err){
                            alert(err?.response?.data?.message);
                        }

                }} label={"Sign In"}/>
                <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    )
}
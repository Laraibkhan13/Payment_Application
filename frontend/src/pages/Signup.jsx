import { useState } from "react";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="flex bg-slate-950 justify-center items-center h-screen ">
            <div className="border bg-slate-200 p-5 rounded-lg flex flex-col justify-center">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} label={"First Name "} placeholder={"Laraib"}/>
                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} label={"Last Name "} placeholder={"Khan"}/>
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} label={"Email "} placeholder={"lara@gmail.com"}/>
                <InputBox type={"password"} onChange={e => {
                    setPassword(e.target.value);
                }} label={"Password "} placeholder={"76543754"}/>
                <Button onPress={async () => {

                    try {
                        const response = await axios({
                            method: 'post',
                            url: 'http://localhost:3000/api/v1/user/signup',
                            data: {
                                firstName: firstName,
                                lastName: lastName,
                                username: username,
                                password: password
                            }
                        })
                        localStorage.setItem("token", response.data.token);
                        // console.log(token);
                        if(localStorage.getItem("token")) {
                            navigate("/dashboard", {state: {id: response.data.id, firstName: response.data.firstName, balance: response.data.balance}});
                        }
                    } catch (err){
                        alert(err?.response?.data?.message)
                    }
                    
                }} 
                label={"Sign Up"}/>
                <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    )
}
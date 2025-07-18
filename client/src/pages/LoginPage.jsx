import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../css/loginPage.css'
export default function LoginPage({ setUser }) {
    const navigate  = useNavigate();
    const [ username , setUsername] = useState('');
    const [ password , setPassword] = useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event)  {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/signin/doctors", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username": username, "password": password})
        });
        const result = await response.json();
        if(result.login === true) {
            alert(result.message);
            setUser(result.user);
            navigate('/homePage');
        } else {
            alert(result.message);
        }
    }

    return(
        <div className="login">
            <div className="loginLogo">
                <div>
                    <h1>SmartCare</h1>
                    <img src='images/logo.png' alt='SmartCare logo'/> 
                </div>
            </div>
            <div className="loginForm">
                <h2>Welcome to SmartCare!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input onChange={handleUsernameChange} type="text" name="username" id="username" required/>
                    <label htmlFor="password">Password</label>
                    <input onChange={handlePasswordChange} type="password" name="password" id="password" required/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}
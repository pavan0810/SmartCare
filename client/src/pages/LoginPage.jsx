import { useState } from 'react'
import { useNavigate } from "react-router-dom"
export default function LoginPage() {
    const navigate  = useNavigate();
    const [ username , setUsername] = useState('');
    const [ password , setPassword] = useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    async function handleLogin() {
        console.log(`username: ${username} and password:${password}`);
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
            navigate('/homePage');
        } else {
            alert(result.message);
        }
    }

    return(
        <div>
            <div>
                <h1>SmartCare</h1>
            </div>
            <div>
                <h3>Welcome to SmartCare!</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input onChange={handleUsernameChange} type="text" name="username" id="username" required/>
                    <label htmlFor="password">Password</label>
                    <input onChange={handlePasswordChange} type="password" name="password" id="password" required/>
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}
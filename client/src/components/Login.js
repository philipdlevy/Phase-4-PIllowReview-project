
import React, {useState} from "react"
import {Link} from 'react-router-dom' 

function Login({onLogin, login}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({ username, password }),
        })
        .then((resp) => resp.json())
        .then((user) => onLogin(user))
    }

  return (
    <div>
        <h1 className='signInStyling'>Sign In</h1>
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"350px", margin:"auto"}}>
            <strong>Username</strong>

            <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br></br>

            <strong>Password</strong>
            <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <Link to="/">
                <button type="submit">Login</button>
            </Link>
            <br></br>
            <h2 className='noAccountStyling'>No account?</h2>
            <Link to="/signup">
                <button className="createAccountButton">Create Account!</button>
            </Link>
        </form>

    </div>
  )
}

export default Login
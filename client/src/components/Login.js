
import React, {useState} from "react"
import {Link} from 'react-router-dom' 
import {useHistory} from "react-router-dom"


function Login({onLogin, login}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    function handleSubmit(e) {
        console.log("user")
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
        history.push("/")
    }
    
  return (
    <div>
        <h1 className='signInStyling'>Sign In</h1>
        <form style={{display:"flex", flexDirection:"column", width:"350px", margin:"auto"}}>
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
            <button onClick={handleSubmit} type="submit">Login</button>
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
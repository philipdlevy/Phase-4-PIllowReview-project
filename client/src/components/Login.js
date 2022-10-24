import React, {useState} from "react"
import {Link} from 'react-router-dom' 
import {useHistory} from "react-router-dom"


function Login({onLogin, login}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    
    // old one. this works
    function handleSubmit(e) {
        e.preventDefault();
        if (username.length == 0 || password.length == 0) {
            // return alert("Username and Password can't be blank")
            document.getElementById("error-alert").hidden = false
        } else {
        fetch("/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({ username, password }),
        })
        .then((resp) => resp.json())
        .then((user) => {
            if (user.error) {
                // alert(user.error.login)
                document.getElementById("error-alert2").hidden = false
            } else {
                onLogin(user)
                history.push("/")
            }
        })
        .catch((error) => alert(error))
        }
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

        <div id="error-alert" hidden>
        <div class="alert-heading">
        </div>
        <div class="inner-msg">
                <p>Username and or Password can't be blank</p>
        </div>
        </div>
        <div id="error-alert2" hidden>
        <div class="alert-heading">
        </div>
        <div class="inner-msg">
                <p>Invalid Username or Password</p>
        </div>
        </div>
    </div>
  )
}

export default Login






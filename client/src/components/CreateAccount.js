import React, {useState} from 'react'
import {Link} from 'react-router-dom' 

function CreateAccount({setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify({
                username, 
                password
            }),
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
        })
    }

  return (
    <div>
        <h1 className='signInStyling'>Sign Up</h1>
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
            <Link to="login">
                <button type="submit">Create Account</button>
            </Link>
            <br></br>
            <Link to="/login">
                <button>Back</button>
            </Link>
        </form>

    </div>
  )
}

export default CreateAccount
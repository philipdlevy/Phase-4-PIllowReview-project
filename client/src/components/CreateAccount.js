import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom' 

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        // Can't let password or username be blank. If they aren't, run fetch.
        if (username.trim() === "" || password.trim() === "") {
            return document.getElementById("CreatingAccount-error-alert").hidden = false   
          }

        fetch("/signup", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify({
                username, 
                password
            }),
        })
        .then((resp) => resp.json())
        .then((user) => {
            console.log(user)
            if (user.status == 422) {
                document.getElementById("usernameTaken-error-alert").hidden = false
            } 
            else if (user.ok) {
                history.push("/login")
            }
        })
        .catch((error) => alert(error))
    }

  return (
    <div>
        <h1 className='signInStyling'>Sign Up</h1>
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
                <button onClick={(e) => handleSubmit(e)} type="submit">Create Account</button>
            <br></br>
            <Link to="/login">
                <button>Back</button>
            </Link>
        </form>

        <div id="CreatingAccount-error-alert" hidden>
          <div className="alert-heading">
          </div>
          <div className="inner-msg">
                <p>Username and or Password can't be blank</p>
          </div>
        </div>
        <div id="usernameTaken-error-alert" hidden>
          <div className="alert-heading">
          </div>
          <div className="inner-msg">
                <p>Username is already taken, try another one.</p>
          </div>
        </div>

    </div>
  )
}

export default CreateAccount
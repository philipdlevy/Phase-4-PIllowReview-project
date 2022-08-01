import React, {useState, useEffect} from "react"
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'

function NavBar({user, onLogout}) {

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout())
  }


  return (
    <div className='container'>
      {/* <header>
        <button onClick={handleLogout}>Logout</button>
      </header> */}

      <Link to="/">
        <h1 className='text'>| Welcome to Phil's Pillow Reviews |</h1>
      </Link>

      {/* {user ? (
        <div>
        <p>Welcome, {user.username}!</p>
        <div/>
      )} */}


      <NavLink to="/contact">
        <button className="button-26" >Contact Us</button>
      </NavLink>

      <NavLink to="/items/new">
        <button className="button-27" >Add Item</button>
      </NavLink>

      <NavLink to="/login">
        <button className="button-25" >SignIn/Up</button>
      </NavLink>

      <NavLink to="/items">
        <button className="button-28" >See All Items</button>
      </NavLink>

      <div className="welcomeMessage">
        {user ? <h2>Welcome,  {user.username}!</h2> : null }
      </div>
    </div>
  );
}

export default NavBar

// role="button" after class for buttons, only a space, no commas
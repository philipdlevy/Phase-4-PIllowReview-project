import React, {useState, useEffect} from "react"
import {Route, Switch, Link} from 'react-router-dom'

function NavBar({onLogout}) {
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

      <h1 className='text'>| Welcome to Phil's Pillow Reviews |</h1>
      <Link to={`/login`}>
        <button class="button-25" role="button">SignIn/Up</button>
      </Link>
      <button class="button-26" role="button">Contact Us</button>
      <button class="button-27" role="button">Add Item</button>
      <button class="button-28" role="button">See All Items</button>
    </div>
  );
}

export default NavBar
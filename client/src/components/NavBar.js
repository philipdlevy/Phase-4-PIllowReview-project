import React, {useState, useEffect} from "react"
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'

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

      <Link to="/" exact>
        <h1 className='text'>| Welcome to Phil's Pillow Reviews |</h1>
      </Link>

      <NavLink to="/contact" exact>
        <button class="button-26" role="button">Contact Us</button>
      </NavLink>

      <NavLink to="/items/new" exact>
        <button class="button-27" role="button">Add Item</button>
      </NavLink>

      <NavLink to="/login">
        <button class="button-25" role="button">SignIn/Up</button>
      </NavLink>

      <button class="button-28" role="button">See All Items</button>
    </div>
  );
}

export default NavBar
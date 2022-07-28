import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

function NavBar() {
  return (
    <div className='container'>
      <h1 className='text'>| Welcome to Phil's Pillow Reviews |</h1>
      <button class="button-25" role="button">SignIn/Up</button>
      <button class="button-26" role="button">Contact Us</button>
      <button class="button-27" role="button">Add Item</button>
      <button class="button-28" role="button">See All Items</button>
    </div>
  );
}

export default NavBar
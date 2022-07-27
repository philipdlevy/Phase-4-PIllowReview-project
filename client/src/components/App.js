import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import Item from "./Item"
import NavBar from "./NavBar"
import ItemDetail from "./ItemDetail"
import HomePage from "./HomePage"
import AddReview from "./AddReview"
import EditReview from "./EditReview"
import ItemLister from "./ItemLister"
import ContactUs from "./ContactUs"

function App() {
  return (
    <div className="backgroundPicture">

      <Item />
      <NavBar />
      <ItemDetail />
      <HomePage />
      <AddReview />
      <EditReview />
      <ItemLister />
      <ContactUs />

    </div>
  );
}

export default App;

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
import AddItem from "./AddItem"
import EditItem from "./EditItem"
import Login from "./Login"

function App() {
  return (
    <div className="backgroundPicture">
      <NavBar />
      <Switch>

      <Item />
      <ItemDetail />
      <HomePage />
      <AddReview />
      <EditReview />
      <ItemLister />
      <AddItem />
      <EditItem />

      <Route exact path="/login">
        <Login />
      </Route>
      

      <Route>
        <ContactUs />
      </Route>

      <Route>
        <h1>
          <strong>404</strong>
          <h3><strong>ERROR! PAGE NOT FOUND</strong></h3>
        </h1>
      </Route>

      </Switch>

    </div>
  );
}

export default App;

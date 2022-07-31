import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import NavBar from "./NavBar"
import HomePage from "./HomePage"
import AddItem from "./AddItem"
import Item from "./Item"
import ItemDetail from "./ItemDetail"
import AddReview from "./AddReview"
import EditReview from "./EditReview"
import ItemLister from "./ItemLister"
import ContactUs from "./ContactUs"
import EditItem from "./EditItem"
import Login from "./Login"

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null)
  }

  // if (user) {
  //   return <h2>Welcome, {user.username}!</h2>;
  // } else {
  //   return <Login onLogin={setUser} />;
  // }

  return (
    <div className="backgroundPicture">
      <NavBar user={user} onLogout={handleLogout} />
      <Switch>

      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/contact">
        <ContactUs />
      </Route>

      <Route path="/login">
        <Login onLogin={handleLogin}/>
      </Route>

      <Route path="/items/:id">
        <Item />
      </Route>
      <Route path="/items/new">
        <AddItem />
      </Route>
      <Route>
        <ItemDetail />
      </Route>
      <Route>
        <AddReview />
      </Route>
      <Route>
        <EditReview />
      </Route>
      <Route>
        <ItemLister />
      </Route>
      <Route>
        <EditItem />
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

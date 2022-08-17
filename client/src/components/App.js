import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import NavBar from "./NavBar"
import HomePage from "./HomePage"
import AddItem from "./AddItem"
import ItemDetail from "./ItemDetail"
import ItemLister from "./ItemLister"
import ContactUs from "./ContactUs"
import Login from "./Login"
import CreateAccount from "./CreateAccount"

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("/items")
    .then((resp) => resp.json())
    .then((items) => {
      setItems(items)
    })
    .catch((error) => alert(error))
  },[])

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  }, []);

  
  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null)
  }

  function onDeleteItem(id) {
    const updatedItemArray = items.filter(item => item.id != parseInt(id))
    setItems(updatedItemArray)
  }


  return (
    <div>
      <NavBar user={user} setUser={setUser} onLogout={handleLogout}/>
      <div className="welcomeMessage">
        {user ? <h2>Welcome,  {user.username}!</h2> : null }
      </div>
      <Switch>

      <Route exact path="/contact">
        <ContactUs />
      </Route>

      <Route exact path="/login">
        <Login onLogin={handleLogin} login={setUser}/>
      </Route>

      <Route exact path="/signup">
        <CreateAccount user={user} setUser={setUser}/>
      </Route>

      <Route exact path="/items">
        <ItemLister items={items} setItems={setItems} user={user}/>
      </Route>
      <Route path="/items/new">
        <AddItem items={items} setItems={setItems} user={user}/>
      </Route>
      <Route path="/items/:id">
        <ItemDetail items={items} setItems={setItems} onDeleteItem={onDeleteItem} user={user}/>
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route>
        <h1 style={{textAlign: "center"}} className="fontcolor" >
          <strong>404</strong>
          <h3 className="fontcolor"><strong>ERROR! PAGE NOT FOUND!</strong></h3>
        </h1>
      </Route>

      </Switch>

    </div>
  );
}

export default App;

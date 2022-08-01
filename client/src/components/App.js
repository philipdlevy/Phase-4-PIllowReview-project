import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import NavBar from "./NavBar"
import HomePage from "./HomePage"
import AddItem from "./AddItem"
// import Item from "./Item"
import ItemDetail from "./ItemDetail"
import AddReview from "./AddReview"
import EditReview from "./EditReview"
import ItemLister from "./ItemLister"
import ContactUs from "./ContactUs"
import EditItem from "./EditItem"
import Login from "./Login"
import CreateAccount from "./CreateAccount"
import Logout from "./Logout"

function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  const [items, setItems] = useState([])
  console.log(items)

  useEffect(() => {
    fetch("/items")
    .then((resp) => resp.json())
    .then((items) => {
      setItems(items)
    })
    .catch((error) => alert(error))
  },[])

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
        console.log(user)
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null)
  }


  // const welcomeMessage = {
  //   if (user) {
  //     return <h2>Welcome, {user.username}!</h2>;
  //   }
  // }


  // if (user) {
  //   return <h2>Welcome, {user.username}!</h2>;
  // } else {
  //   return <Login onLogin={setUser} />;
  // }

  // if (user) {
  //   return <h2>Welcome, {user.username}</h2>
  // }
  // if (!user) return <Login onLogin={setUser} />;

  // const itemLister = items.map((item) => {
  //   return <ItemLister key={item.id} name={item.name} description={item.description} image_url={item.image_url} price={item.price}/>
  // })

  // if (user) {
  //   return <Logout />
  // }

  

  const itemObj = items.map((item) => {
    return item
  })

  return (
    <div className="backgroundPicture">
      <NavBar user={user} setUser={setUser} onLogout={handleLogout}/>
      <Switch>

      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/contact">
        <ContactUs />
      </Route>

      <Route exact path="/login">
        <Login onLogin={handleLogin} login={setUser}/>
      </Route>

      <Route exact path="/signup">
        <CreateAccount user={user} setUser={setUser}/>
      </Route>

      {/* <Route exact path="/items">
        <Item />
      </Route> */}
      <Route exact path="/items">
        <ItemLister allItems={items} itemObj={itemObj}/>
      </Route>
      <Route path="/items/new">
        <AddItem items={items} setItems={setItems}/>
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

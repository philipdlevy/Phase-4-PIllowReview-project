import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom' 

import ItemCard from "./ItemCard"

function ItemLister({items, user}) {
  const [displayItems, setDisplayItems] = useState([])
  const [toggleItems, setToggleItems] = useState(true)

  const history = useHistory();

  useEffect(() => {
    setDisplayItems(items)
  }, [items])

  // const usersItems = user.items

  // function handleFilter() {
  //   fetch("/filter").then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((filteredItems) => setItems(filteredItems))
  //     } else {
  //       sortingError()
  //     }
  //   })
  //   .catch((error) => alert(error))
  // }
  // if (displayItems.length === 0) {
  //   setDisplayItems(items)
  // }

  function handleFilter(e) {
    // if no user, run sorting error method
    if (!user) {
      sortingError()
    }


    setToggleItems(!toggleItems)
    if (toggleItems) {
      const updatedItems = [...user.items]
      setDisplayItems(updatedItems)
    } else {
      setDisplayItems([...items])
    } 
  } 

  // Showing login to see items you have reviewed
  function sortingError() {
    document.getElementById("sortingError").hidden = false
  }


  const itemsArray = displayItems.map((item) => {
    return <ItemCard itemObj={item} />
  })

  return (
    <>
      <div>
        <ul>{itemsArray}</ul>
        <button 
          onClick={(event) => handleFilter(event)} className='sortItemsButton'>See items you have reviewed</button>
      </div>
      <p id="sortingError" hidden>(Sign in to see items)</p>
  </>
  )
}

export default ItemLister
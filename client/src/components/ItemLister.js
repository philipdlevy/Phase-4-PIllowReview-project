import React, {useState} from 'react'
import {Link} from 'react-router-dom' 

import ItemCard from "./ItemCard"

function ItemLister({items, setItems}) {
  // const [filteredItems, setFilteredItems] = useState([])

  function handleFilter() {
    fetch("/filter").then((resp) => {
      if (resp.ok) {
        resp.json().then((filteredItems) => setItems(filteredItems))
      } else {
        sortingError()
      }
    })
    .catch((error) => alert(error))
  }


  // const filteredItemsToDisplay = items.filter((item) => {
  //   console.log("filtered items", item)
  //   if (item.price > 29.99) 
  //   return item
  // })

  // const filterItemReviewsUsernames = item.reviews.map((review) => review.user.username)

  // const filteredItemsToDisplay = items.filter((item) => {
  //   item.reviews.map((review) => review.user.username)
  //   if (user.username ==)
  //   return item
  //   debugger
  // })

  // code for finding the username
  // item.reviews.map((review) => review.user.username)

  // const orderedItemNames = orders.filter(order => order.item != null).map(order => order.item.name);


  const itemsArray = items.map((item) => {
    return <ItemCard key={item.id} itemObj={item} />
  })


  // Showing login to see items you have reviewed
  function sortingError() {
    document.getElementById("sortingError").hidden = false
  }

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
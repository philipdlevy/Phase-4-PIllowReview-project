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

  function handleFilter(e) {
    // if no user, run sorting error method
    if (!user) {
      sortingError()
    }

    setToggleItems(!toggleItems)
    if (toggleItems) {
      // users items array. has duplicates
      const updatedItems = [...user.items]
      // map items and converting each item to its id number
      const arr = updatedItems.map((item) => item.id)
      // Getting each index. filters the id's and gets the unique ones. 
      const filteredArray = arr.filter(function(item, pos){
        return arr.indexOf(item)== pos
      });
      // then filtering through the indexed array and getting a list of items that has the unique id. 
      const uniqueItems = items.filter((item) => filteredArray.includes(item.id))
      // Then set items to the users items which is now filtered and unique
      setDisplayItems(uniqueItems)
    } else {
      setDisplayItems([...items])
    } 
  } 

  // Showing login to see items you have reviewed
  function sortingError() {
    document.getElementById("sortingError").hidden = false
  }


  const itemsArray = displayItems.map((item) => {
    return <ItemCard key={item.id} itemObj={item} />
  })

  return (
    <div>
      <div className="sortItemsButtonDiv">
        <button className='sortItemsButton' onClick={(event) => handleFilter(event)}>
          See items you have reviewed
        </button>
      </div>
      <div className='itemsDiv'>
       {itemsArray}
      </div>
      <div>
        <p id="sortingError" hidden>(Sign in to see items)</p>
      </div>
    </div>
  )
}

export default ItemLister
import React from 'react'
import {Link} from 'react-router-dom' 

import ItemCard from "./ItemCard"

function ItemLister({items}) {

  const itemsArray = items.map((item) => {
    return <ItemCard key={item.id} itemObj={item} />
  })


  return (
    <div>
      <ul>{itemsArray}</ul>
      <button className='sortItemsButton'>See your reviewed items</button>
    </div>
  )
}

export default ItemLister
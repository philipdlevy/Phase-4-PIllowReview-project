import React from 'react'
import {Link} from 'react-router-dom' 

import ItemCard from "./ItemCard"

function ItemLister({items, itemObj}) {
  const {id, name, description, price, image_url} = itemObj
  console.log(itemObj)

  const itemsArray = items.map((item) => {
    return <ItemCard key={item.id} itemObj={item} />
  })


  return (
      <ul>{itemsArray}</ul>
  )
}

export default ItemLister
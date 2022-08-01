import React from 'react'
import {Link} from 'react-router-dom' 

function ItemLister({allItems, itemObj}) {
  const {id, name, description, price, image_url} = itemObj


  // const displayedItems = allItems.map((item) => {
  //   return item
  // })


  return (
    <div className='polaroid' >
      <img src={image_url} style={{width:"98%"}}/>
      <p>{name}</p>
      <button>
        Delete
      </button>
        <button>
          More Info
        </button>
    </div>
  )
}

export default ItemLister
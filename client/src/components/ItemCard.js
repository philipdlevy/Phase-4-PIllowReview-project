import React from 'react'
import {Link} from 'react-router-dom'

function ItemCard({itemObj}) {
  const {id, name, description, price, image_url} = itemObj


  return (
    <div className='polaroid'>
      <img className='imgSize' src={image_url}></img>
      <h3 className='underline'>{name}</h3>
      <p>Price: {price}</p>
      <Link to="/items/:id">
        <button>See more details</button>
      </Link>
    </div>
  )
}

export default ItemCard
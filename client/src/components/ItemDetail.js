import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"

function ItemDetail({items, itemObj}) {
  console.log("items", items)
  const [pickedItem, setPickedItem] = useState({
    name: "", 
    price: 0, 
    description: "", 
    image_url: ""
  })
  console.log("pickedItem", pickedItem)

  const history = useHistory();

  let {id} = useParams();

  // useEffect(() => {
  //   const item = items.find((foundItem => foundItem.id == id))
  //   .then(resp => {
  //     if (resp.ok) {
  //       return resp.json()
  //     }
  //   })
  //   .then(foundItem => {
  //     setPickedItem(foundItem)
  //   })
  // })

  useEffect(() => {
    const item = items.find((foundItem => foundItem.id == id))
    console.log("item", item)
    if (item) {
      setPickedItem(item)
    } else {
      setPickedItem({
        name: "", 
        price: 0, 
        description: "", 
        image_url: ""
      })
    }
  }, [items])

  const {name, description, price, image_url} = pickedItem

  return (
    <div className='polaroid'>
    <img className='imgSize' src={image_url}></img>
    <h3 className='underline'>{name}</h3>
    <p><strong>Price:</strong> {price}</p>
    <p><strong>Description:</strong> 
      <br></br>
      {description}
      </p>
  </div>
  )
}

export default ItemDetail

import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"

import EditItem from "./EditItem"

function ItemDetail({items, setItems, toggleItems, setToggleItems, onDeleteItem}) {
  const [editing, setEditing] = useState(false)
  const [pickedItem, setPickedItem] = useState({
    name: "", 
    price: 0, 
    description: "", 
    image_url: "", 
    reviews: []
  })

  const history = useHistory();

  let {id} = useParams();

  useEffect(() => {
    const item = items.find((foundItem => foundItem.id == id))
    if (item) {
      setPickedItem(item)
      // console.log(item)
    } else {
      setPickedItem({
        name: "", 
        price: 0, 
        description: "", 
        image_url: "", 
        reviews: []
      })
    }
  }, [items, toggleItems])




  const {name, description, price, image_url} = pickedItem
  console.log("pickedItem", pickedItem)
    const itemReviews = pickedItem.reviews.map((review) => {
      return <li>{review.title}</li>
    })


    function handleDelete() {
      fetch(`items/${id}`, {
        method: "DELETE"
      })
      .then((resp) => resp.json())
      .then(() => {
        onDeleteItem(id)
        history.push("/items")
      })
      .catch((error) => alert(error))
    }


  if (editing) {
    return <EditItem pickedItem={pickedItem} setEditing={setEditing} toggleItems={toggleItems} setToggleItems={setToggleItems} setPickedItem={setPickedItem} />
  } else {
    return (
      <>
        <div className='polaroidDetail'>
          <img className='imgSize' src={image_url}></img>
          <h3 className='underline'>{name}</h3>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Description:</strong> 
            <br></br>
            {description}
          </p>
            <button onClick={() => history.push("/items")}>
              Back
            </button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
        <div className="hr">
          <h2 className="reviewPlacement"><strong>Reviews</strong></h2>
          {itemReviews}
        </div>
      </>
    )
  }
}

export default ItemDetail

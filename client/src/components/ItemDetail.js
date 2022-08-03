import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"

function ItemDetail({items}) {
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
  }, [items])

  // console.log("pickedItem", pickedItem)
  // const itemReviews = pickedItem.map((review) => {
  //   return <li>{review.title}</li>
  // })

  const {name, description, price, image_url, reviews} = pickedItem
  console.log("pickedItem", pickedItem.reviews)
    const itemReviews = pickedItem.reviews.map((review) => {
      return <li>{review.title}</li>
    })

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
      </div>
      <div className="hr">
        <h2 className="reviewPlacement"><strong>Reviews</strong></h2>
        {itemReviews}
      </div>
    </>
  )
}

export default ItemDetail

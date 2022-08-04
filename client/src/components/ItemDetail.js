import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"

import EditItem from "./EditItem"


function ItemDetail({items, setItems, reviews, setReviews, toggleItems, setToggleItems, onDeleteItem}) {
  const [titleData, setTitleData] = useState("")
  const [bodyData, setBodyData] = useState("")
  const [ratingData, setRatingData] = useState(0)

  const [editing, setEditing] = useState(false)
  const [pickedItem, setPickedItem] = useState({
    name: "", 
    price: 0, 
    description: "", 
    image_url: "", 
    reviews: []
  })


  //Creating a review
  function handleSubmit(e) {
    e.preventDefault(); 

    const newReviewData = {
      title: titleData, 
      body: bodyData,
      rating: ratingData
    };

    fetch("/reviews", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newReviewData), 
    })
    .then((resp) => resp.json())
    .then((reviewData) => {
      setReviews([...reviews, reviewData])
    })
    .catch((error) => alert(error));
  } 

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
    // getting reviews for item and displaying them
    const itemReviews = pickedItem.reviews.map((review) => {
      return <p><strong>Username: </strong>{review.reviewUsername} 
        <li>
          <strong>Title: </strong>{review.title}
          <p>{review.body}</p>
          <li>Rating: {review.rating} out of 5</li>
        </li>
      </p>
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

    // Getting review form
    function addReviewForm() {
      document.getElementById("addReviewForm").hidden = false
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
            <button onClick={() => addReviewForm()}>Add Review</button>
        </div>
        <div className="hr">
          <h2 className="reviewPlacement"><strong>Reviews</strong></h2>
          {itemReviews}
        </div>

        <div id="addReviewForm" hidden>
          <form style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
            <label><strong>Title</strong></label>
            <input 
            // className='formLook, inputcolor'
            value={titleData}
            type="text" 
            name="title"
            onChange={(e) => setTitleData(e.target.value)}
            /><br/>
            <label><strong>Body</strong></label>
            <input 
            // className='formLook, inputcolor'
            value={bodyData}
            type="text" 
            name="body"
            onChange={(e) => setBodyData(e.target.value)}
            /><br/>
            <button onClick={handleSubmit} type="submit"></button>
          </form>
        </div>
      </>
    )
  }
}

export default ItemDetail

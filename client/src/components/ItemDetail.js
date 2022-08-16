import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"

import EditItem from "./EditItem"


function ItemDetail({items, setItems, onDeleteItem, user}) {
  const [titleData, setTitleData] = useState("")
  const [bodyData, setBodyData] = useState("")
  const [ratingData, setRatingData] = useState("")

  const [editing, setEditing] = useState(false)
  const [pickedItem, setPickedItem] = useState({
    name: "", 
    price: 0, 
    description: "", 
    image_url: "", 
    reviews: []
  })

  let {id} = useParams();
  const history = useHistory();




  // Used for selecting a specific item and displaying it
  useEffect(() => {
    const item = items.find((foundItem => foundItem.id == id))
    if (item) {
      setPickedItem(item)
      
    } else {
      setPickedItem({
        name: "", 
        price: 0, 
        description: "", 
        image_url: "", 
        reviews: []
      })
    }
  }, [id, items])

  //Creating a review
  function handleReviewSubmit(e) {
    e.preventDefault(); 
    
    if (titleData.trim() === "" || bodyData.trim() === "" || ratingData.trim === "") {
      return alert("Missing Data")   
    }
    
    const newReviewData = {
      title: titleData, 
      body: bodyData,
      rating: ratingData
    };
    

    fetch(`/items/${id}/reviews`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newReviewData), 
    })
    .then((resp) => resp.json())
    .then((newReview) => {
      // const itemReviews = pickedItem.reviews
      pickedItem.reviews.push(newReview)
      setPickedItem({...pickedItem})

      document.getElementById("addReviewForm").hidden = true
      // Settign form back to blank
      setTitleData("")
      setBodyData("")
      setRatingData("")
    })
    .catch((error) => alert(error));
  } 

  const {name, description, price, image_url} = pickedItem

  function handleDeleteReview(event, id) {
    fetch(`/reviews/${id}`, {
      method: "DELETE"
    })
    .then(() => {

      // First way of deleting and updating state
      // const newReviewsArray = pickedItem.reviews.filter(review => review.id != id)
      // setPickedItem({...pickedItem, reviews: newReviewsArray})

      // Second way to write it
      pickedItem.reviews = pickedItem.reviews.filter(review => review.id != id)
      setPickedItem({...pickedItem})

      // 3rd way to write it 
      // const newValuesArray = pickedItem.reviews.filter(review => review.id != id)
      // pickedItem.reviews = newValuesArray
      // setPickedItem({...pickedItem})
    })
    .catch((error) => alert(error))
  }

  
  // getting reviews for item and displaying them
    const itemReviews = pickedItem.reviews.map((review) => {
      return <div className="reviewcontainer" key={review.id}> 
          <div><strong>Username: </strong>{review.user.username} 
            <p><strong>Rating: </strong>{review.rating} out of 5: <strong>{review.title}</strong></p>
            <p>{review.body}</p>
          </div>
          <button onClick={(event) => handleDeleteReview(event, review.id)}>Delete</button>
        </div>
    })


    // Deleting an item
    function handleDeleteItem() {
      fetch(`/items/${id}`, {
        method: "DELETE"
      })
      .then(() => {
        onDeleteItem(id)
        history.push("/items")
      })
      .catch((error) => alert(error))
    }


    // callback function for updating item
    function onUpdateItem(UpdatedItemData) {
      const itemToUpdate = items.find(item => item.id == pickedItem.id)
      // Old way to update //
      // setPickedItem({...itemToUpdate, ...UpdatedItemData})
      // New way to update //
      const updatedItem = {...itemToUpdate, ...UpdatedItemData}
      setPickedItem({...updatedItem})

      // This is updating the items state in app
      // const index = items.findIndex(item => item.id == updatedItem.id)
      // items[index] = {...updatedItem}
      // setItems([...items])

      items = items.map(item => {
        if (item.id == updatedItem.id) {
          return {...updatedItem}
        }
        return item
      })
      setItems([...items])

      // const index = items.findIndex(item => item.id == updatedItem.id)

      // const updatedItem = {...items[index], ...UpdatedItemData}
      // setPickedItem({...updatedItem})

      // items[index] = updatedItem
      // setItems([...items])
    }

    // Showing the review form, based on being signed in
    function addReviewForm() {
      user ? document.getElementById("addReviewForm").hidden = false :
      document.getElementById("signInToLeaveReview").hidden = false
    }

  if (editing) {
    return <EditItem pickedItem={pickedItem} setEditing={setEditing} setPickedItem={setPickedItem} onUpdateItem={onUpdateItem}/>
  } else {
    return (
      <div>
        <div className='polaroidDetail'>
          <img className='imgSize' src={image_url}></img>
          <h3 className='underline'>{name}</h3>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Description:</strong> 
            {description}
          </p>
            <button onClick={() => history.push("/items")}>
              Back
            </button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => handleDeleteItem()}>Delete</button>
            <button onClick={() => addReviewForm()}>Add Review</button>
        </div>
        <div className="hr">
          <h2 className="reviewPlacement"><strong>Reviews</strong></h2>
          {itemReviews}
        </div>

        {/* The review Form */}
        <div id="addReviewForm" hidden>
          <form className="reviewForm">
            <h4>Add a review</h4>
            <label><strong>Title</strong></label>
            <input 
            value={titleData}
            type="text" 
            name="title"
            onChange={(e) => setTitleData(e.target.value)}
            /><br/>
            <label><strong>Rating: 1 out of 5</strong></label>
            <input 
            value={ratingData}
            type="text" 
            name="rating"
            onChange={(e) => setRatingData(e.target.value)}/>
            <br></br>
            <label><strong>Body: (150 characters maximum)</strong></label>
            <textarea maxLength={150} className="bodyReviewForm"
            value={bodyData}
            type="text" 
            name="body"
            onChange={(e) => setBodyData(e.target.value)}
            /><br/>
            <button onClick={(e) => handleReviewSubmit(e)} type="submit">Create Review</button> 
          </form>
        </div>


        {/* Can't leave review without signing in error */}
        <div id="signInToLeaveReview" hidden>
          <div className="alert-heading">
          </div>
          <div className="inner-msg">
            <p>Please sign in or create account to leave a review</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetail



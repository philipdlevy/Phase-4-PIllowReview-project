import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"

import EditItem from "./EditItem"


function ItemDetail({items, setItems, toggleItems, setToggleItems, onDeleteItem}) {
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

  const history = useHistory();

  //Creating a review
  function handleSubmit(e) {
    e.preventDefault(); 

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
    .then((itemReviewData) => {
      // debugger
      console.log("itemReviewData", itemReviewData)
      // setPickedItem({...pickedItem, reviews: "itemReviewData"})
      setPickedItem({...pickedItem, reviews: {
        ...pickedItem.reviews, 
        reviews: itemReviewData
        //  itemReviewData
      }})
    })
    .catch((error) => alert(error));
  } 

  // function onUpdateItemReviews(UpdatedItemData) {
  //   const itemToUpdate = items.find(item => item.id == pickedItem.id)
  //   setPickedItem({...itemReviewData, ...UpdatedItemData})
  // }

  let {id} = useParams();

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
  }, [items, toggleItems])


  // function onDeleteReview(id) {
  //   const updatedReviewArray = pickedItem.reviews.filter(review => review.id != parseInt(id))
  //   setPickedItem(updatedReviewArray)
  // }

  function handleDeleteReview() {
    fetch(`/items/${id}/reviews/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      // onDeleteReview(id)
      debugger
      // const item = items.find((foundItem => foundItem.id == id))
      // console.log(item)
      const updatedReviewArray = pickedItem.reviews.filter(review => review.id != parseInt(id))
      setPickedItem(updatedReviewArray)
    })
    .catch((error) => alert(error))
  }


  const {name, description, price, image_url} = pickedItem

    // getting reviews for item and displaying them
    const itemReviews = pickedItem.reviews.map((review) => {
      return <div className="reviewcontainer" key={review.id}> 
        <div><strong>Username: </strong>{review.user.username} 
            <p><strong>Rating: </strong>{review.rating} out of 5: <strong>{review.title}</strong></p>
            <p>{review.body}</p>
        </div>
        <button onClick={() => handleDeleteReview()}>Delete</button>
      </div>
    })

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
      setPickedItem({...itemToUpdate, ...UpdatedItemData})
    }

    // Getting review form
    function addReviewForm() {
      document.getElementById("addReviewForm").hidden = false
    }

  if (editing) {
    return <EditItem pickedItem={pickedItem} setEditing={setEditing} setPickedItem={setPickedItem} onUpdateItem={onUpdateItem}/>
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
            <button onClick={() => handleDeleteItem()}>Delete</button>
            <button onClick={() => addReviewForm()}>Add Review</button>
        </div>
        <div className="hr">
          <h2 className="reviewPlacement"><strong>Reviews</strong></h2>
          {itemReviews}
        </div>

        {/* Adding a review Form */}
        <div id="addReviewForm" hidden>
          <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
            <label><strong>Title</strong></label>
            <input 
            value={titleData}
            type="text" 
            name="title"
            onChange={(e) => setTitleData(e.target.value)}
            /><br/>
            <label><strong>Body</strong></label>
            <input 
            value={bodyData}
            type="text" 
            name="body"
            onChange={(e) => setBodyData(e.target.value)}
            /><br/>
            <label><strong>Rating: 1 out of 5</strong></label>
            <input 
            value={ratingData}
            type="text" 
            name="rating"
            onChange={(e) => setRatingData(e.target.value)}
            /><br/>
            <input type="submit"></input>
          </form>
        </div>
      </>
    )
  }
}

export default ItemDetail



// const updated = {
//   ...user, 
//   department: {
//       ...user.department, 
//       'number': 7
//   }
// };

// return { 
//   ...state, 
//   loginForm: {
//       ...state.loginForm,
//       email: action.payload.email
//   } 
// }
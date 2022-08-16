import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function AddItem({items, setItems, user}) {
  const [nameData, setNameData] = useState("")
  const [priceData, setPriceData] = useState("")
  const [descriptionData, setDescriptionData] = useState("")
  const [image_urlData, setImage_urlData] = useState("")

  const history = useHistory();

  const backupImg = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"



    function handleSubmit(e) {
      e.preventDefault(); 

      if (nameData.trim() === "" || priceData.trim() === "" || descriptionData.trim === "") {
        return alert("Missing Data")   
      }
      if (descriptionData.length < 25) {
        return alert("Description must be 25 characters or more")
      }

      const newItemData = {
        name: nameData, 
        price: priceData, 
        description: descriptionData, 
        image_url: image_urlData || backupImg
      };

      if (user) {
        fetch("/items", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify(newItemData), 
        })
        .then((resp) => resp.json())
        .then((itemData) => {
          setItems([...items, itemData])
          history.push("/items")
        })
        .catch((error) => alert(error));
      } else {
        return alert("must sign in to create an item")
      }
    }


  return (
    <div>
      <h1 className='additemStyling'>Add a new item</h1>

      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
        <label><strong>Item name</strong></label>
        <input 
        className='formLook, inputcolor'
        value={nameData}
        type="text" 
        name="title"
        onChange={(e) => setNameData(e.target.value)}
        /><br/>
        <label><strong>Price</strong></label>
        <input 
        className='formLook, inputcolor'
        value={priceData}
        type="text" 
        name="price"
        onChange={(e) => setPriceData(e.target.value)}
        /><br/>
        <label><strong>Description: (Minimum 25 Characters)</strong></label>
        <input 
        className='formLook, inputcolor'
        value={descriptionData}
        type="text" 
        name="description"
        onChange={(e) => setDescriptionData(e.target.value)}
        /><br/>
        <label><strong>Image URL</strong></label>
        <input 
        className='formLook, inputcolor'
        value={image_urlData}
        type="text" 
        name="price"
        onChange={(e) => setImage_urlData(e.target.value)}
        /><br/>
        <input type="submit"  className='formLook'></input>
      </form>
    </div>
  )
}

export default AddItem


// var filteredArray = arr.filter(function(item, pos){
//   return arr.indexOf(item)== pos; 
// });
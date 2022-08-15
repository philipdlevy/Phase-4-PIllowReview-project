import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"

function EditItem({pickedItem, setEditing, onUpdateItem}) {
  const [nameData, setNameData] = useState(pickedItem.name)
  const [priceData, setPriceData] = useState(pickedItem.price)
  const [descriptionData, setDescriptionData] = useState(pickedItem.description)
  const [image_urlData, setImage_urlData] = useState(pickedItem.image_url)

  const history = useHistory();

  const backupImg = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"

  function handleSubmit(e) {
    e.preventDefault()

    const UpdatedItemData = {
      name: nameData, 
      price: priceData, 
      description: descriptionData, 
      image_url: image_urlData || backupImg
    };

    if (nameData.trim() === "" || priceData.trim() === "" || descriptionData.trim === "") {
      return alert("Missing Data")   
    }
    if (descriptionData.length < 25) {
      return alert("Description must be 25 characters or more")
    }

    fetch(`/items/${pickedItem.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(UpdatedItemData),
    })
    .then((resp) => resp.json())
    .then(() => {
      setEditing(false)
      onUpdateItem(UpdatedItemData)
    })
    .catch((error) => alert(error));
  }


  return (
    <div>
      <h1 className='additemStyling'>Edit book</h1>

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

export default EditItem

import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function AddItem({items, setItems}) {
  const [nameData, setNameData] = useState("")
  const [priceData, setPriceData] = useState("")
  const [descriptionData, setDescriptionData] = useState("")
  const [image_urlData, setImage_urlData] = useState("")


  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault(); 

    const newItemData = {
      name: nameData, 
      price: priceData, 
      description: descriptionData, 
      image_url: image_urlData
    };

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
        <label><strong>Description</strong></label>
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
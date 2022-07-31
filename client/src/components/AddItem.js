import React from 'react'

function AddItem() {
  return (
    <div>
      <h1 className='additemStyling'>Add a new item</h1>

      <form style={{display:"flex", flexDirection:"column", width:"400px", margin:"auto"}}>
        <label><strong>Item name</strong></label>
        <input 
        className='formLook, inputcolor'
        // value={titleData}
        type="text" 
        name="title"
        // onChange={(e) => setTitleData(e.target.value)}
        /><br/>
        <label><strong>Price</strong></label>
        <input 
        className='formLook, inputcolor'
        // value={authorData}
        type="text" 
        name="price"
        // onChange={(e) => setAuthorData(e.target.value)}
        /><br/>
        <label><strong>Description</strong></label>
        <input 
        className='formLook, inputcolor'
        // value={descriptionData}
        type="text" 
        name="description"
        // onChange={(e) => setDescriptionData(e.target.value)}
        /><br/>
        <label><strong>Image URL</strong></label>
        <input 
        className='formLook, inputcolor'
        // value={priceData}
        type="text" 
        name="price"
        // onChange={(e) => setPriceData(e.target.value)}
        /><br/>
        <input type="submit"  className='formLook'></input>
      </form>
    </div>
  )
}

export default AddItem
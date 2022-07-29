import React from 'react'

function AddItem() {
  return (
    <div>
      <h1 className='fontcolor, addBookStyling'>Add a new book</h1>

      <form style={{display:"flex", flexDirection:"column", width:"400px", margin:"auto"}}>
        <label className='fontcolor'>Title</label>
        <input 
        className='formLook'
        // value={titleData}
        type="text" 
        name="title"
        // onChange={(e) => setTitleData(e.target.value)}
        /><br/>
        <label className='fontcolor'>Author</label>
        <input 
        className='formLook'
        // value={authorData}
        type="text" 
        name="author_name"
        // onChange={(e) => setAuthorData(e.target.value)}
        /><br/>
        <label className='fontcolor'>Description</label>
        <input 
        className='formLook'
        // value={descriptionData}
        type="text" 
        name="description"
        // onChange={(e) => setDescriptionData(e.target.value)}
        /><br/>
        <label className='fontcolor'>Price</label>
        <input 
        className='formLook'
        // value={priceData}
        type="text" 
        name="price"
        // onChange={(e) => setPriceData(e.target.value)}
        /><br/>
        <label className='fontcolor'>Pages</label>
        <input 
        className='formLook'
        // value={pagesData}
        type="text" 
        name="pages"
        // onChange={(e) => setPagesData(e.target.value)}
        /><br/>
        <input type="submit" className='formLook'></input>
      </form>
    </div>
  )
}

export default AddItem
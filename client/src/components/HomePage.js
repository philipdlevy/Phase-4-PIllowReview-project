import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return ( 

  <div>
    <div>
      <p className='homepageText'>Pillow reviews</p>
    </div>
    <div className='buttonContainer'>
      <Link to="/items">
        <button className='homepageButton1'>See All Items</button>
      </Link>
      <Link to="/login">
        <button className='homepageButton2'>Login or Create Account</button>
      </Link>
    </div>
  </div>
  )
}

export default HomePage





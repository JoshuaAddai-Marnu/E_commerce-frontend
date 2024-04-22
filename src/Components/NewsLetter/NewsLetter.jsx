import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers In Your Email</h1>
        <p>Subscribe to our newsletter and get updated</p>
        <div>
            <input type="email" placeholder='Your email id'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

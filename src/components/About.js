import React from 'react'

const About = (props) => {
  return (
    <div className='Container' style={{  color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>
      <h1>I am in about</h1>
    </div>
  )
}

export default About

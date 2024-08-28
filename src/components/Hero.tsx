import React from 'react'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='w-[60%] mx-auto'>
        <p className='text-4xl text-center mb-[50px] pt-[80px] text-[#00cc6a]'>Events</p>
        <p className='text-4xl text-center mb-[100px]'>Enroll in any event which suits you</p>
        <img 
          src="background-separator-arrow.svg" 
          alt="separator arrow" 
          width="80" 
          height="100"
          className='mx-auto' 
          />
      </div>
    </div>
  )
}

export default Hero
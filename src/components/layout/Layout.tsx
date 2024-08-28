import React from 'react'
import Navbar from '../Navbar'

const Layout = ({children}:any) => {
  return (
    <div>
        <Navbar />
        <div className='layout-children-container'>{children}</div>
    </div>
  )
}

export default Layout
import React from 'react'
import { navList } from '../constants'
import { cn } from '../lib/utils'



const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-subcontainer'>
        <a href='/'>
          <p className='text-3xl text-gray-800 cursor-pointer'>
            SharePoint <span className='font-semibold text-black'>| sapiens</span>
          </p>
        </a>
        <div className='flex gap-5 items-center'>
          <nav className='flex gap-5 '>
            {navList.map((list) => (
              <p key={list} className={cn('text-xl font-medium cursor-pointer', { "text-[#00cc6a]": list === "Events" })}>
                {list === "Events" ? (
                  <a href='/events'>{list}</a>
                ) : list}
              </p>
            ))}
          </nav>
          <button className='bg-[#00cc6a] font-medium rounded-xl w-[180px] h-[40px]'>Request Live Demo</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
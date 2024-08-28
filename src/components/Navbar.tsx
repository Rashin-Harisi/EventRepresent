import React from 'react'
import { navList } from '../constants'
import { cn } from '../lib/utils'
import MobileNav from './MobileNav'



const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-subcontainer'>
        <a href='/'>
          <p className='text-xl lg:text-2xl text-gray-800 cursor-pointer'>
            SharePoint <span className='font-semibold text-black'>| sapiens</span>
          </p>
        </a>
        <div className='flex gap-2 items-center max-md:hidden'>
          <nav className='flex gap-2 xl:gap-5 '>
            {navList.map((list) => (
              <p key={list} className={cn('text-base lg:text-lg font-medium cursor-pointer', { "text-[#00cc6a]": list === "Events" })}>
                {list === "Events" ? (
                  <a href='/events'>{list}</a>
                ) : list}
              </p>
            ))}
          </nav>
          <button className='hidden lg:block bg-[#00cc6a] font-medium rounded-xl w-[180px] h-[40px]'>Request Live Demo</button>
        </div>
        <MobileNav />
      </div>
    </div>
  )
}

export default Navbar
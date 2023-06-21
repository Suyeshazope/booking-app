import React, { useContext } from 'react' ;
import { BiSearchAlt } from 'react-icons/bi' ;
import { GiHamburgerMenu } from 'react-icons/gi' ;
import { FaUser } from 'react-icons/fa' ;
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const {user} = useContext(UserContext) ;
  return (
    <div>
      <header className='flex justify-between'>
        <Link to={'/'} className='flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-68 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className='font-bold text-xl'>airFun</span>
        </Link>
        <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
          <div>Anywhere</div>
          <div className='border-l border-gray-300'></div>
          <div>Any week</div>
          <div className='border-l border-gray-300'></div>
          <div>Add guests</div>
          <button className='bg-primary text-white p-2 rounded-full'>
            <BiSearchAlt className='w-3 h-3'/>
          </button>
        </div>
        <Link to={user?'/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
          <GiHamburgerMenu size='1.5rem'/>
          <div className='bg-gray-500 text-white rounded-full p-1'>
            <FaUser size='1.2rem' className='relative top-1'/>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </header>
    </div>
  )
}

export default Header

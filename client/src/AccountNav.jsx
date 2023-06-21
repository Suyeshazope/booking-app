import React from 'react' ;
import { HiUser } from 'react-icons/hi' ;
import { GoChecklist } from 'react-icons/go' ;
import { FaHome } from 'react-icons/fa' ;
import { Link, useLocation } from 'react-router-dom';

function AccountNav() {
    const {pathname} = useLocation() ;
    let subpage = pathname.split('/')?.[2] ;
    if(subpage === undefined){
        subpage = 'profile' ;
    }
    function linkClasses (type=null) {
       let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        if (type === subpage) {
          classes += ' bg-primary text-white';
        }
        else {
          classes += ' bg-gray-200';
        }
        return classes;
    }
  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
            <Link className={linkClasses('profile')} to={'/account'}>
                <HiUser className='mt-1'/>
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <GoChecklist className='mt-1'/>
                My bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <FaHome className='mt-1'/>
                My Accommodations
            </Link>
           </nav>
    </div>
  )
}

export default AccountNav

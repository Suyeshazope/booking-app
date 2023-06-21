import React from 'react' ;
import { MdOutlineLocationOn } from 'react-icons/md';

function AddressLink({place}) {
  return (
    <div>
      <a className='flex gap-2 my-3 font-semibold underline' target='_blank' href={'https://maps.google.com/?q=' + place.address}>
        <MdOutlineLocationOn className='mt-1' />
        {place.address}
      </a>
    </div>
  )
}

export default AddressLink

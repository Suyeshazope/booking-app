import React, { useEffect, useState } from 'react' ;
import { Link} from 'react-router-dom' ;
import { AiOutlinePlus } from 'react-icons/ai' ;
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';

function PlacesPage() {
  const [places , setPlaces] = useState([]) ;
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data) ;
    }) ;
  } , []) ;

  return (
    <div>
      <AccountNav />
        <div className='text-center '>
            <Link className='inline-flex bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <AiOutlinePlus className='mt-1 mr-2'/> 
                Add new place
            </Link>
        </div>
        <div className='mt-4 flex flex-col gap-2'>
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-3 rounded-2xl'>
              <div className='flex w-32 h-32 bg-gray-300 grow shrink-0'>
                <PlaceImg place={place}/>
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default PlacesPage

import React, { useEffect, useState } from 'react';
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';

import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
            <div className='w-48'>
              <PlaceImg place={booking.place} />
            </div>
            <div className='py-3 pr-3 grow'>
              <h2 className='text-xl'>{booking.place.title}</h2>

              <div className='font-bold'>
                <BookingDates booking={booking} className='mt-4 text-gray-500'/>
                <div className='flex gap-1'>
                  <GiCash className='mt-1' />
                  Total Price : ${booking.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage

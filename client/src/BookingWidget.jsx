import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom' ;
import { differenceInCalendarDays } from 'date-fns' ;
import axios from 'axios' ;
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function BookingWidget({place}) {
    const [checkIn , setCheckIn] = useState('') ;
    const [checkOut , setCheckOut] = useState('') ;
    const [numberOfGuests , setNumberOfGuests] = useState(1) ;
    const [name , setName] = useState('') ;
    const [mobile , setMobile] = useState('') ;
    const [redirect , setRedirect] = useState('') ;
    const {user} = useContext(UserContext) ;

    useEffect(() => {
        if(user){
            setName(user.name) ;
        }
    } , [user]) ;

    let numberOfDays = 0 ;
    if(checkIn , checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn)) ;
    }

    async function bookThisPlace() { 
        const response = await axios.post('/bookings' , {checkIn , checkOut , numberOfGuests , name , mobile ,
            place : place._id , 
            price : numberOfDays * place.price ,
        }) ;   
        const bookingId = response.data._id ;
        setRedirect(`/account/bookings/${bookingId}`) ;
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price : ${place.price} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='flex'>
                    <div className='py-3 px-4'>
                        <label>Check in : </label>
                        <input type='date' value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                    </div>
                    <div className='py-3 px-4 border-l'>
                        <label>Check out : </label>
                        <input type='date' value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                    </div>
                </div>
                <div className='py-3 px-4 border-t'>
                    <label>Number of guests : </label>
                    <input type='number' value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)}/>
                </div>
                {numberOfDays > 0 && (
                    <div className='py-3 px-4 border-t'>
                        <label>Full name : </label>
                        <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                        <label>Mobile No. : </label>
                        <input type='tel' value={mobile} onChange={e => setMobile(e.target.value)}/>
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className='primary mt-2'>
                Book this Place 
                {numberOfDays > 0 && (
                    <span> ${numberOfDays * place.price}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget

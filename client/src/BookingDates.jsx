import React from 'react' ;
import format from 'date-fns/format';
import { differenceInCalendarDays } from 'date-fns';
import { FcCalendar } from 'react-icons/fc';
import { RxMoon } from 'react-icons/rx';

function BookingDates({booking , className}) {
    return (
        <div className={'flex gap-1 mb-2'+className}>
            <RxMoon className='mt-1' />
            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights :
            <div className='flex gap-1 items-center ml-2'>
                <FcCalendar className='mt-1' />{format(new Date(booking.checkIn), 'yyyy-MM-dd')}
            </div>
            &rarr;
            <div className='flex gap-1 items-center'>
                <FcCalendar className='mt-1' />{format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
        </div>
    )
}

export default BookingDates

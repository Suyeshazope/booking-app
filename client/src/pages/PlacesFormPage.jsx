import React, { useEffect, useState } from 'react';
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import axios from 'axios' ;
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

function PlacesFormPage() {
    const {id} = useParams() ;
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price , setPrice] = useState(100) ;
    const [redirect , setRedirect] = useState(false) ;

    useEffect(() => {
        if(!id){
            return ;
        }
        axios.get('/places/' + id).then(response => {
            const {data} = response ;
            setTitle(data.title) ;
            setAddress(data.address) ;
            setAddedPhotos(data.photos) ;
            setDescription(data.description) ;
            setPerks(data.perks) ;
            setExtraInfo(data.extraInfo) ;
            setCheckIn(data.checkIn) ;
            setCheckOut(data.checkOut) ;
            setMaxGuests(data.maxGuests) ;
            setPrice(data.price) ;
        }) ;
    } , [id])

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, decription) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(decription)}
            </>
        );
    }

    async function savePlace(e) {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests , price
        }
        if(id){
            await axios.put('/places', { 
                id , ...placeData
            });
            setRedirect(true) ;
        }
        else{
            await axios.post('/places', placeData);
            setRedirect(true) ;  
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place should be small and catchy')}
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='title' />
                {preInput('Address', 'Address to this place')}
                <input type='text' value={address} onChange={e => setAddress(e.target.value)} placeholder='address' />
                {preInput('Photos', 'The more , the better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Descripe the place more...')}
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                {preInput('Perks', 'Select according to your convenience..')}
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info', 'Anything you want to add more...')}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                {preInput('Check in && out time', 'Enter yout dates to book rooms...')}
                <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                    <div className='mt-2 -mb-1'>
                        <h3>Check in time</h3>
                        <input type='text' value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='00:00' />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Check out time</h3>
                        <input type='text' value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='00:00' />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Max no. of guests</h3>
                        <input type='number' value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder='0 , 1 , .....' />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Price per Night</h3>
                        <input type='number' value={price} onChange={e => setPrice(e.target.value)} placeholder='0 , 1 , .....' />
                    </div>
                </div>
                <div>
                    <button className='primary my-4'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage

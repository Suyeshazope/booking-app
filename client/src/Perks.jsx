import React from 'react' ;
import { FaCarSide , FaDog } from 'react-icons/fa';
import { GiEntryDoor } from 'react-icons/gi';
import { AiOutlineWifi } from 'react-icons/ai' ;
import { MdMonitor , MdFastfood} from 'react-icons/md' ;

function Perks({selected , onChange}) {
  function handleCbClick(e){
    const {checked , name} = e.target ;
    if(checked){
      onChange([...selected , name]) ;
    }
    else{
      onChange([...selected.filter(selectedName => selectedName !== name)]) ;
    }
  }
  return (
    <>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input type='checkbox' checked={selected.includes('wifi')} name='wifi' onChange={handleCbClick}/>
        <AiOutlineWifi />
        <span>Wifi</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input type='checkbox' checked={selected.includes('parking')} name='parking' onChange={handleCbClick}/>
        <FaCarSide />
        <span>Free parking</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input type='checkbox' checked={selected.includes('tv')} name='tv' onChange={handleCbClick}/>
        <MdMonitor />
        <span>TV</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input type='checkbox' checked={selected.includes('pets')} name='pets' onChange={handleCbClick}/>
        <FaDog />
        <span>Pets allowed</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input type='checkbox' checked={selected.includes('food')} name='food' onChange={handleCbClick}/>
        <MdFastfood />
        <span>Free breakfast</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input type='checkbox' checked={selected.includes('entrance')} name='entrance' onChange={handleCbClick}/>
        <GiEntryDoor />
        <span>Private entrance</span>
      </label>
    </>
  )
}

export default Perks

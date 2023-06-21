import React  , {useState} from 'react' ;
import { MdClose } from 'react-icons/md';
import { RiLayout2Fill } from 'react-icons/ri';

function PlaceGallery({place}) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
          <div className='absolute inset-0 bg-black text-white min-h-screen'>
            <div className='bg-black p-8 grid gap-4'>
              <div>
                <h2 className='text-3xl'>Photos of {place.title}</h2>
                <button onClick={() => setShowAllPhotos(false)} className='fixed right-12 top-40 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white bg-opacity-80 text-black'>
                  <MdClose className='mt-1' />
                  Close Photos
                </button>
              </div>
              {place?.photos?.length > 0 && place.photos.map(photo => (
                <div>
                  <img src={'http://localhost:3000/uploads/' + photo} alt='' />
                </div>
              ))}
            </div>
          </div>
        )
      }

  return (
      <div className='relative'>
        <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden'>
          <div>
            {place.photos?.[0] && (
              <div>
                <img onClick={() => setShowAllPhotos(true)} className='aspect-square cursor-pointer object-cover' src={'http://localhost:3000/uploads/' + place.photos[0]} />
              </div>
            )}
          </div>
          <div className='grid'>
            {place.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)} className='aspect-square cursor-pointer object-cover' src={'http://localhost:3000/uploads/' + place.photos[1]} />
            )}
            <div className='overflow-hidden'>
              {place.photos?.[2] && (
                <img onClick={() => setShowAllPhotos(true)} className='aspect-square cursor-pointer object-cover relative top-2' src={'http://localhost:3000/uploads/' + place.photos[2]} />
              )}
            </div>
          </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className='flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white bg-opacity-80 rounded-2xl shadow-md shadow-gray-700'>
          <RiLayout2Fill className='mt-1' />
          Show more photos
        </button>
      </div>
  )
}

export default PlaceGallery
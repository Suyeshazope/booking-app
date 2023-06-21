import React , {useState} from 'react' ;
import { MdOutlineCloudUpload } from 'react-icons/md' ;
import { MdDelete } from 'react-icons/md';
import { HiStar , HiOutlineStar} from 'react-icons/hi';

import axios from 'axios';

function PhotosUploader({addedPhotos , onChange}) {
    const [photoLink , setPhotoLink] = useState('') ;
    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    // console.log(action)

    function uploadPhoto(e) {
        const files = e.target.files;
        // console.log({files}) ;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        // data.append('photos' , files) ;
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            // console.log(data);
            onChange(prev => {
                return [...prev, ...filenames];
            });
        })
    }

    function removePhoto(e , filename){
        e.preventDefault() ;
        onChange([...addedPhotos.filter(photo => photo !== filename)]) ;
    }

    function selectAsMainPhoto(e , filename){
        e.preventDefault() ;
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)])
    }

    return (
        <>
            <div className='flex gap-2'>
                <input type='text' value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder={'Add using a link...jpg'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>
            </div>

            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='h-32 flex relative' key={link}>
                        <img className='rounded-2xl w-full object-cover' src={'http://localhost:3000/uploads/' + link} alt='' />
                        <button onClick={(e) => removePhoto(e , link)} className='absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-xl p-1 cursor-pointer'>
                            <MdDelete />
                        </button>
                        <button onClick={(e) => selectAsMainPhoto(e , link)} className='absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-xl p-1 cursor-pointer'>
                            {link === addedPhotos[0] && (
                                <HiStar />
                            )}
                            {link !== addedPhotos[0] && (
                                <HiOutlineStar />
                            )}
                        </button>
                    </div>
                ))}
                <label className='h-32 cursor-pointer flex items-center justify-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                    <input type='file' multiple className='hidden' onChange={uploadPhoto} />
                    <MdOutlineCloudUpload className='mt-1' />
                    Upload
                </label>
            </div>
        </>
    )
}

export default PhotosUploader

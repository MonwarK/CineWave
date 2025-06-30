import { FinishedMedia } from '@/types/FinishedMedia';
import Link from 'next/link';
import Header from '../main/Header';
import SquaredButton from '../ui/SquaredButton';

type Props = {
  finishedMedia: FinishedMedia[];
  mediaType: string;
}

export default function UserWatched({finishedMedia, mediaType} : Props) {

  const moviesWatched = finishedMedia.filter(x => x.is_movie === true);
  const seriesWatched = finishedMedia.filter(x => x.is_movie === false)

  

  if(mediaType === "movies" && moviesWatched.length === 0) {
    return (
      <>
      <Header />
      <div className='pt-20 flex justify-center items-center h-full'>
          <h1 className='text-2xl font-bold'>Start a movie to get started.</h1>
      </div>
      </>
    )
  }

  if(mediaType === "series" &&  seriesWatched.length === 0) {
    return (
      <>
      <Header />
      <div className='pt-20 flex justify-center items-center h-full'>
          <h1 className='text-2xl font-bold'>Start a series to get started.</h1>
      </div>
      </>
    )
  }

  return (
    <>
      {mediaType === "movies" && (
   <div className='grid md:grid-cols-4 grid-cols-2 gap-4 pt-4'>
   {moviesWatched.map((media) => (
     <div key={media.id} className='overflow-hidden w-full'>
      <div className='relative inset-0'>
        <img 
        src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
        className='w-40 object-fill mx-auto'
        />  
        <div className='pt-2 space-y-2 flex flex-col justify-center items-center'>
          <h2>{media.title}</h2>
          <span className='text-center'>{new Date(media.finished_at).getFullYear()}</span>
          <Link href={`/movies/${media.media_id}`}>
          <SquaredButton>
            View Details
          </SquaredButton>
          </Link>
        </div>
      </div>
     </div>
   ))}
 </div>
)}
     
    {mediaType === "series" && (
          <div className='grid md:grid-cols-4 grid-cols-2 gap-4 pt-4'>
          {seriesWatched.map((media) => (
           <div key={media.id} className='overflow-hidden w-full'>
           <div className='relative inset-0'>
             <img 
             src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
             className='w-40 object-fill mx-auto'
             />  
             <div className='pt-2 space-y-2 flex flex-col justify-center items-center'>
               <h2>{media.title}</h2>
               <span className='text-center'>{new Date(media.finished_at).getFullYear()}</span>
               <Link href={`/movies/${media.media_id}`}>
               <SquaredButton>
                 View Details
               </SquaredButton>
               </Link>
             </div>
           </div>
          </div>
          ))}
        </div>
    )}
    </>
  );  
}

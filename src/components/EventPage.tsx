
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { newPrice } from '../lib/utils';
import EmailValidation from './EmailValidation';


const EventPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [event, setEvent] = useState<any>([])
  const [price, setPrice] = useState(0)
  const [enrollClick, setEnrollClick] = useState(false);





  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("https://event-server-delta.vercel.app/events")
        const data = await res.json()
        const result = data.find((event: any) => event.id === id)
        setEvent(result);
        setPrice(newPrice(result.price, result.discount))
      } catch (error) {
        console.log("Error in fetching data!", error)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  return (

    <div className='eventPage'>
      {isLoading && "Loading ..."}
      {event && (
        <>
          <p className='text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-[50px]'>{event.title}</p>
          <div className='w-[95%] mx-auto my-8 flex flex-col lg:flex-row justify-between gap-2 mb-[50px]'>
            <div className='w-full flex justify-center'>
              <img src={`/${event.imageUrl}`} alt=''  className='object-contain'/>
            </div>

            <div className='w-full flex flex-col grow justify-between gap-2'>
              <div className='flex flex-col gap-6'>
                <div className='eventPage-details'>
                  <p className='eventPage-details-key'>Organizer </p>
                  <p className='eventPage-details-value'>{event.organizer}</p>
                </div>
                <div className='eventPage-details'>
                  <p className='eventPage-details-key'>Location </p>
                  <p className='eventPage-details-value'>{event.location}</p>
                </div>
                <div className='eventPage-details'>
                  <p className='eventPage-details-key'>Date </p>
                  <p className='eventPage-details-value'>{event.date}</p>
                </div>
                <div className='eventPage-details'>
                  <p className='eventPage-details-key'>Discount </p>
                  <p className='eventPage-details-value'>{event.discount} %</p>
                </div>
                <div className='eventPage-details'>
                  <p className='eventPage-details-key'>Price</p>
                  <p className='eventPage-details-value'>
                    {event.price === "0" && "Free"}
                    {event.discount === "" && event.price !== "0" && `${event.price} €`}
                    {event.discount !== "" && <p className='text-red-700'>{price} €  <span className='line-through text-black'>{event.price} €</span></p>}
                  </p>
                </div>
              </div>
              <button onClick={() => setEnrollClick(true)}
                className='bg-[#00cc69] rounded-lg h-[40px] text-white text-xl font-medium'>Enroll</button>
            </div>
          </div>
        </>)}
      <EmailValidation isOpen={enrollClick}
        id={id}
        closeModule={() => setEnrollClick(false)} />
    </div>

  )
}

export default EventPage
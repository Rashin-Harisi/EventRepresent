import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import eventData from '../data/eventData'
import Hero from './Hero'
import { Link } from 'react-router-dom'




const Events = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState<EventsProps[]>([])

     useEffect(() => {
         const fetchData = async () => {
             setIsLoading(true)
             try {
                 const res = await fetch("https://event-server-delta.vercel.app/events")
                 const data = await res.json()
                 setEvents(data);
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
        <div className='events'>
            <Hero />
            {isLoading ? "Loading..." :
                events.map((event) => (
                    <div key={event.id} className='cardContainer'>
                        <Link to={`/events/${event.id}`}>
                            <EventCard event={event} />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Events
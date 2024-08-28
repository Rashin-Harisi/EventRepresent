import React, { useEffect, useState } from 'react'
import { newPrice } from '../lib/utils'
import EventCard from './EventCard'
import EventCardAdmin from './EventCardAdmin'

const AdminPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState<any>([])
    const [price, setPrice] = useState(0)

    console.log(events);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch("https://event-server-delta.vercel.app/events")
                const data = await res.json()
                setEvents(data);
                setPrice(newPrice(data.price, data.discount))
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
        <div className='flex flex-wrap gap-5 w-[80%] mx-auto'>
            {isLoading ? "Loading..." : (
                events.map((event: any) => (
                    <div key={event.id} className='w-[320px]'>
                        <EventCardAdmin key={event.id} event={event} />
                    </div>
                ))
            )}
        </div>
    )
}

export default AdminPage
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { newPrice } from '../lib/utils'
import emailjs from '@emailjs/browser';


const UserDetailsForm = () => {
    const [event, setEvent] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [price, setPrice] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")


    const data = useLocation();
    const id = data.state.param1;
    const email= data.state.param2;
    



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

    const paymentHandler = async () => {

        if (!firstName || !lastName || !phone) return alert("Please fill the required field")
        window.open("https://buy.stripe.com/test_fZe6pc3TSfYt8JG000", "_blank")

        ////confirmation of payment is required //////////////////////////  

        try {
            const patchRes = await fetch(`https://event-server-delta.vercel.app/events/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ increase: true }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!patchRes.ok) {
                throw new Error('Failed to update the event.');
            }

            console.log('Event updated successfully');
        } catch (error) {
            console.error('Error during PATCH request:', error);
        }finally{
            const params={
                to_email: email,
                event: event,
            }
            emailjs.send(
                "service_7eq18vy",
                "template_7vs02ig",
                params,
                {
                  publicKey: "pkj_uFd7rkbixauO8",  
                }
            ).then(()=>{
                console.log("SUCCESS")
            },(error)=>{
                console.log("FAILED",error);
            })
        }

    }

    return (
        <div className='eventPage'>
            {isLoading ? "Loading.." : (
                <div className='flex flex-col lg:flex-row gap-5 w-[95%] mx-auto lg:pt-10 bg-white mb-5'>
                    <div className='w-full lg:w-[40%] flex flex-col gap-5 pb-5'>
                        <h2 className='font-medium lg:font-semibold text-lg lg:text-2xl text-center'>{event.title}</h2>
                        <div className='w-full flex justify-center'>
                            <img src={event.imageUrl} alt='event-image'  className='object-contain'/>
                        </div>
                    </div>
                    <div className='w-full lg:w-[60%] flex flex-col gap-5 justify-between'>
                        <h2 className='font-medium lg:font-semibold text-lg lg:text-2xl text-center'>Details</h2>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <p className='font-medium text-base md:text-lg'>Date : </p>
                                <p className='pl-11 sm:w-[60%] break-words'>{event.date}</p>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <p className='font-medium text-base md:text-lg'>Location : </p>
                                <p className='pl-11 sm:w-[60%] break-words'>{event.location}</p>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <p className='font-medium text-base md:text-lg'>Price : </p>
                                <p className='pl-11 sm:w-[60%] break-words'>{price} €</p>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                                <p className='font-medium text-base md:text-lg'>First Name : </p>
                                <input
                                    type='text'
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="rounded-lg border border-gray-400 w-[70%] px-3 ml-[44px]"
                                    placeholder='Please enter your first name' />
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                                <p className='font-medium text-base md:text-lg'>Last Name : </p>
                                <input
                                    type='text'
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="rounded-lg border border-gray-400 w-[70%] px-3 ml-[44px]"
                                    placeholder='Please enter your last name' />
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
                                <p className='font-medium text-base md:text-lg'>Phone Number : </p>
                                <input
                                    type='text'
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="rounded-lg border border-gray-400 w-[70%] px-3 ml-[44px]"
                                    placeholder='Please enter your phone number' />
                            </div>
                        </div>
                        <button className="bg-[#00cc69] rounded-xl w-[50%] mx-auto h-[40px] font-semibold text-xl" onClick={paymentHandler}>pay</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserDetailsForm
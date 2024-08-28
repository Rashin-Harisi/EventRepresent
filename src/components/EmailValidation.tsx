import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import { generateOtp } from '../lib/utils';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const EmailValidation = ({ isOpen, closeModule,id}: {
    isOpen: boolean,
    closeModule: () => void,
    id:string | undefined,
}) => {
    const [email, setEmail] = useState("")
    const [otpCode, setOtpCode] = useState(0);
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [otpExpireTime, setOtpExpireTime] = useState(0)
    const [userOtp,setUserOtp]= useState("")
    const navigate = useNavigate();
  

    
    const handleSendOtp = () => {
            const otp = generateOtp();
            setOtpCode(otp);
            setOtpExpireTime(Date.now()+ 5*60*1000)
            const params={
                to_email: email,
                otp: otp,
            }
            emailjs.send(
                "service_7eq18vy",
                "template_y1a4psf",
                params,
                {
                  publicKey: "pkj_uFd7rkbixauO8",  
                }
            ).then(()=>{
                console.log("SUCCESS")
                setIsOtpSend(true);
            },(error)=>{
                console.log("FAILED",error);
            })
    }
    const handelOtpVerification= ()=>{
        const currentTime = Date.now();
        if (currentTime > otpExpireTime){
           return  alert("OTP has expired. Please request a new one.")
        }
        if (otpCode === +userOtp){
            console.log("verified");
            navigate("/userInfo",{state: {
                param1 : id,
                param2 : email,
            }})
        }
    }
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModule}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-gray-300  p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-black font-medium mb-4">
                                Please enter your email address
                            </DialogTitle>
                            <input type='text' className='w-full rounded-lg h-8 mb-2' onChange={(e) => setEmail(e.target.value)} />
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6  h-8
                                        font-semibold text-white shadow-inner shadow-white/10 focus:outline-none
                                        data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={handleSendOtp}
                                >
                                    Get otp code
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            {isOtpSend && (
                <Dialog open={isOtpSend} as="div" className="relative z-10 focus:outline-none" onClose={closeModule}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl bg-gray-300  p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                                <DialogTitle as="h3" className="text-black font-medium mb-4">
                                    Please enter the OTP code
                                </DialogTitle>
                                <input type='text' className='w-full rounded-lg h-8 mb-2' onChange={(e) => setUserOtp(e.target.value)} />
                                <div className="mt-4">
                                    <Button
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6  h-8
                                    font-semibold text-white shadow-inner shadow-white/10 focus:outline-none
                                    data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        onClick={handelOtpVerification}
                                    >
                                        Verify the code
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>

            )}
            
        </>
    )
}

export default EmailValidation



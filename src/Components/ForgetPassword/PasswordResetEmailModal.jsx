import React, { useRef, useContext, useEffect, useState } from 'react';
import { Base_Url } from "../../../public/utils";
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';



const PasswordResetEmailModal = ({ showModal, setShowModal }) => {
    // const { setLoading, loading } = useContext(AuthContext)
    const form = useRef();
    const [Loading, setLoading] = useState({});
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    useEffect(() => {
        if (showModal) {
            document.getElementById('my_modal_3').showModal();
        } else {
            document.getElementById('my_modal_3').close();
        }
    }, [showModal]);


    const sendEmail = (e) => {
        e.preventDefault();

        // Access form fields
        //    const name = form.current.client_name.value;
        //    const email = form.current.client_email.value;
        //    const message = form.current.client_message.value;

        // Validate message
        //    if (message.trim() === "" || name.trim() === "" || email.trim() === "") {
        //      toast.error(`Must be fill up the form!`);
        //      return;
        //    }

        emailjs
            .sendForm(
                "service_vjk0w5d",
                "template_x05mv57",
                form.current,
                "OwP7CB51fhyhnw13H")
            .then(
                () => {
                    // toast.success("Message successfully delivered to Mamun!")

                    console.log('SUCCESS!');
                    e.target.reset();

                },
                (error) => {
                    toast.error(`FAILED: ${error.text}`)
                    console.log('FAILED...', error.text);
                },
            );
    };

    const handleEmailsent = async (e) => {
        e.preventDefault();

        if (email.trim() === "") {
            toast.error(`Must be need email address`);
            return;
        }

        try {
            console.log("Starting cheaking...");
            setLoading(true)
            const response = await fetch(`${Base_Url}/api/member/send-reset-password-email/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            if (result.success) {

                console.log(result);
                const EncodedUserId = result?.EncodedUserId
                const token = result?.token
                setToken(token)
                setUserId(EncodedUserId)
                console.log(EncodedUserId, token);
                // await sendEmail(EncodedUserId, token);
                // await sendEmail("manager.meal.authority@gmail.com");

            } else {
                // toast.error(result.message);
                console.log(result?.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`Mail sent Failed! ${error.message}`);
        } finally {
            setLoading(false);
        }



        // setShowModal(false)
        console.log(showModal);
        // You can add logic here to actually send the recovery email
    }
    return (
        <>
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box dark:bg-gray-800">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white">✕</button>
                    </form>

                    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
                        <div className="mt-7 bg-white  rounded-xl dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember your password?
                                        <a className="text-[#F9A51A] decoration-2 hover:underline font-medium" href="#">
                                            Login here
                                        </a>
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <form ref={form} onSubmit={sendEmail}>
                                        <div className="grid gap-y-4">
                                            <div>
                                                <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                                <div className="relative">
                                                    <input onChange={(e) => setEmail((e.target.value).trim())} type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                                    <input onChange={(e) => setUserId((e.target.value).trim())} placeholder='UserID' value={userId} type="text" id="user_id" name="user_id" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                                    <input onChange={(e) => setToken((e.target.value).trim())} placeholder='Token' value={token} type="text" id="token" name="token" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                                </div>
                                                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                            </div>


                                            <button type="submit" onClick={handleEmailsent} className="bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2]"
                                                style={{ color: "black", transition: "color 0.3s" }}
                                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                                                onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                                            >Check Mail Address</button>
                                            <button type="submit" onClick={sendEmail} className="bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2]"
                                                style={{ color: "black", transition: "color 0.3s" }}
                                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                                                onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                                            >Recovery Email Sent</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </main>
                    <ToastContainer />
                </div>
            </dialog>

        </>
    );
};

export default PasswordResetEmailModal;
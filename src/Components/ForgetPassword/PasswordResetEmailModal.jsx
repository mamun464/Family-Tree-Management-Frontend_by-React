import React, { useContext, useEffect, useState } from 'react';
import { Base_Url } from "../../../public/utils";
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const PasswordResetEmailModal = ({showModal,setShowModal}) => {
    const {  setLoading, loading } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    useEffect(() => {
        if (showModal) {
            document.getElementById('my_modal_3').showModal();
        } else {
            document.getElementById('my_modal_3').close();
        }
    }, [showModal]);

    const sendEmail = async(EncodedUserId,token) => {
        
    
        emailjs
          .sendForm(
            "service_c59y82f",
            "template_o1b7i3v",
            form.current,
            "FQVdvGRvbmloGqm1T")
          .then(
            () => {
              // toast.success("Message successfully delivered to Mamun!")
            
              console.log('SUCCESS!');
              return { success: true, code: 200 ,message: error.text};
              
            },
            (error) => {
              toast.error(`FAILED: ${error.text}`)
              console.log('FAILED...', error.text);
              return { success: false,code: 400, message: error.text };
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

                console.log(EncodedUserId,token);
                const response = await sendEmail(EncodedUserId, token);
                if(statusCode.success){
                    toast.success(result.message)
                }else{
                    toast.success(`Reason: ${statusCode.message}`)
                }
            } else {
                // toast.error(result.message);
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`Mail sent Failed! ${error.message}`);
        } finally {
            setLoading(false);
        }
        
        

        setShowModal(false)
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
                
                <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
                    <div class="mt-7 bg-white  rounded-xl dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-4 sm:p-7">
                        <div class="text-center">
                        <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password? 
                            <a class="text-[#F9A51A] decoration-2 hover:underline font-medium" href="#">
                             Login here
                            </a>
                        </p>
                        </div>

                        <div class="mt-5">
                        <form>
                            <div class="grid gap-y-4">
                            <div>
                                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                <div class="relative">
                                <input onChange={(e) => setEmail((e.target.value).trim())} type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error"/>
                                </div>
                                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                            </div>
                            
                            <button type="submit"  onClick={handleEmailsent}  className="bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2]"
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
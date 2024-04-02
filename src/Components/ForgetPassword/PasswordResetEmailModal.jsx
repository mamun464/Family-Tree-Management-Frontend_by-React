import React, { useRef, useContext, useEffect, useState } from 'react';
import { Base_Url } from "../../../public/utils";
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import './btn.css';
import Swal from 'sweetalert2'



const PasswordResetEmailModal = ({ showModal, setShowModal }) => {
  const { setLoading, loading } = useContext(AuthContext)
  const form = useRef();
  // const [Loading, setLoading] = useState();
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [isChecking, setCheaking] = useState(false);
  useEffect(() => {
    if (showModal) {
      document.getElementById('my_modal_3').showModal();
    } else {
      document.getElementById('my_modal_3').close();
    }
  }, [showModal]);

  const close = () => {
    setShowModal(false)
    setCheaking(false)
    setEmail("");
    setToken("");
    setUserId("");
    setUserName("");
  }


  const sendEmail = (e) => {
    e.preventDefault();

    // Access form fields


    // Validate message
    if (email.trim() === "") {
      toast.error(`Must be fill up the form!`);
      return;
    }

    // print(form.current)
    setLoading(true);

    try {
      emailjs
        .sendForm(
          "service_vjk0w5d",
          "template_x05mv57",
          form.current,
          "OwP7CB51fhyhnw13H"
        )
        .then(
          (res) => {
            // toast.success("Message successfully delivered to Mamun!")
            console.log('SUCCESS!', res);
            close();
            Swal.fire({
              icon: "success",
              title: `Success`,
              text: ` Mail Sent Successfully!`,
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
          },
          (error) => {
            console.log('FAILED...', error.text);
            close();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.text || "Something went wrong.",
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        ).finally(() => {
          setLoading(false);
          // This block will be executed regardless of success or failure
        });
    } catch (error) {
      console.error('An error occurred:', error);
      close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Something went wrong.",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      // Handle the error here
    }

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
        const user_name = result?.user_name
        setToken(token)
        setUserId(EncodedUserId)
        setUserName(user_name)
        console.log(user_name, EncodedUserId, token);
        setCheaking(true)

      } else {
        // toast.error(result?.message);
        console.log(result?.message);
        close()
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result?.message || "Something went wrong.",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      close()
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Something went wrong.",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      // toast.error(`Mail sent Failed! ${error.message}`);
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
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-gray-800 pt-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={close} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white">✕</button>
          </form>

          <main id="content" role="main" className="w-full max-w-md mx-auto px-3">
            <div className="mt-7 bg-white  rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?
                    <a className="text-[#F9A51A] decoration-2 hover:underline font-medium" href="/login">
                      Login here
                    </a>
                  </p>
                </div>

                <form ref={form} onSubmit={sendEmail} className="contact__form">




                  <div className="mt-4">
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        if (!isChecking) {
                          setEmail(e.target.value.trim());
                        }
                      }}
                      className={`py-3 px-4 block w-full border-2 bg-white border-gray-200 rounded-md text-[15px] focus:border-blue-500 focus:ring-blue-500 shadow-sm ${isChecking ? 'cursor-not-allowed' : ''
                        }`}
                      placeholder="Write your email"
                    />

                  </div>
                  <div className={`mt-4 ${isChecking ? '' : 'hidden'}`}>
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Member Name</label>
                    <input
                      type="text"
                      name="userName"
                      value={userName}
                      onChange={(e) => {
                        if (!isChecking) {
                          setUserName(e.target.value.trim());
                        }
                      }}
                      className={`py-3 px-4 block bg-white w-full  ${isChecking ? 'cursor-not-allowed' : 'cursor-text'
                        } border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm`}
                      placeholder="User Name"
                    />
                  </div>

                  <div className="mt-4 hidden">
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Encoded Id</label>
                    <input
                      type="password"
                      name="userId"
                      onChange={(e) => setUserId((e.target.value).trim())}
                      value={userId}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      placeholder="Secret"
                    />
                  </div>

                  <div className="mt-4 hidden">
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Token</label>
                    <input
                      type='password'
                      name="token"
                      // disabled
                      rows="10"
                      cols="30"
                      value={token}
                      onChange={(e) => setToken((e.target.value).trim())}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      placeholder="Secret"
                    ></input>
                  </div>


                  {isChecking ? (
                    <button
                      type="submit"
                      onClick={sendEmail}
                      disabled={loading}
                      className={`mt-4 bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2] ${loading ? 'cursor-progress' : ''}`}
                      style={{ color: "black", transition: "color 0.3s" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#D48700";
                        e.target.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#F9A51A";
                        e.target.style.color = "#000";
                      }}
                    >
                      {
                        loading ? <span >
                          <i class="fa fa-spinner fa-spin"></i> Loading
                        </span>
                          : "Send Recovery Mail "


                      }

                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleEmailsent}
                      disabled={loading}
                      className={`mt-4 bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2] ${loading ? 'cursor-progress' : ''}`}
                      style={{ color: "black", transition: "color 0.3s" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#D48700";
                        e.target.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#F9A51A";
                        e.target.style.color = "#000";
                      }}
                    >
                      {
                        loading ? <span  >
                          <i class="fa fa-spinner fa-spin "></i> Loading
                        </span>
                          : "Check Email Authenticity"


                      }

                    </button>
                  )}
                  <ToastContainer />
                </form>
              </div>
            </div>


          </main>

        </div>
      </dialog>

    </>
  );
};

export default PasswordResetEmailModal;

import Nav_2 from './../NavBar/Nav_2';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        // Access form fields
        const name = form.current.client_name.value;
        const email = form.current.client_email.value;
        const message = form.current.client_message.value;

        // Validate message
        if (message.trim() === "" || name.trim() === "" || email.trim() === "") {
            toast.error(`Must be fill up the form!`);
            return;
        }

        emailjs
            .sendForm(
                "service_c59y82f",
                "template_o1b7i3v",
                form.current,
                "Siw0TLaGRAaRaEzot")
            .then(
                () => {
                    // toast.success("Message successfully delivered to Mamun!")

                    console.log('SUCCESS!');
                    e.target.reset();
                    Swal.fire({
                        icon: "success",
                        title: `Mail Sent`,
                        text: "Thank you for contacting us & will get back to you shortly.",
                        // footer: '<a href="#">Why do I have this issue?</a>'
                    }).then((result) => {
                        // If the "OK" button is clicked or the modal is closed
                        if (result.isConfirmed || result.isDismissed) {
                            // Delay reload by 2 seconds
                            window.location.href = "/";
                            // setTimeout(() => {

                            // }, 2000);
                        }
                    });

                },
                (error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.text || "Something went wrong!",

                    });

                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div>
            <Nav_2></Nav_2>
            <div className="space-y-12 bg-white text-gray-600">

                <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
                    <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's Solve!</h2>
                            <div className="text-gray-400">If you face any problem then contact us through this form or in case of emergency contact us by phone which is given in the footer section.</div>
                        </div>
                        <img src="/help.png" alt="Contact our customer support" className="p-6 h-52 md:h-64" />
                    </div>
                    <form ref={form} onSubmit={sendEmail} novalidate="" className="space-y-6">
                        <div>
                            <label for="name" className="text-sm">Your Name</label>
                            <input name="client_name" id="name" type="text" placeholder="" className="w-full p-3 rounded bg-gray-100" />
                        </div>
                        <div>
                            <label for="email" className="text-sm">Your Email</label>
                            <input name="client_email" id="email" type="email" className="w-full p-3 rounded bg-gray-100" />
                        </div>
                        <div>
                            <label for="message" className="text-sm">Message</label>
                            <textarea name="client_message" id="message" rows="3" className="w-full p-3 rounded bg-gray-100"></textarea>
                        </div>
                        <button type="submit" className="btn w-full p-3 text-sm font-bold tracki uppercase rounded bg-violet-400 text-gray-900 hover:text-white">Send Message</button>
                    </form>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;
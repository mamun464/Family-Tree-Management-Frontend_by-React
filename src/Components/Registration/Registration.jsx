import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav_2 from "../NavBar/Nav_2";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {

    // const { createUser, googleLogin, fbLogin } = useContext(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();

    const [dateChanged, setDateChanged] = useState(false);

    const handleInputChange = () => {
        setDateChanged(true);
    };

    const handlephoneChange = (e) => {
        const phoneNumberInput = e.target.value;
        const isValidPhoneNumber = /^[+\-\(\)\d]+$/.test(phoneNumberInput);

        if (!isValidPhoneNumber) {
            // Display a toast message or any other notification
            toast.warn(`Only Allow Numbers`);
            e.target.value = '';
        }
    };


    const handleRegistration = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const firstName = form.get('fullName');
        const phone_no = form.get('phone_no');
        const email = form.get('email');
        const DOB = form.get('DOB');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');



        if (password != confirmPassword) {
            toast.error(`Confirm Password not match!`);
        }
        console.log(firstName);
        console.log(phone_no);
        console.log(email);
        console.log(DOB);
        console.log(password);
        console.log(confirmPassword);
        //  else {
        //     createUser(email, password)
        //         .then(result => {
        //             updateProfile(result.user, {
        //                 displayName: `${firstName} ${lastName}`
        //             }).then(re => {
        //                 console.log("User updated",);
        //             }).catch(err => {
        //                 console.error(err);
        //             });
        //             console.log("Registration successful:", result.user);
        //             toast.success('🦄 Registration successful!');
        //             navigate(location?.state ? location.state : '/')
        //         }).catch(err => {
        //             console.error(err);
        //             toast.error(`Registration Failed! ${err.message}`);
        //         })
        // }


    };
    return (
        <>
            <Nav_2></Nav_2>

            <div className="w-full max-w-md mx-auto px-4 py-8 sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="w-full border border-[#ABABAB] rounded p-8 font-montserrat">
                    <h1 className="text-black text-2xl font-bold mb-6 text-center">Create an account</h1>

                    <form onSubmit={handleRegistration}>
                        <div className="mb-6">
                            <input
                                type="text"
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Full Name"
                                required
                                name="fullName"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="tel"
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Phone Number"
                                required
                                name="phone_no"
                                onInput={handlephoneChange}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="email"
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Email"
                                required
                                name="email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block font-medium text-[#A9A9A9]">Date of Birth</label>
                            <input
                                type="date"
                                className={`border-b-2 ${dateChanged ? 'text-black' : 'text-[#A9A9A9]'} border-[#C5C5C5] font-medium uppercase focus:border-[#F9A51A] w-full py-2 px-3 pl-0 focus:outline-none`}
                                required
                                name="DOB"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Confirm Password"
                                required
                                name="password"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Password"
                                required
                                name="confirmPassword"
                            />
                        </div>

                        <button type="submit" className="bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2]">Create an account</button>

                        <p className="mt-4 font-medium text-center">Already have an account? <Link to={"/login"} className="text-[#F9A51A] underline">Login</Link></p>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>

    );
};

export default Registration;
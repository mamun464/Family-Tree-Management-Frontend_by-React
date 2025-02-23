/* eslint-disable no-useless-escape */
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav_2 from "../NavBar/Nav_2";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Provider/AuthProvider";
import { Base_Url } from "../../../public/utils";
import Loader from "../Loader/Loader";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


const Registration = () => {

    const { setUser, loading, setLoading } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();



    // const [dateChanged, setDateChanged] = useState(false);

    // const handleInputChange = () => {
    //     setDateChanged(true);
    // };
    const [genderSelected, setGenderSelected] = useState(false);

    const handleGenderChange = () => {
        setGenderSelected(true);
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);

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


    const handleRegistration = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const full_name = form.get('fullName');
        const phone_no = form.get('phone_no');
        const email = form.get('email');
        const gender = form.get('gender');
        const password = form.get('password');
        const password2 = form.get('confirmPassword');



        if (password != password2) {
            toast.error(`Confirm Password not match!`);
        }
        else {
            setLoading(true);

            try {
                const response = await fetch(`${Base_Url}/api/member/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ full_name, email, phone_no, gender, password, password2 })
                });

                console.log("gender", gender);


                const result = await response.json();
                if (result.success) {
                    setUser(result.user_data)
                    const { access, refresh } = result.token;
                    localStorage.setItem('access_token', access);
                    localStorage.setItem('refresh_token', refresh);
                    localStorage.setItem('user', JSON.stringify(result.new_user));
                    toast.success(result.message);

                    setTimeout(() => {
                        navigate(location?.state ? location.state : '/'); // Assuming 'Home' is your home screen name
                    }, 900);

                    // navigate(location?.state ? location.state : '/')
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error(`Login Failed! ${error.message}`);
            } finally {
                setLoading(false);
            }
        }


    };
    return (
        <>
            <Nav_2></Nav_2>

            <div className="w-full max-w-md mx-auto px-4 py-8 sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                {loading && (
                    <Loader></Loader>
                )}
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
                            <label className="block font-medium text-[#A9A9A9]">Gender</label>
                            <select
                                className={`border-b-2 ${genderSelected ? 'text-black' : 'text-[#A9A9A9]'} border-[#C5C5C5] font-medium uppercase focus:border-[#F9A51A] w-full py-2 px-3 pl-0 focus:outline-none text-black bg-transparent`}
                                required
                                name="gender"
                                onChange={handleGenderChange}
                            >
                                <option className="text-[#A9A9A9] font-medium " value="" disabled selected>Select Gender</option>
                                <option className="text-[#A9A9A9] font-medium " value="female">Female</option>
                                <option className="text-[#A9A9A9] font-medium " value="male">Male</option>
                                <option className="text-[#A9A9A9] font-medium " value="other">Other</option>
                            </select>
                        </div>
                        {/* <div className="mb-6">
                            <label className="block font-medium text-[#A9A9A9]">Gender</label>
                            <input
                                type="date"
                                className={`border-b-2 ${dateChanged ? 'text-black' : 'text-[#A9A9A9]'} border-[#C5C5C5] font-medium uppercase focus:border-[#F9A51A] w-full py-2 px-3 pl-0 focus:outline-none`}
                                required
                                name="DOB"
                                onChange={handleInputChange}
                            />
                        </div> */}
                        <div className="mb-6 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Password"
                                required
                                name="password"
                            />
                            <button className="absolute right-0 top-0 mt-2.5 mr-3 text-2xl text-gray-600 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                        <div className="mb-6">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 pl-0 text-black focus:outline-none"
                                placeholder="Confirm Password"
                                required
                                name="confirmPassword"
                            />

                        </div>

                        <button type="submit" className="bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2]"
                            style={{ color: "black", transition: "color 0.3s" }}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                        >Create an account</button>

                        <p className="mt-4 font-medium text-center">Already have an account? <Link to={"/login"} className="text-[#F9A51A] underline"
                            style={{ transition: "font-size 0.3s, color 0.3s", fontSize: "1rem" }}
                            onMouseEnter={(e) => { e.target.style.fontSize = '1rem'; e.target.style.color = '#D48700'; }}
                            onMouseLeave={(e) => { e.target.style.fontSize = '0.95rem'; e.target.style.color = '#F9A51A'; }}
                        >Login</Link></p>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>

    );
};

export default Registration;
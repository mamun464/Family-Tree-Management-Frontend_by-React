/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Nav_2 from '../NavBar/Nav_2';
import { FaUpload } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Base_Url } from '../../../public/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { getProfileLocalStorage, getTokenFromLocalStorage } from '../../Utils/Utils';
import Loader from '../Loader/Loader';
import './loading.css';
import Swal from 'sweetalert2'



const MemberProfileEdit = () => {
    const navigate = useNavigate();
    const { setLoading, loading } = useContext(AuthContext)
    const [user, setUser] = useState(getProfileLocalStorage());
    const [token, setToken] = useState(getTokenFromLocalStorage());


    const [debouncedFetch, setDebouncedFetch] = useState(false); // Control debouncing

    useEffect(() => {
        if (debouncedFetch) {
            fetchProfileData(token); // Fetch profile data when debouncedFetch is true
            setDebouncedFetch(false); // Reset debouncedFetch
        }
    }, [debouncedFetch]);

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (token) {
            setToken(token);
            setDebouncedFetch(true); // Set debouncedFetch to true
        } else {
            let error = {
                message: "You have to login again!"
            };
            handleError(error)
        }
    }, []);



    const [full_name, setFull_name] = useState(user.full_name);
    const [email, setEmail] = useState(user?.email);
    const [phone_no, setPhone_no] = useState(user?.phone_no);
    const [place_of_birth, setPlace_of_birth] = useState(user?.place_of_birth);
    const [profession, setProfession] = useState(user?.profession);
    const [gender, setGender] = useState(user?.gender);
    const [date_of_birth, setDate_of_birth] = useState(user?.date_of_birth);
    const [date_of_death, setDate_of_death] = useState(user?.date_of_death);
    const [current_address, setCurrent_address] = useState(user?.current_address);
    const [permanent_address, setPermanent_address] = useState(user?.permanent_address);
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [facebook, setFacebook] = useState(user?.facebook);
    const [linkedin, setLinkedin] = useState(user?.linkedin);
    const [instagram, setInstagram] = useState(user?.instagram);
    const [is_alive, setIs_alive] = useState(user?.is_alive);
    const [is_married, setIs_married] = useState(user?.is_married);
    const [is_change_pass, setIs_change_pass] = useState(false);
    const [user_profile_img, setUser_profile_img] = useState(user?.user_profile_img);
    const fileInputRef = useRef(null);




    const fetchProfileData = async (token) => {

        try {

            setLoading(true);

            const response = await fetch(`${Base_Url}/api/member/profile/`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`,
                },

            });



            const result = await response.json();
            if (result.success) {
                setUser(result.user_data)
                // const { access, refresh } = result.token;
                // localStorage.setItem('access_token', access);
                // localStorage.setItem('refresh_token', refresh);
                localStorage.setItem('user', JSON.stringify(result.user_data));
                setUser(result.user_data)
                // toast.success("get data");

                // setTimeout(() => {
                //     navigate(location?.state ? location.state : '/'); // Assuming 'Home' is your home screen name
                // }, 900);

                // navigate(location?.state ? location.state : '/')
            }
            else if (result.status === 401) {

                localStorage.clear();
                window.location.reload();
            }
            else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(` fetching data Failed! ${error.message}`);
        } finally {
            setLoading(false);
        }
    }






    const UpdatePassword = async (token) => {
        try {
            setLoading(true);
            const requestBody = {
                password,
                password2
            };



            const response = await axios.post(`${Base_Url}/api/member/changepassword/`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });



            if (response.status === 200) {
                const result = response.data;
                setIs_change_pass(false)
                if (result.success) {
                    // toast.success(result.message);
                    Swal.fire("Saved!", result.message, "success");

                } else if (result.status === 401) {
                    localStorage.clear();
                    window.location.reload();
                } else {
                    // toast.error("result.message");
                    Swal.fire("Failed!", result.message, "error");
                }
            } else {
                // Handle non-200 response
                const errorResult = response.data;
                console.error('Non-200 response:', errorResult);
                Swal.fire("Failed!", errorResult.message, "error");
                // toast.error(`Action Failed! ${errorResult.message}`);
            }
        } catch (error) {
            if (error.response.status === 400) {
                console.error('Bad Request:', error.response.data);
                // toast.error(`${error.response.data.message}`);
                Swal.fire("Failed!", error.response.data.message, "error");
            } else {
                console.error('Error fetching data:', error);
                Swal.fire("Failed!", error.message, "error");
                // toast.error(`Action Failed! ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    // Function to get file extension
    function getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    const UpdateProfileData = async (token) => {
        try {

            setLoading(true);
            const requestBody = {
                full_name,
                email,
                phone_no,
                place_of_birth,
                profession,
                gender,
                date_of_birth,
                date_of_death,
                current_address,
                permanent_address,
                facebook,
                linkedin,
                instagram,
                is_alive,
                is_married,
                user_profile_img
            };
            const response = await fetch(`${Base_Url}/api/member/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });



            const result = await response.json();
            if (result.success) {
                // toast.success(result.message);
                Swal.fire("Saved!", result.message, "success").then((result) => {
                    // If the "OK" button is clicked or the modal is closed
                    if (result.isConfirmed || result.isDismissed) {

                        navigate(location?.state ? location.state : '/');
                        ;
                    }
                });

                setUser(result.user_data)
                // const { access, refresh } = result.token;
                // localStorage.setItem('access_token', access);
                // localStorage.setItem('refresh_token', refresh);
                localStorage.setItem('user', JSON.stringify(result.user_data));


            }
            else if (result.status === 401) {

                localStorage.clear();
                window.location.reload();
            }
            else {
                // toast.error(result.message);
                handleError(result.message)
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            // toast.error(` fetching data Failed! ${error.message}`);
            handleError(result.message)
        } finally {
            setLoading(false);
        }

    }

    function handleImageUpload(e) {
        const file = e.target.files[0];

        // Check file extension
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = getFileExtension(file.name);
        if (!allowedExtensions.includes(fileExtension)) {
            Swal.fire("Failed!", "Invalid file type. Please select a photo file (JPG, JPEG, PNG).", "error").then((result) => {
                // If the "OK" button is clicked or the modal is closed
                if (result.isConfirmed || result.isDismissed) {
                    // If the upload was successful
                    window.location.reload();
                    return
                }
            });
            // alert("Please select a photo file not supported")

        }

        // Check file size
        if (file.size > 300 * 1024) { // 300kb in bytes
            Swal.fire("Failed!", "File size exceeds the limit of 300kb. Please select a smaller file.", "error").then((result) => {
                // If the "OK" button is clicked or the modal is closed
                if (result.isConfirmed || result.isDismissed) {
                    // If the upload was successful
                    window.location.reload();
                    return
                }
            });
        }



        const formData = new FormData();
        formData.append('image', file);
        setLoading(true)
        console.log("Starting upload");
        // Replace 'your-imgbb-api-key' with your actual ImgBB API key
        const imgBbApiKey = 'db34544520f57ff0f15d2b1ece2794b3';

        fetch('https://api.imgbb.com/1/upload?key=' + imgBbApiKey, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("++++++++++>>>", data);
                if (data && data.data && data.data.image && data.data.image.url) {
                    setUser_profile_img(data.data.image.url);
                    // toast.success("DP updated successfully");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Uploaded image successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                setLoading(false)
            })
            .catch(error => {
                console.error('Error uploading image to ImgBB:', error);
                setLoading(false)
                Swal.fire("Failed!", `Error uploading image to ImgBB: ${error}`, "error").then((result) => {
                    // If the "OK" button is clicked or the modal is closed
                    if (result.isConfirmed || result.isDismissed) {
                        // If the upload was successful
                        window.location.reload();
                        return
                    }
                });

            });


    }

    const passwordsMatch = (password, password2) => {
        // Check if either field is empty
        if ((!password && password2) || (password && !password2)) {
            return false; // If one is empty and the other is not, they don't match
        }
        if ((password === "") || (password2 === "")) {
            return false; // If one is empty and the other is not, they don't match
        }

        // Check if passwords match
        if (password === password2) {
            return true;
        }

        return false;
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleUpdatePass = (e) => {
        e.preventDefault();
        const tokenNow = getTokenFromLocalStorage();

        if (tokenNow) {
            Swal.fire({
                title: "Do you want to save the New Password?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    UpdatePassword(tokenNow)
                        .then(response => {

                            console.log("Response:", response);

                        })
                        .catch(error => {
                            // toast.error(`Failed to update Password. ${error}`);
                            console.error("Error updating Password:", error);
                            // toast.error("Failed to update Password. Please try again later.");
                            handleError(error)

                        });

                } else if (result.isDenied) {
                    Swal.fire("New Password are not saved", "", "info");
                }
            });
            // console.log(token);




        } else {
            let error = {
                message: "You have to login first!"
            };
            handleError(error)
            // toast.warn("You have to login first");
        }
    };

    const handleError = (error) => {
        // console.error('Error handling connection:', error);

        if (error.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong.",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
            // toast.error(error.message || 'Connection create failed!');
        }
    };
    const handleUpdateData = () => {
        const tokenNow = getTokenFromLocalStorage();

        if (!is_change_pass) {
            if (tokenNow) {
                // console.log(token);

                Swal.fire({
                    title: "Do you want to save the changes?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        UpdateProfileData(tokenNow)
                            .then(response => {
                                console.log("Response:", response);
                            })
                            .catch(error => {
                                console.error("Error updating profile data:", error);
                                // toast.error("Failed to update profile data. Please try again later.");
                                handleError(error)
                            });

                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                });




            } else {
                // toast.warn("You have to login first");
                let error = {
                    message: "You have to login again!"
                };
                handleError(error)
            }
        } else {
            Swal.fire({
                title: "Action Needed!",
                text: "You have to deselect the option for password change first.",
                icon: "warning"
            });
        }
    };
    return (
        <>
            <Nav_2 bgColor="#f1f5f9" />
            <section className=" py-1 bg-[#f1f5f9]">
                {loading && (
                    <div style={{ position: 'relative' }}>
                        <Loader></Loader>
                        <p
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'red',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                animation: 'pulse 2s infinite',
                                textAlign: 'center',
                                zIndex: '9999'
                            }}
                        >
                            It's a Free server. Don't refresh Please
                        </p>
                    </div>
                )}



                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#f1f5f9] border-0">

                        <div className="rounded-t bg-red-50 mb-0  pt-0">
                            <div
                                className=" bg-[#f1f5f9] rounded-lg text-gray-900">
                                <div className="rounded-t-lg h-32 overflow-hidden">
                                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1708547347608-f30580b9a454?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Mountain' />
                                </div>
                                <div className="mx-auto w-32 h-32 -mt-16 cursor-pointer" onClick={handleClick} title="Click to upload image">
                                    {/* Image Container */}
                                    <div className="relative border-4 border-white rounded-full overflow-hidden h-full">
                                        {/* Image */}
                                        {user_profile_img ? (
                                            <img
                                                className="object-cover object-center w-full h-full"
                                                src={user_profile_img}
                                                alt="Uploaded"
                                            />
                                        ) : (
                                            <img
                                                className="object-cover object-center w-full h-full"
                                                src="/UserProfile.jpg"
                                                alt="Woman looking front"
                                            />
                                        )}
                                        {/* Overlay */}
                                        <div
                                            className="h-[70%] top-[70%] absolute inset-0 pt-2 flex items-center flex-col text-white bg-black bg-opacity-60"

                                        >
                                            <span>
                                                <FaUpload />
                                            </span>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                    User Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter your Name"
                                                name='name'
                                                value={full_name}
                                                onChange={(event) => setFull_name(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter your email"
                                                name='email'
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Phone No
                                            </label>
                                            <input
                                                type="tel"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter your number"
                                                name='mobile'
                                                value={phone_no}
                                                onChange={(event) => setPhone_no(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Profession
                                            </label>
                                            <input
                                                type="tel"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter your profession"
                                                name='job'
                                                value={profession}
                                                onChange={(event) => setProfession(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2">
                                                Gender
                                            </label>
                                            <select
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                name="gender"
                                                value={gender}
                                                onChange={(event) => setGender(event.target.value)}
                                            >
                                                <option value="" disabled>
                                                    Select Gender
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                                name='DOB'
                                                value={date_of_birth}
                                                onChange={(event) => setDate_of_birth(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Place Of Birth
                                            </label>
                                            <input
                                                type="tel"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter Birth Place"
                                                name='POB'
                                                value={place_of_birth}
                                                onChange={(event) => setPlace_of_birth(event.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className='flex justify-around  w-1/2 '>
                                        <div className="form-control  flex justify-center ">
                                            <label className="cursor-pointer label ">
                                                <input type="checkbox" className="checkbox checkbox-warning mr-2" name='is_alive'
                                                    checked={is_alive}
                                                    onChange={(e) => setIs_alive(e.target.checked)} />
                                                <span className="block uppercase text-[#475569] text-xs font-bold  ">Is Alive?</span>

                                            </label>
                                        </div>
                                        <div className="form-control flex justify-center">
                                            <label className="cursor-pointer label ">
                                                <input type="checkbox" className="checkbox checkbox-warning mr-2" name='is_married'
                                                    checked={is_married}
                                                    onChange={(e) => setIs_married(e.target.checked)} />
                                                <span className="block uppercase text-[#475569] text-xs font-bold  ">Is Married?</span>

                                            </label>
                                        </div>
                                    </div>
                                    <div className={`w-full lg:w-6/12 px-4 ${is_alive ? 'hidden' : ''}`}>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Date of Death
                                            </label>
                                            <input
                                                type="date"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                                name='DOD'
                                                value={date_of_death}
                                                onChange={(event) => setDate_of_death(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>



                                <hr className="mt-6 border-b-1 border-[#cbd5e1]" />

                                <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                    Contact Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Present Address
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='PresentAdd'
                                                value={current_address}
                                                onChange={(event) => setCurrent_address(event.target.value)}
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Permanent Address
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='PermanentAdd'
                                                value={permanent_address}
                                                onChange={(event) => setPermanent_address(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="uppercase text-[#475569] text-xs font-bold mb-2 flex items-center gap-1" >
                                                <FaFacebook /> Facebook
                                            </label>
                                            <input type="email" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url must be https://"
                                                value={facebook}
                                                onChange={(event) => setFacebook(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="uppercase text-[#475569] text-xs font-bold mb-2 flex items-center gap-1" >
                                                <AiFillInstagram /> Instagram
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url must be https://"
                                                value={instagram}
                                                onChange={(event) => setInstagram(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="flex items-center gap-1 uppercase text-[#475569] text-xs font-bold mb-2" >
                                                <FaLinkedin />   Linkedin
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url must be https://"
                                                value={linkedin}
                                                onChange={(event) => setLinkedin(event.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-[#cbd5e1]" />
                                <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                    Password Upadation
                                </h6>
                                <div className="flex ">
                                    <label className="cursor-pointer label ">
                                        <input type="checkbox" className="checkbox checkbox-warning mr-2" name='is_change_pass'
                                            checked={is_change_pass}
                                            onChange={(e) => setIs_change_pass(e.target.checked)} />
                                        <span className="block uppercase text-[#475569] text-xs font-bold  ">Want to Change Password ?</span>

                                    </label>
                                </div>
                                <div className={`flex flex-wrap ${is_change_pass ? '' : 'hidden'}`}>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="text-2xl border-0  px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                name='password'
                                                required
                                                onChange={(event) => setpassword(event.target.value)}
                                            />
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                name='password2'
                                                required
                                                onChange={(event) => setpassword2(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-end mt-10'>
                                        <Link
                                            type='submit'
                                            onClick={handleUpdatePass}
                                            className='text-lg px-auto rounded-md py-2 px-4 text-white font-semibold bg-[#FF444A] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out active:bg-[#FF2227]'
                                        >
                                            Change Password
                                        </Link>

                                    </div>
                                </div>


                                <div className='flex justify-end mt-10'>
                                    <button type='submit'
                                        onClick={handleUpdateData}

                                        className="btn bg-[#F9A51A] w-36 h-11 rounded-md uppercase text-[#475569] text-xs font-bold border-0 outline-none flex items-center justify-center"
                                        disabled={loading}
                                        style={loading ? {
                                            backgroundColor: '#FFBE00', // Set background color
                                            color: 'rgba(0,0,0,0.5)', // Set text color to black
                                            fontWeight: 'bold',
                                            cursor: 'not-allowed',
                                            transition: "color 0.2s" // Make text bold
                                        } : {}}

                                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                                        onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                                    >
                                        {
                                            loading ? <span >
                                                <i className="fa fa-spinner fa-spin"></i> Loading
                                            </span>
                                                : "Update Data"


                                        }
                                    </button>
                                </div>


                            </form>

                        </div>
                    </div>
                    <ToastContainer />

                </div>

            </section>
        </>
    );
};

export default MemberProfileEdit;
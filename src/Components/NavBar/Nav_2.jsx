import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";
import { IoSettingsOutline } from "react-icons/io5";




// eslint-disable-next-line react/prop-types
const Nav_2 = ({ bgColor = "#fff", home = false }) => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [isOtherPage, setIsOtherPage] = useState(false);
    const location = useLocation();


    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);




    useEffect(() => {
        if (location.pathname == "/register") {
            setIsRegistered(true);
        }
        if (location.pathname != "") {
            setIsOtherPage(true);
        }

        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));

    }, [location.pathname]);

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }
    const navLink = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/connection"}>Make Relationship</NavLink></li>
        <li><NavLink to={"/contact"}>Contact</NavLink></li>
    </>


    return (
        <>
            <div className={`navbar bg-white bg-opacity-0 max-w-7xl mx-auto relative `}
            // style={{ backgroundColor: bgColor }}
            >
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52 font-montserrat font-medium text-black shadow-xl" style={{ backgroundColor: '#F0F0F0', color: "black" }}>
                            {navLink}

                        </ul>
                    </div>
                    <Link to={"/"} className="btn btn-ghost text-xl w-36 h-24">
                        <img className="w-28 h-20" src="/family_logo.png" alt="Logo" />
                    </Link>
                </div>


                <div className="navbar-center hidden lg:flex">
                    <ul className={`menu menu-horizontal px-1 font-montserrat font-medium ${home ? 'text-white' : 'text-black'}`}>
                        {navLink}

                    </ul>
                </div>

                <div className="navbar-end ">

                    {
                        user ? <>
                            {/* Please add here that component */}

                            <div className="relative ">
                                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setOpen(!open)}>
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900 transition duration-300 ease-in-out transform hover:scale-105">
                                        {user?.user_profile_img ?
                                            <>
                                                <img src={user?.user_profile_img} alt="" className="w-full h-full object-cover" />
                                            </>
                                            : <img src="/UserProfile.png" alt="" className="w-full h-full object-cover" />}

                                    </div>
                                    <div className="font-semibold  text-gray-100 text-lg hover:text-indigo-700 transition duration-300 ease-in-out">
                                        <div className={`cursor-pointer hidden min-xl:block ${home ? 'text-white' : 'text-black'}  hover:text-indigo-700 transition duration-300 ease-in-out`}
                                            style={{ transition: "color 0.3s" }}>{user?.full_name}</div>
                                    </div>
                                </div>
                                {open && (
                                    <div className={`absolute -left-56 w-60 px-5 py-3  dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-2 z-50`}>
                                        <ul className="menu menu-sm dropdown-content pl-0 space-y-3 dark:text-white">
                                            <li className="font-medium">
                                                <Link to={"/my-profile"} className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                                    <div className="mr-3">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    </div>
                                                    Account
                                                </Link>
                                            </li>
                                            <li className="font-medium">
                                                <Link to={"/profile-edit"} href="#" className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                                    <div className="text-2xl mr-3">
                                                        <IoSettingsOutline />
                                                    </div>
                                                    Setting
                                                </Link>
                                            </li>
                                            <li className="font-medium">
                                                <Link onClick={handleLogOut} href="#" className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600">
                                                    <div className="mr-3 text-red-600">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                                    </div>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                            : isOtherPage ? <Link
                                to={"/login"}
                                className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-black font-medium border-0 outline-none flex items-center justify-center"
                                style={{ color: "black", transition: "color 0.3s" }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                            >
                                Login
                            </Link>
                                :
                                isRegistered ? <Link
                                    to={"/login"}
                                    className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-black font-medium border-0 outline-none flex items-center justify-center"
                                    style={{ color: "black", transition: "color 0.3s" }}
                                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                                >
                                    Login
                                </Link>
                                    : <Link
                                        to={"/register"}
                                        className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-black font-medium border-0 outline-none flex items-center justify-center"
                                        style={{ color: "black", transition: "color 0.3s" }}
                                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                                        onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                                    >
                                        Sign Up
                                    </Link>
                    }
                </div>


            </div>


        </>
    );
};

export default Nav_2;

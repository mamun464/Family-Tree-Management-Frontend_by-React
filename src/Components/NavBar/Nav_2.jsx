import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";




const Nav_2 = () => {

    const [user, setUser] = useState("");
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));

    }, []);

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }
    const navLink = <>
        <li><NavLink to={"/d"}>News</NavLink></li>
        <li><NavLink to={"/d"}>Destination</NavLink></li>
        <li><NavLink to={"/d"}>Blog</NavLink></li>
        <li><NavLink to={"/d"}>Contact</NavLink></li>
    </>
    return (
        <>
            <div className="navbar  max-w-7xl mx-auto text-black relative">
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
                    <ul className="menu menu-horizontal px-1 font-montserrat font-medium">
                        {navLink}

                    </ul>
                </div>

                <div className="navbar-end ">

                    <div className="mr-3 items-center hidden min-xl:flex">
                        <h1 className="text-black font-bold uppercase">{user?.full_name}</h1>
                    </div>
                    <div className="flex-none" >
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium" style={{ backgroundColor: '#F0F0F0', color: "black" }}>
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>

                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>


        </>
    );
};

export default Nav_2;
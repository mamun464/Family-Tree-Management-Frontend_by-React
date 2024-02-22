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
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-montserrat font-medium text-black">
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
                    {
                        user ?
                            <>
                                <div className="flex gap-3 items-center">
                                    <h1 className="text-black font-bold">{user?.full_name}</h1>
                                    <Link onClick={handleLogOut} className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-Black font-medium border-0 outline-none " style={{ color: "black" }}
                                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#D78C00'; e.target.style.color = '#000'; }}
                                        onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                                    >LogOut</Link>
                                </div>
                            </>
                            :
                            <Link
                                to={"/login"}
                                className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-Black font-medium border-0 outline-none"
                                style={{ color: "black", textDecoration: "none" }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#D78C00'; e.target.style.color = '#FFF'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                            >
                                Login
                            </Link>
                    }
                </div>


            </div>


        </>
    );
};

export default Nav_2;
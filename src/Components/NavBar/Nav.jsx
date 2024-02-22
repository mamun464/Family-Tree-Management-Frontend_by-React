import { Link, NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";



const Nav = () => {
    // const { user, logOutUser } = useContext(AuthContext)
    const user = {}
    const handleLogOut = () => {
        // logOutUser()
        //     .then(() => {
        //         console.log("Logout successful:");
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     })


    }
    const navLink = <>
        <li><NavLink to={"/login"}>News</NavLink></li>
        <li><NavLink to={"/login"}>Destination</NavLink></li>
        <li><NavLink to={"/login"}>Blog</NavLink></li>
        <li><NavLink to={"/login"}>Contact</NavLink></li>
    </>
    return (
        <div className="navbar  max-w-7xl mx-auto text-white relative">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-montserrat font-medium text-black">
                        {navLink}

                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl w-36 h-20">
                    <img className="w-28 h-14" src="/logo2.png" alt="Logo" />
                </Link>
            </div>
            <div className="relative hidden md:block">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <IoSearch className="text-xl" />
                </div>
                <input
                    className="rounded-md border w-96 bg-[#FFFFFF33] px-10 py-2.5 outline-0 placeholder-color"
                    type="text"
                    placeholder="Search your Destination..."
                    style={{
                        '-webkit-text-fill-color': '#FFF'
                    }}
                />
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-montserrat font-medium">
                    {navLink}

                </ul>
            </div>

            <div className="navbar-end ">
                {
                    user ?
                        <Link onClick={handleLogOut} className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-Black font-medium border-0 outline-none ">LogOut</Link>
                        :
                        <Link to={"/login"} className="btn bg-[#F9A51A] w-24 h-11 rounded-md text-Black font-medium border-0 outline-none ">Login</Link>
                }


            </div>
        </div>
    );
};

export default Nav;
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav_2 from "../NavBar/Nav_2";
import { Base_Url } from "../../../public/utils";
import { useContext, useEffect, } from 'react'; // Import useState hook
import Loader from "../Loader/Loader";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
    const { setUser, setLoading, loading } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('access_token');
        if (isLoggedIn) {
            navigate(location?.state ? location.state : '/');
        }
    }, []);

    const handlephoneChange = (e) => {
        const phoneNumberInput = e.target.value;
        const isValidPhoneNumber = /^[+\-\(\)\d]+$/.test(phoneNumberInput);

        if (!isValidPhoneNumber) {
            // Display a toast message or any other notification
            toast.warn(`Only Allow Numbers`);
            e.target.value = '';
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const phone_no = form.get('phone_no');
        const password = form.get('password');


        try {
            const response = await fetch(`${Base_Url}/api/member/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_no, password })
            });



            const result = await response.json();
            if (result.success) {
                setUser(result.user_data)
                const { access, refresh } = result.token;
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
                localStorage.setItem('user', JSON.stringify(result.user_data));
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
    };

    return (
        <>
            <Nav_2 />

            <div className="w-full h-screen  mx-auto md:w-[90%] lg:w-[70%] xl:w-[50%] 2xl:w-[40%] px-4 ">
                {loading && (
                    <Loader></Loader>
                )}

                <div className="w-full border border-[#ABABAB] rounded-lg p-8 font-montserrat mt-10">
                    <h1 className="text-black text-2xl font-bold mb-6">Login</h1>

                    <form onSubmit={handleLogin}>
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
                                type="password"
                                id="password"
                                name="password"
                                className="border-b-2 border-[#C5C5C5] font-medium focus:border-[#F9A51A] w-full py-2 px-3 mt-1 pl-0 text-black focus:outline-none"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start md:mt-4 mb-8">
                            <div className="flex items-center mb-4 md:mb-0">
                                <input className="w-4 h-4 mr-2" type="checkbox" />
                                <label className="text-black font-medium">Remember Me</label>
                            </div>

                            <div className="text-[#F9A51A] font-medium underline">
                            <Link to={"/forgetPass"}>
                                <span
                                    style={{ transition: "font-size 0.3s, color 0.3s", fontSize: "1rem" }}
                                    onMouseEnter={(e) => { e.target.style.fontSize = '1rem'; e.target.style.color = '#D48700'; }}
                                    onMouseLeave={(e) => { e.target.style.fontSize = '0.95rem'; e.target.style.color = '#F9A51A'; }}
                                >Forgot Password</span>
                            </Link>

                            </div>
                        </div>

                        <button type="submit" className="bg-[#F9A51A] w-full text-black font-medium py-3 px-4 rounded focus:outline-none focus:bg-[#f9a31aa2] hover:bg-[#f9a31aa2]"
                            style={{ color: "black", transition: "color 0.3s" }}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#D48700'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = '#F9A51A'; e.target.style.color = '#000'; }}
                        >Login</button>
                        <p className="mt-4 font-medium text-center">Don’t have an account? <Link to={"/register"}><span className="text-[#F9A51A] underline"
                            style={{ transition: "font-size 0.3s, color 0.3s", fontSize: "1rem" }}
                            onMouseEnter={(e) => { e.target.style.fontSize = '1rem'; e.target.style.color = '#D48700'; }}
                            onMouseLeave={(e) => { e.target.style.fontSize = '0.95rem'; e.target.style.color = '#F9A51A'; }}
                        >Create an account</span></Link></p>
                    </form>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};

export default Login;

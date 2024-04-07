import { useContext, useEffect, useState } from "react";
import { Base_Url } from "../../../public/utils";
import Nav_2 from "../NavBar/Nav_2";
import SingleMember from "./SingleMember";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/Loader";
import { LinearGradient } from 'react-text-gradients'
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import Skeleton from "../Loader/Skeleton";
import './blink.css';


const AllMember = () => {
    const { setLoading, loading } = useContext(AuthContext)
    const [allUser, setAllUser] = useState([])
    const [display, setDisplay] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [nextCount, setNextCount] = useState(0);

    const [usersPerPage, setUsersPerPage] = useState(8);

    useEffect(() => {
        getAllMembers()

    }, []);
    useEffect(() => {
        console.log(nextCount);

    }, [nextCount]);

    useEffect(() => {
        const handleResize = () => {
            // Check if the screen size corresponds to md:grid-cols-3 (768px to 1023px)
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setUsersPerPage(9);
            } else {
                setUsersPerPage(8);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        if (allUser.length > 0) {
            setDisplay(allUser.slice(startIndex, startIndex + usersPerPage));
        }
    }, [allUser, startIndex, usersPerPage]);




    const handleNext = () => {
        if (startIndex + usersPerPage < allUser.length) {
            setStartIndex(startIndex + usersPerPage);
            setNextCount(nextCount + 1)

        }

    };

    const handlePrevious = () => {
        if (startIndex - usersPerPage >= 0) {
            setStartIndex(startIndex - usersPerPage);
            setNextCount(nextCount - 1)
        }
    };
    const handleSearch = () => {
        if (searchValue != "") {
            SearchMembers()
        } else {
            toast.warn("Your search box is empty");
        }
    };

    const SearchMembers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${Base_Url}/api/member/search/?query=${searchValue}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            const result = await response.json();
            if (result.success) {
                setDisplay(result.user_data)
                toast.success(result.message);

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
    const getAllMembers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${Base_Url}/api/member/all/`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            const result = await response.json();
            if (result.success) {
                setAllUser(result.user_data)

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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };



    return (

        <>

            {/* <div className="z-10">
                <Nav_2></Nav_2>

            </div> */}
            <div className=" h-[450px]  relative">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/family_banner.jpg)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        // zIndex: -1,
                    }}>
                    <div className="absolute inset-0 bg-black opacity-55"></div>
                    <Nav_2 home={true} style={{ zIndex: 100 }}></Nav_2>

                </div>

                {loading && <Loader></Loader>}


                <div className="hero">
                    <div className="hero-content text-center text-neutral-content relative z-10 top-[90%]">

                        <div className="">
                            <h1 className="mb-8 text-3xl md:text-5xl font-bold text-[#0B0B0B] uppercase"
                                style={{

                                    animation: 'pulse 2s infinite',

                                }}
                            >
                                <LinearGradient gradient={['to top left', '#17acff ,#ff68f0']}>
                                    I'm proud to be  a part of <span className="italic">Sonatundi's Family</span>
                                </LinearGradient>
                            </h1>


                            <div className="flex space-x-4">
                                <div className="flex justify-center rounded-md overflow-hidden w-full">
                                    <input
                                        onChange={(event) => setSearchValue(event.target.value)}
                                        onKeyPress={handleKeyPress}
                                        type="text"
                                        className="w-1/2 border border-solid border-gray-300 text-black  py-4 px-7 rounded-md rounded-r-none outline-none bg-gray-50 focus:border-gray-400 focus:bg-gray-200"
                                        placeholder="Search by Name or Email or Phone Number"

                                    />
                                    <button onClick={handleSearch} className="text-lg sm:w-36 sm:py-3 sm:px-7 md:w-36 md:py-4 md:px-8 rounded-r-md py-2 px-4 text-white font-semibold bg-[#FF444A] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out active:bg-[#FF2227]">
                                        Search
                                    </button>



                                </div>

                            </div>
                            {/* <button
        // onClick={handleSearchButton}
        className='py-[16.9px] px-7 text-white font-semibold bg-[#FF444A] rounded-lg  xs:rounded-tl-none xs:rounded-bl-none'>Search</button> */}
                        </div>
                    </div>
                </div>


            </div>

            <div className=" bg-gray-100 rounded-md max-w-7xl mx-auto mb-10">

                {
                    loading ? <>
                        <div className='p-8 mt-10 max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                        </div>
                    </>




                        : <>
                            {
                                display.length > 0 ? <>
                                    <div className='p-8 mt-10 max-w-7xl mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4'>

                                        {
                                            display.map(user => <SingleMember
                                                key={user.id}
                                                user={user}
                                            ></SingleMember>)
                                        }
                                    </div>
                                    <div className={`p-8 pb-4 flex justify-between ${allUser.length > 8 ? '' : 'hidden'}`}>
                                        <button
                                            className={`btn btn-warning w-24 ${nextCount === 0 ? 'disabled' : ''}`}
                                            onClick={nextCount === 0 ? null : handlePrevious}
                                            style={{
                                                cursor: nextCount === 0 ? 'not-allowed' : 'pointer',
                                                backgroundColor: nextCount === 0 ? '#CCCCCC' : '' // Gray color when disabled
                                            }}
                                        >
                                            Previous
                                        </button>

                                        <button
                                            className={`btn btn-warning w-24 ${display.length <= 8 ? 'disabled' : ''}`}
                                            onClick={display.length < 8 ? null : handleNext}
                                            style={{
                                                cursor: display.length < 8 ? 'not-allowed' : 'pointer',
                                                backgroundColor: display.length < 8 ? '#CCCCCC' : '' // Set gray color when disabled
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                                    : <NoRecordFound></NoRecordFound>
                            }
                        </>
                }



                <ToastContainer />
            </div>
        </>
    );
};

export default AllMember;

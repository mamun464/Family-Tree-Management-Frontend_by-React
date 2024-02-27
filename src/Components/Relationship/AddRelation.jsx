
import { useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Nav_2 from './../NavBar/Nav_2';
import { AuthContext } from '../../Provider/AuthProvider';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import SearchDropDown from './SearchDropDown';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from '../../../public/utils';

import PersonViewCard from './PersonViewCard';

const AddRelation = () => {
    const [display, setDisplay] = useState([])
    const [selectedPeople, setSelectedPeople] = useState(null)
    const [searchValue, setSearchValue] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedRelationship, setSelectedRelationship] = useState(null);

    // Function to handle selection
    const handleSelect = (relationship) => {
        setSelectedRelationship(relationship);
        setDropdownOpen(!dropdownOpen);
    };
    const handleRest = () => {
        setSelectedRelationship(null);
        setSelectedPeople(null);
    };

    const handleCancel = () => {
        setDisplay([])
    };
    const handlePeopleClick = (id) => {

        const specificElement = display.find(item => item.id == id);
        setSelectedPeople(specificElement)
        setDisplay([])
        // console.log(specificElement);
    };



    useEffect(() => {
        // SearchMembers()
        if (searchValue != "") {
            SearchMembers()
        }
        console.log(selectedRelationship);

    }, [searchValue]);

    useEffect(() => {
        // SearchMembers()

        console.log(loading);


    }, [loading]);

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
                setDisplay(result.user_data.slice(0, 4))
                // toast.success(result.message);

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
    return (
        <>
            <Nav_2></Nav_2>
            <section className=" py-1 bg-[#f1f5f9]">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    {/* {loading && (
                        <Loader></Loader>
                    )} */}
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#f1f5f9] border-0">
                        <div className="absolute flex bg-white bg-opacity-0 gap-5 px-4 py-4 mt-8 mb-4">
                            <button className="text-xl w- font-medium text-white py-2 px-6 bg-[#D72050]">Note</button>
                            <Marquee className="text-[#403F3F] text-[18px] font-semibold" pauseOnHover={true}>
                                <Link className='text-red-600'>`If your Parrent Account is not found in the list then please REGISTER first by your parents.`</Link>

                            </Marquee>
                        </div>
                        <div className="rounded-t bg-red-50 mb-0  pt-0">
                            <div className=" bg-[#f1f5f9] rounded-lg text-gray-900">
                                <div className="rounded-t-lg h-32 overflow-hidden">
                                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1708547347608-f30580b9a454?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Mountain' />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-16">
                            {/* stat */}
                            <div className="w-full max-w-screen-xl mx-auto px-6">

                                <div className="flex justify-center p-4 px-3 py-10">
                                    {/* here */}
                                    <div className="w-full max-w-md">
                                        <div className="bg-white shadow-md rounded-lg px-3 py-4 mb-4">
                                            {
                                                selectedPeople ? <div className=''>
                                                    <PersonViewCard
                                                        user={selectedPeople}
                                                    ></PersonViewCard>

                                                    <div className="dropdown">
                                                        <div tabIndex={0} role="button" className="btn m-1 mt-8" onClick={() => {
                                                            setDropdownOpen(false);
                                                        }}>
                                                            {selectedRelationship ? selectedRelationship : 'Select Relationship'}
                                                        </div>
                                                        {
                                                            !dropdownOpen ? <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Parent')}>Parent</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Spouse')}>Spouse</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Child')}>Child</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Sibling')}>Sibling</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Grandparent')}>Grandparent</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Grandchild')}>Grandchild</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Aunt')}>Aunt</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Uncle')}>Uncle</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Cousin')}>Cousin</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Niece')}>Niece</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('Nephew')}>Nephew</a></li>
                                                                <li><a className='dark:text-white font-medium' onClick={() => handleSelect('In-Law')}>In-Law</a></li>
                                                            </ul>

                                                                : <></>

                                                        }
                                                    </div>
                                                    {
                                                        selectedRelationship ? <>
                                                            <div className='flex justify-between mt-6 pb-2'>
                                                                <button onClick={handleRest} className="btn btn-error">REST</button>
                                                                <button className="btn btn-warning">Make Connection</button>
                                                            </div>
                                                        </>
                                                            :
                                                            <></>
                                                    }
                                                    <div>

                                                    </div>
                                                </div>
                                                    : <>
                                                        <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                                                            Search Your Related People
                                                        </div>
                                                        <div className="flex items-center bg-gray-200 rounded-md">
                                                            <div className="pl-2">
                                                                <svg className="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24">
                                                                    <path className="heroicon-ui"
                                                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                                                </svg>
                                                            </div>
                                                            <input
                                                                className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                                                onChange={(event) => setSearchValue(event.target.value)}
                                                                id="search" type="text" placeholder="Search By Name, Email, Phone no" />
                                                        </div>
                                                        <div className="py-3 text-sm">
                                                            {
                                                                display.map(user => <SearchDropDown
                                                                    key={user.id}
                                                                    user={user}
                                                                    handlePeopleClick={handlePeopleClick}
                                                                    loading={loading}
                                                                ></SearchDropDown>)
                                                            }

                                                        </div>
                                                        {
                                                            display.length > 0 ? <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-4 rounded-b-lg">
                                                                <button onClick={handleCancel} className="btn btn-error text-white font-bold py-2 px-4">
                                                                    Cancel
                                                                </button>

                                                            </div>
                                                                : <></>

                                                        }
                                                    </>
                                            }

                                        </div>
                                        {/* end here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <ToastContainer />
        </>
    );

};

export default AddRelation;
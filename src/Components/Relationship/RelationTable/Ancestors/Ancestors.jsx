
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdWork } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../../../../public/utils';
import { BsFillSignStopFill } from "react-icons/bs";
const Ancestors = ({ myProfile }) => {
    const [loading, setLoading] = useState(false);
    const [ancestors, setAncestors] = useState([])
    const { id, full_name, email, phone_no, place_of_birth, profession, date_of_birth, date_of_death, current_address, permanent_address, facebook, linkedin, instagram, is_alive, user_profile_img } = myProfile;


    useEffect(() => {
        if (id) {
            handleAncestors(id)
        }

    }, [id]);
    useEffect(() => {
        console.log("length of ancestors:------>", ancestors.length);
    }, [ancestors]);

    function getYearFromDate(dateString) {
        // Create a new Date object from the provided date string
        var dateObject = new Date(dateString);

        // Get the year from the date object
        var year = dateObject.getFullYear();

        // Return the year
        return year;
    }

    const handleAncestors = async (id) => {
        try {
            const authToken = getTokenFromLocalStorage();


            setLoading(true);

            const response = await axios.get(`${Base_Url}/api/member/ancestors/?person_id=${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            const result = response.data;

            if (result.success) {
                setAncestors(result.ancestors)
                console.log(result.ancestors);
                // toast.success(result.message);

            } else {
                handleError(result);
            }
        } catch (error) {
            handleError(error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error) => {
        console.error('Error handling connection:', error);

        if (error.status === 401) {
            // localStorage.clear();
            // window.location.reload();
            console.log(error.status);
        } else {
            toast.error(error.message || 'Connection create failed!');
        }
    };

    const getTokenFromLocalStorage = () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            console.log("Token not found");
        }

        return token;
    };

    return (
        <div className='bg-[#e3e3e3] m-8 rounded-md shadow-lg'>
            <VerticalTimeline>

                {
                    loading ? <VerticalTimelineElement >
                        <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-900">
                            <div className="flex p-4 space-x-4 sm:px-8">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
                                <div className="flex-1 py-2 space-y-4">
                                    <div className="w-full h-3 rounded bg-gray-700"></div>
                                    <div className="w-5/6 h-3 rounded bg-gray-700"></div>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 sm:px-8">
                                <div className="w-full h-4 rounded bg-gray-700"></div>
                                <div className="w-full h-4 rounded bg-gray-700"></div>
                                <div className="w-3/4 h-4 rounded bg-gray-700"></div>
                            </div>
                        </div>
                    </VerticalTimelineElement>
                        :
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date={<span className='text-[#94a3b8] font-bold uppercase'> {`${getYearFromDate(date_of_birth)} - ${is_alive ? 'Present' : (date_of_death ? getYearFromDate(date_of_death) : 'Not Defined')}`}</span>}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<img className='rounded-full' src={user_profile_img ? user_profile_img : "/UserProfile.jpg"} alt="Work"
                                style={{ width: '100%', height: '100%' }} />}
                        >
                            <h3 className="vertical-timeline-element-title text-2xl uppercase font-semibold ">{full_name}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{profession}</h4>
                            <p className='italic'>
                                <span className='font-medium '>Phone: <span className='font-normal'>{phone_no}</span></span>
                                <br />
                                <span className='font-medium' style={{ whiteSpace: 'pre-wrap' }}>Present Address: <span className='font-normal '>{permanent_address}</span></span>
                            </p>
                        </VerticalTimelineElement>
                }

                {
                    loading ? <VerticalTimelineElement >
                        <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-900">
                            <div className="flex p-4 space-x-4 sm:px-8">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
                                <div className="flex-1 py-2 space-y-4">
                                    <div className="w-full h-3 rounded bg-gray-700"></div>
                                    <div className="w-5/6 h-3 rounded bg-gray-700"></div>
                                </div>
                            </div>
                            <div className="p-4 space-y-4 sm:px-8">
                                <div className="w-full h-4 rounded bg-gray-700"></div>
                                <div className="w-full h-4 rounded bg-gray-700"></div>
                                <div className="w-3/4 h-4 rounded bg-gray-700"></div>
                            </div>
                        </div>
                    </VerticalTimelineElement>


                        :
                        ancestors.map(user => <VerticalTimelineElement
                            key={user.id}
                            className="vertical-timeline-element--work"
                            date={<span className='text-[#94a3b8] font-bold uppercase'> {`${getYearFromDate(user?.date_of_birth)} - ${user?.is_alive ? 'Present' : (user?.date_of_death ? getYearFromDate(user?.date_of_death) : 'Not Defined')}`}</span>}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<img className='rounded-full' src={user?.user_profile_img ? user?.user_profile_img : "/UserProfile.jpg"} alt="Work"
                                style={{ width: '100%', height: '100%' }} />}
                        >
                            <h3 className="vertical-timeline-element-title text-2xl uppercase font-semibold ">{user?.full_name}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{user?.profession}</h4>
                            <p className='italic'>
                                <span className='font-medium '>Phone: <span className='font-normal'>{user?.phone_no}</span></span>
                                <br />
                                <span className='font-medium' style={{ whiteSpace: 'pre-wrap' }}>Present Address: <span className='font-normal '>{user?.permanent_address}</span></span>
                            </p>
                        </VerticalTimelineElement>)
                }


                <VerticalTimelineElement
                    iconStyle={{ background: '#F9A51A', color: '#fff' }}
                    icon={<BsFillSignStopFill />}
                />
            </VerticalTimeline>
            <ToastContainer />
        </div >
    );
};

export default Ancestors;
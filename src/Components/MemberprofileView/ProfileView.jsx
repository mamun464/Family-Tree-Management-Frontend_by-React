import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import Ancestors from '../Relationship/RelationTable/Ancestors/Ancestors';
import { FaAngleDoubleDown } from "react-icons/fa";
import './BlinkingArrow.css';

const ProfileView = ({ user, loading }) => {


    // const [user, setUser] = useState(getProfileLocalStorage());
    const { full_name, email, phone_no, place_of_birth, profession, date_of_birth, date_of_death, current_address, permanent_address, facebook, linkedin, instagram, is_alive, user_profile_img } = user;


    return (
        <>
            <section className=" py-1 bg-[#f1f5f9]">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    {loading && (
                        <Loader></Loader>
                    )}
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#f1f5f9] border-0">
                        <div className="rounded-t bg-red-50 mb-0  pt-0">
                            <div className=" bg-[#f1f5f9] rounded-lg text-gray-900">
                                <div className="rounded-t-lg h-32 overflow-hidden">
                                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1708547347608-f30580b9a454?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Mountain' />
                                </div>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="mx-auto w-32 h-32 -mt-16 cursor-pointer">
                                        <div className="relative border-4 border-white rounded-full overflow-hidden h-full">
                                            {/* Display Profile Image */}
                                            <img
                                                className="object-cover object-center w-full h-full"
                                                src={user_profile_img ? user_profile_img : "/UserProfile.jpg"}
                                                alt="Profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-6">
                                <div className="w-full lg:w-6/12 px-4">
                                    {/* Display User Information */}
                                    <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                        User Information
                                    </h6>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Full Name:</span>
                                        <span className="font-medium ml-3">{full_name}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Email:</span>
                                        <span className="font-medium ml-3">{email}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Phone No:</span>
                                        <span className="font-medium ml-3">{phone_no}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Profession:</span>
                                        <span className="font-medium ml-3">{profession}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Date of Birth:</span>
                                        <span className="font-medium ml-3">{date_of_birth}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Place of Birth:</span>
                                        <span className="font-medium ml-3">{place_of_birth}</span>
                                    </p>
                                    {/* Display additional fields based on user's status */}
                                    {!is_alive && (
                                        <p className="text-[#475569] text-base mb-3 font-bold">
                                            <span className="italic">Date of Death:</span>
                                            <span className="font-medium ml-3">{date_of_death}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    {/* Display Contact Information */}
                                    <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                        Contact Information
                                    </h6>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Present Address:</span>
                                        <span className="font-medium ml-3">{current_address}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Permanent Address:</span>
                                        <span className="font-medium ml-3">{permanent_address}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Facebook:</span>
                                        <span className="font-medium ml-3">{facebook}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Instagram:</span>
                                        <span className="font-medium ml-3">{instagram}</span>
                                    </p>
                                    <p className="text-[#475569] text-base mb-3 font-bold">
                                        <span className="italic">Linkedin:</span>
                                        <span className="font-medium ml-3">{linkedin}</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <h6 className="flex flex-col text-[#94a3b8] text-center  mt-1 font-bold uppercase">
                            I am descended from the following ancestors
                            <span className='flex justify-center text-3xl mt-1 pulse'
                            
                            ><FaAngleDoubleDown /></span>
                        </h6>
                        <Ancestors
                            myProfile={user}
                        ></Ancestors>
                    </div>
                </div>
            </section>



        </>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object.isRequired
};

export default ProfileView;
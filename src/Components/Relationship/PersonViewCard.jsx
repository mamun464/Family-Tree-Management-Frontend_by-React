import { IoMailOpenOutline } from "react-icons/io5";
import { GiRotaryPhone } from "react-icons/gi";
const PersonViewCard = ({ user, loading }) => {
    const { id, full_name, email, phone_no, place_of_birth, profession, date_of_birth, date_of_death, current_address, permanent_address, facebook, linkedin, instagram, is_alive, user_profile_img } = user;

    return (
        <>
            {loading ? <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse dark:bg-gray-900">
                <div className="flex p-4 space-x-4 sm:px-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-700"></div>
                    <div className="flex-1 py-2 space-y-4">
                        <div className="w-full h-3 rounded dark:bg-gray-700"></div>
                        <div className="w-5/6 h-3 rounded dark:bg-gray-700"></div>
                    </div>
                </div>
                <div className="p-4 space-y-4 sm:px-8">
                    <div className="w-full h-4 rounded dark:bg-gray-700"></div>
                    <div className="w-full h-4 rounded dark:bg-gray-700"></div>
                    <div className="w-3/4 h-4 rounded dark:bg-gray-700"></div>
                </div>
            </div>

                : (
                    <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-900 text-gray-100 rounded-md ">
                        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                            <img src={user_profile_img ? user_profile_img : "/UserProfile.jpg"} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h2 className="text-2xl font-semibold">{full_name}</h2>
                                <span className="text-sm dark:text-gray-400">{profession}</span>
                            </div>
                            <div className="space-y-1 sm:flex sm:flex-col sm:space-y-0 sm:space-x-2 gap-3">
                                <span className="flex items-center space-x-2">
                                    <IoMailOpenOutline />
                                    <span className="text-xs dark:text-gray-400">{email}</span>
                                </span>
                                <span className="flex items-center  space-x-2">
                                    <GiRotaryPhone />
                                    <span className="text-xs dark:text-gray-400">{phone_no}</span>
                                </span>
                            </div>

                        </div>
                    </div>
                )}
        </>
    );
};

export default PersonViewCard;

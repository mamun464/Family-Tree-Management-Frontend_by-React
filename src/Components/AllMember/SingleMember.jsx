
import PropTypes from 'prop-types';
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const SingleMember = ({ user }) => {

    const { id, full_name, email, phone_no, place_of_birth, profession, date_of_birth, date_of_death, current_address, permanent_address, facebook, linkedin, instagram, is_alive, user_profile_img } = user;
    const handleClick = () => {
        // Navigate to the dynamically generated link
        window.location.href = `members/${id}`;
    };
    return (
        <div className="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100 cursor-pointer"
            onClick={handleClick}
        >
            <img src={user_profile_img ? user_profile_img : "/UserProfile.jpg"} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
            <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">{full_name}</h2>
                    <p className="px-5 text-xs sm:text-base dark:text-gray-400">{profession}</p>
                </div>
                <div className="flex justify-center pt-2 space-x-4 align-center">
                    <a rel="noopener noreferrer" href={`https://${facebook}`} aria-label="Facebook" target="_blank" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                        <FaFacebook />
                    </a>
                    <a rel="noopener noreferrer" href={linkedin} aria-label="Dribble" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                        <FaLinkedinIn />
                    </a>
                    <a rel="noopener noreferrer" href={instagram} aria-label="Twitter" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                        <FaInstagram />
                    </a>
                    <a rel="noopener noreferrer" href={`mailto:${email}`} aria-label="Email" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
                            <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div >
    );
};

SingleMember.propTypes = {
    user: PropTypes.object.isRequired
};

export default SingleMember;
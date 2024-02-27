

const SearchDropDown = ({ user }) => {
    const { id, full_name, email, phone_no, place_of_birth, profession, date_of_birth, date_of_death, current_address, permanent_address, facebook, linkedin, instagram, is_alive, user_profile_img } = user;

    return (
        <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
            <div className="avatar">
                <div className="w-6 rounded">
                    <img src={user_profile_img ? user_profile_img : "/UserProfile.jpg"}
                        alt="Tailwind-CSS-Avatar-component" />
                </div>
            </div>

            <div className="flex-grow font-medium px-2">{full_name}</div>
            <div className="text-sm font-normal text-gray-500 tracking-wide">{phone_no}</div>
        </div>
    );
};

export default SearchDropDown;
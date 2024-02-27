

const SearchDropDown = ({ user, handlePeopleClick, loading }) => {
    const { id, full_name, email, phone_no, place_of_birth, profession, date_of_birth, date_of_death, current_address, permanent_address, facebook, linkedin, instagram, is_alive, user_profile_img } = user;
    const handleClicPeople = () => {
        handlePeopleClick(id)
    };
    return (
        <>{
            loading ? <>
                <div className="w-full py-4 rounded shadow-md animate-pulse bg-gray-900 mb-4">
                    <div className="flex p-4 space-x-4 sm:px-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
                        <div className="flex-1 py-2 space-y-4">
                            <div className="w-full h-3 rounded bg-gray-700"></div>
                            <div className="w-5/6 h-3 rounded bg-gray-700"></div>
                        </div>
                    </div>
                    {/* <div className="p-4 space-y-4 sm:px-8">
                        <div className="w-full h-4 rounded dark:bg-gray-700"></div>
                        <div className="w-full h-4 rounded dark:bg-gray-700"></div>
                        <div className="w-3/4 h-4 rounded dark:bg-gray-700"></div>
                    </div> */}
                </div>

            </>

                : <>
                    <div onClick={handleClicPeople} className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <div className="avatar">
                            <div className="w-6 rounded">
                                <img src={user_profile_img ? user_profile_img : "/UserProfile.jpg"}
                                    alt="Tailwind-CSS-Avatar-component" />
                            </div>
                        </div>

                        <div className="flex-grow font-medium px-2">{full_name}</div>
                        <div className="text-sm font-normal text-gray-500 tracking-wide">{phone_no}</div>
                    </div>
                </>
        }
        </>
    );
};

export default SearchDropDown;
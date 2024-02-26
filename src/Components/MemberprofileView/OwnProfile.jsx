import { useState } from "react";
import { getProfileLocalStorage } from "../../Utils/Utils";
import ProfileView from "./ProfileView";
import Nav_2 from "../NavBar/Nav_2";


const OwnProfile = () => {
    const [user] = useState(getProfileLocalStorage());
    return (
        <>
            <Nav_2 bgColor="#f1f5f9" />
            <ProfileView
                user={user}
            ></ProfileView>
        </>
    );
};

export default OwnProfile;
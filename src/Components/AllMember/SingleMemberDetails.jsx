import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Base_Url } from "../../../public/utils";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import ProfileView from "../MemberprofileView/ProfileView";
import { getTokenFromLocalStorage } from "../../Utils/Utils";
import Nav_2 from "../NavBar/Nav_2";


const SingleMemberDetails = () => {
    const { setLoading, loading } = useContext(AuthContext)
    const [token, setToken] = useState(getTokenFromLocalStorage());
    const { id } = useParams();
    const [singleUser, setSingleUser] = useState({})
    useEffect(() => {
        setToken(getTokenFromLocalStorage())
        getAllMembers()
    }, []);

    useEffect(() => {
        console.log("LOad The user: ", singleUser, id);
    }, [singleUser]);

    const getAllMembers = async () => {

        try {
            const response = await fetch(`${Base_Url}/api/member/single/?user_id=${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`,
                },

            });

            const result = await response.json();
            if (result.success) {
                setSingleUser(result.user_data)
                console.log("User Set Success");

            }
            else if (result.status === 401) {

                localStorage.clear();
                window.location.reload();
            } else {

                console.log("--------->False Response");
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
            <ProfileView
                user={singleUser}
                loading={loading}

            ></ProfileView>
            <ToastContainer />
        </>
    );
};

export default SingleMemberDetails;
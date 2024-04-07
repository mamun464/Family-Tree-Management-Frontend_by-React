import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Base_Url } from "../../../public/utils";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import ProfileView from "../MemberprofileView/ProfileView";
import { getTokenFromLocalStorage } from "../../Utils/Utils";
import Nav_2 from "../NavBar/Nav_2";
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'


const SingleMemberDetails = () => {
    const { setLoading, loading } = useContext(AuthContext)
    const [token, setToken] = useState(getTokenFromLocalStorage());
    const { id } = useParams();
    const [singleUser, setSingleUser] = useState({})
    useEffect(() => {
        setToken(getTokenFromLocalStorage())
        getAllMembers()
    }, []);

    // useEffect(() => {
    //     console.log("LOad The user: ", singleUser, id);
    // }, [singleUser]);

    const getAllMembers = async () => {
        setLoading(true);
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
                if (result.status == 404) {
                    Swal.fire({
                        icon: "error",
                        title: "404-Not Found",
                        text: "Member Maybe deleted from database",
                        // footer: '<a href="#">Why do I have this issue?</a>',
                        // showCancelButton: false,
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        // Check if the user clicked the "OK" button
                        if (result.isConfirmed) {
                            // Redirect to the home page
                            window.location.href = '/'; // Replace '/' with the URL of your home page
                        }
                    });
                }


            }
            else if (result.status === 401) {

                localStorage.clear();
                window.location.reload();
            } else {

                // console.log("--------->False Response");
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
            {

                singleUser && Object.keys(singleUser).length > 0 ? (
                    <ProfileView
                        user={singleUser}
                        loading={loading}
                    />
                ) : (
                    <></>
                )
            }
            <ToastContainer />
        </>
    );
};

export default SingleMemberDetails;
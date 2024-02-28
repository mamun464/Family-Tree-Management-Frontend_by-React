import { RiDeleteBinLine } from "react-icons/ri";
import { Base_Url } from "../../../../public/utils";
import axios from 'axios';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Table = () => {
    const [loading, setLoading] = useState(false);
    const [relationData, setRelationData] = useState(null)

    useEffect(() => {

        handleConnection()

    }, []);

    const handleConnection = async () => {

        try {
            const authToken = getTokenFromLocalStorage();


            setLoading(true);

            const response = await axios.get(`${Base_Url}/api/member/member-connections/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            const result = response.data;

            if (result.success) {
                setRelationData(result?.connected_person)
                toast.success(result.message);

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
            localStorage.clear();
            window.location.reload();
        } else {
            toast.error(error.message || 'Connection create failed!');
        }
    };

    const getTokenFromLocalStorage = () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            console.log("Token not found");
        }
        console.log(token);
        return token;
    };

    console.log(relationData);

    return (
        <div className="overflow-x-auto">
            {loading && (
                <div className="w-full py-4 rounded shadow-md animate-pulse bg-gray-900 mb-4">
                    <div className="flex p-4 space-x-4 sm:px-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
                        <div className="flex-1 py-2 space-y-4">
                            <div className="w-full h-3 rounded bg-gray-700"></div>
                            <div className="w-5/6 h-3 rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>
            )}

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Relationship</th>
                        <th>Phone No.</th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {!loading && relationData.map((data, index) => (

                        <tr key={data.id} className="group hover:bg-green-100">
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={data?.related_person_details?.user_profile_img ? data?.related_person_details?.user_profile_img : "/UserProfile.jpg"} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{data?.related_person_details?.full_name}</div>
                                        <div className="text-sm opacity-50">{data?.related_person_details?.place_of_birth}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-ghost badge-lg group-hover:bg-green-200">{data?.relationship_type}</span>
                            </td>
                            <td>{data?.related_person_details?.phone_no}</td>
                            <td className="px-6 py-4">
                                <div className='flex gap-4 text-xl'>
                                    <span className='cursor-pointer transform hover:scale-125 transition-transform duration-300 hover:text-red-500'><RiDeleteBinLine /></span>
                                </div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default Table;

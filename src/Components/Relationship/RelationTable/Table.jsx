import { RiDeleteBinLine } from "react-icons/ri";
import { Base_Url } from "../../../../public/utils";
import axios from 'axios';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoRecordFound from "../../NoRecordFound/NoRecordFound";

import Swal from 'sweetalert2'


const Table = () => {
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState([])
    const [relationData, setRelationData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const usersPerPage = 5;

    const isLastPage = pageNumber === Math.ceil(relationData.length / 5);
    const isFistPage = pageNumber === 1;

    const LastButtonStyles = {
        backgroundColor: isLastPage ? '#808080' : '#FFBE00',
        cursor: isLastPage ? 'not-allowed' : 'pointer',
    };
    const FirstButtonStyles = {
        backgroundColor: isFistPage ? '#808080' : '#FFBE00',
        cursor: isFistPage ? 'not-allowed' : 'pointer',
    };


    useEffect(() => {

        handleConnection()

    }, []);

    useEffect(() => {
        if (relationData.length > 0) {
            setDisplay(relationData.slice(startIndex, startIndex + usersPerPage));
        }
    }, [relationData, startIndex]);



    const handleDisconnection = async (relationId) => {

        try {
            const authToken = getTokenFromLocalStorage();


            setLoading(true);

            const response = await axios.delete(`${Base_Url}/api/member/disconnected/?connection_id=${relationId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            const result = response.data;

            if (result.success) {
                // setRelationData(result?.connected_person)
                setDisplay(display.filter(item => item.id !== relationId))
                setRelationData(display.filter(item => item.id !== relationId))
                Swal.fire({
                    title: "Deleted!",
                    text: result.message || "Successfully deleted the relation",
                    icon: "success"
                }).then((result) => {
                    // If the "OK" button is clicked or the modal is closed
                    if (result.isConfirmed || result.isDismissed) {
                        // Delay reload by 2 seconds
                        window.location.reload();
                        // setTimeout(() => {

                        // }, 2000);
                    }
                });

                // toast.success(result.message);
                // console.log("I am Here");

            } else {
                handleError(result);
                // console.log("I am Here");
            }
        } catch (error) {
            handleError(error.response ? error.response.data : error);
            // console.log("I am Here");
        } finally {
            setLoading(false);
        }
    };
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
                const data = result?.connected_person;
                setRelationData(data.reverse())
                // toast.success(result.message);
                // handleError(result.message);


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
        // console.error('Error handling connection:', error);

        if (error.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong.",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
            // toast.error(error.message || 'Connection create failed!');
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

    const handleNext = () => {
        if (startIndex + usersPerPage < relationData.length) {
            setStartIndex(startIndex + usersPerPage);
            // console.log("Full size:", allUser.length);
            setPageNumber(pageNumber + 1)
        }

    };

    const handlePrevious = () => {
        if (startIndex - usersPerPage >= 0) {
            setStartIndex(startIndex - usersPerPage);
            setPageNumber(pageNumber - 1)
        }
    };
    const handleDeleteConnection = (relationId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDisconnection(relationId)
            }
        });

    };

    return (
        <div className="overflow-x-auto">
            {loading ?
                <div className="w-full py-4 rounded shadow-md animate-pulse bg-gray-900">
                    <div className="flex p-4 space-x-4 sm:px-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-700"></div>
                        <div className="flex-1 py-2 space-y-4">
                            <div className="w-full h-3 rounded bg-gray-700"></div>
                            <div className="w-5/6 h-3 rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>

                : <table className="table">
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
                    {display.length > 0 ? (
                        <tbody>
                            {/* rows */}
                            {!loading && display.map((data, index) => (
                                <tr key={data.id} className="group hover:bg-green-100">
                                    <th>{relationData.length - startIndex - index}</th>
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
                                        <span className="badge badge-ghost badge-lg font-medium group-hover:bg-green-200">{data?.relationship_type}</span>
                                    </td>
                                    <td>{data?.related_person_details?.phone_no}</td>
                                    <td className="px-6  py-4">
                                        <div className='flex gap-4 text-xl'>
                                            <span
                                                onClick={() => handleDeleteConnection(data.id)}
                                                className='btn bg-opacity-0 hover:bg-opacity-0 cursor-pointer transform hover:scale-125 transition-transform duration-300 hover:text-red-500'><RiDeleteBinLine /></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-[#233255CC] border font-bold text-2xl text-center py-7">
                                    <div className='text-center'>Record Not Found! <br /> You don't have any relationship with someone!</div>
                                </td>
                            </tr>
                        </tbody>
                    )}


                    <tfoot className={relationData.length > 5 ? '' : 'hidden'} >
                        <tr>
                            {/* <th></th> */}
                            <th colSpan={1} >
                                <div className='flex gap-7'>
                                    <button
                                        className='btn w-20 text-[#344054] py-2 px-[14px] text-[14px] font-semibold bg-gray-200 rounded-lg custom-import flex items-center gap-2 hover:bg-[#F9A51A] hover:text-[#fff]'
                                        onClick={handlePrevious}
                                        // disabled={isFistPage}
                                        style={FirstButtonStyles}
                                    >
                                        Previous
                                    </button>
                                </div>
                            </th>
                            <th colSpan={2} className="">
                                <div className=" text-[#344054] font-medium">
                                    <h1 className="text-center">Page {pageNumber} of {Math.ceil(relationData.length / 5)}</h1>
                                    {/* <h1 className="text-center">Page</h1> */}
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className='flex justify-end gap-7'>
                                    <button
                                        className={`btn w-20 text-[#344054] py-2 px-[14px] text-[14px] font-semibold bg-gray-200 rounded-lg custom-import flex items-center gap-2 hover:bg-[#F9A51A] hover:text-[#fff] ${!isLastPage ? 'cursor-pointer' : 'cursor-not-allowed'
                                            }`}
                                        onClick={handleNext}
                                        style={LastButtonStyles}
                                    // disabled={isLastPage}
                                    >
                                        Next
                                    </button>
                                </div>
                            </th>

                        </tr>
                    </tfoot>
                </table>
            }


            {/* <ToastContainer /> */}
        </div >
    );
};

export default Table;

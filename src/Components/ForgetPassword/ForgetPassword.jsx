
import "./ResetForm.css"

import './BlinkingArrow.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Base_Url } from "../../../public/utils";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const ForgetPassword = () => {
  const { userId, token } = useParams();
  const { setLoading, loading } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);

  };

  const handleResetSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();

    try {
      // console.log("Starting cheaking...");
      setLoading(true)
      const response = await fetch(`${Base_Url}/api/member/rest-password/${userId}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, password2 })
      });

      const result = await response.json();
      if (result.success) {

        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result?.message || "Password Changed Successfully",
          // footer: '<a href="#">Why do I have this issue?</a>',
          // showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          // Check if the user clicked the "OK" button
          if (result.isConfirmed) {
            // Redirect to the home page
            window.location.href = '/login'; // Replace '/' with the URL of your home page
          }
        });

      } else {
        // toast.error(result?.message);
        console.log(result?.message);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result?.message || "Something went wrong.",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Something went wrong.",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      // toast.error(`Mail sent Failed! ${error.message}`);
    } finally {
      setLoading(false);
    }



    // setShowModal(false)

    // You can add logic here to actually send the recovery email
  }

  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/family_banner.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          // zIndex: -1,
        }}>
        <div className="absolute inset-0 bg-black opacity-75"></div>

        <div className=" cover flex z-5  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-16">
          <img
            className="mt-4 mb-3"
            align="center"
            border="0"
            src="/family_logo.png"
            alt="Image"
            title="Image"
            style={{
              outline: "none",
              textDecoration: "none",
              msInterpolationMode: "bicubic",
              clear: "both",
              display: "inline-block !important",
              border: "none",
              height: "auto",
              float: "none",
              width: "30%",
              maxWidth: "58px"
            }}
            width="58"
          />
          <div className=" w-full bg-[#161A39] h-24 flex justify-center items-center gap-2 mb-6 px-4">
            <img
              align="center"
              border="0"
              src="https://i.ibb.co/SBKCXMn/image-1.png"
              alt="Image"
              title="Image"
              style={{
                outline: "none",
                textDecoration: "none",
                msInterpolationMode: "bicubic",
                clear: "both",
                display: "inline-block !important",
                border: "none",
                height: "auto",
                float: "none",
                width: "10%",
                maxWidth: "58px"
              }}
              width="58"
            />
            <h1 className="text-white text-2xl">Please Reset Your Password</h1>
          </div>

          <div className="w-full relative flex flex-col gap-5 items-center">

            <input
              className="input-reset text-base p-4 "
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="absolute right-8 top-1.5 mt-2.5 mr-3 text-2xl text-gray-600 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
            <input
              className="input-reset text-base p-4"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />


          </div>
          <button

            onClick={!loading ? handleResetSubmit : undefined}
            type="submit" className={`btn reset-btn border-0 text-white hover:bg-[#161A39] ${loading ? 'cursor-not-allowed bg-[#161A39] text-white' : ''} mt-6`}>
            {
              loading ? <span >
                <i className="fa fa-spinner fa-spin"></i> Loading
              </span>
                : "RESET"


            }
          </button>


        </div>

      </div>

    </>
  );
};

export default ForgetPassword;
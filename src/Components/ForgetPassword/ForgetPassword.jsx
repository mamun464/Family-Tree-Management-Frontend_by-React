
import "./ResetForm.css"

import './BlinkingArrow.css';

const ForgetPassword = () => {


  return (
    <>

      {/* <div className="flex justify-center items-center  bg-white">
        <div className=" my-4 bg-white p-8 rounded  w-full md:w-1/2">
          <h1 className="text-2xl text-center font-bold">Under Development: Password Recovery!</h1>
          <p className="text-center pulse font-medium">Till then, please contact the developer from the footer.</p>
        </div>
      </div> */}
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

          <div className=" w-full  flex flex-col gap-5 items-center">
            <input className="text-base p-4" type="password" placeholder="New Password" />
            <input className="text-base p-4" type="password" placeholder="Confirm New Password" />


          </div>
          <button className="btn login-btn border-0 text-white hover:bg-[#161A39] mt-6 " >RESET</button>


        </div>

      </div>

    </>
  );
};

export default ForgetPassword;
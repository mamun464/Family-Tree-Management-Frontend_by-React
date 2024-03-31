import Nav_2 from "../NavBar/Nav_2";

import './BlinkingArrow.css';
import PasswordResetEmailModal from "./PasswordResetEmailModal";


const ForgetPassword = () => {


    return (
        <>
            <Nav_2 />
            <div className="flex justify-center items-center  bg-white">
      <div className=" my-4 bg-white p-8 rounded  w-full md:w-1/2">
        <h1 className="text-2xl text-center font-bold">Under Development: Password Recovery!</h1>
        <p className="text-center pulse font-medium">Till then, please contact the developer from the footer.</p>
      </div>
    </div>
    <PasswordResetEmailModal></PasswordResetEmailModal>
        </>
    );
};

export default ForgetPassword;
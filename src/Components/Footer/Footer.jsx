

import { IoMail } from "react-icons/io5";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer className="footer  p-10 pt-7 bg-neutral text-neutral-content">

            <aside>
                <h1 className="text-xl mb-1">Developed by</h1>
                <div className="avatar">
                    <div className="w-20 rounded-xl">
                        <img src="/mamunNew.jpg" />
                    </div>
                </div>

                <p className="space-y-2"><span >Md Mamunur Rashid</span><br />
                    Software Engineer  <br />
                    Red Dot Digital || Robi Axiata Ltd <br />
                    <p className="">

                        <span className="flex items-center gap-1">
                            <IoMail></IoMail><span className="pb-1">mrashid.uiu.cse@gmail.com</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <FaPhoneSquareAlt /><span className="">+880-1767213613</span>
                        </span>
                    </p>
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4 text-xl items-center">

                    <Link to={"https://www.facebook.com/mrashid.uiu"}><FaFacebookF /></Link>
                    <Link to={"https://www.linkedin.com/in/mamunur-rashid-162130/"}><FaLinkedinIn /></Link>
                    <Link to={"https://github.com/mamun464"}><FaGithub /></Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
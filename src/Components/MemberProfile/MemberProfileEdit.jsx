import { useRef, useState } from 'react';
import Nav_2 from '../NavBar/Nav_2';
import { FaUpload } from "react-icons/fa6";


const MemberProfileEdit = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImage(imageUrl);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    return (
        <>
            <Nav_2 bgColor="#f1f5f9" />
            <section className=" py-1 bg-[#f1f5f9]">

                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#f1f5f9] border-0">

                        <div className="rounded-t bg-red-50 mb-0  pt-0">
                            <div
                                className=" bg-[#f1f5f9] rounded-lg text-gray-900">
                                <div className="rounded-t-lg h-32 overflow-hidden">
                                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1708547347608-f30580b9a454?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Mountain' />
                                </div>
                                <div className="mx-auto w-32 h-32 -mt-16 cursor-pointer" onClick={handleClick} title="Click to upload image">
                                    {/* Image Container */}
                                    <div className="relative border-4 border-white rounded-full overflow-hidden h-full">
                                        {/* Image */}
                                        {selectedImage ? (
                                            <img
                                                className="object-cover object-center w-full h-full"
                                                src={selectedImage}
                                                alt="Uploaded"
                                            />
                                        ) : (
                                            <img
                                                className="object-cover object-center w-full h-full"
                                                src="/UserProfile.jpg"
                                                alt="Woman looking front"
                                            />
                                        )}
                                        {/* Overlay */}
                                        <div
                                            className="h-[70%] top-[70%] absolute inset-0 pt-2 flex items-center flex-col text-white bg-black bg-opacity-60"

                                        >
                                            <span>
                                                <FaUpload />
                                            </span>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                    User Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-[#FDE68A] w-full ease-linear transition-all duration-150"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                First Name
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="Lucky" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Last Name
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="Jesse" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-[#cbd5e1]" />

                                <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                    Contact Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Address
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                City
                                            </label>
                                            <input type="email" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="New York" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Country
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="United States" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                Postal Code
                                            </label>
                                            <input type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="Postal Code" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-[#cbd5e1]" />

                                <h6 className="text-[#94a3b8] text-sm mt-3 mb-6 font-bold uppercase">
                                    About Me
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-[#475569] text-xs font-bold mb-2" >
                                                About me
                                            </label>
                                            <textarea type="text" className="border-0 px-3 py-3 placeholder-[#cbd5e1] text-[#475569] bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4"> A beautiful UI Kit and Admin for JavaScript &amp; Tailwind CSS. It is Freeand Open Source.</textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>

            </section>
        </>
    );
};

export default MemberProfileEdit;
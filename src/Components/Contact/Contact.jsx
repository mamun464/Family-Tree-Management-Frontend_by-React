
import Nav_2 from './../NavBar/Nav_2';


const Contact = () => {
    return (
        <div>
            <Nav_2></Nav_2>
            <div className="space-y-12 bg-white text-gray-600">

                <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
                    <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's Solve!</h2>
                            <div className="text-gray-400">If you face any problem then contact us through this form or in case of emergency contact us by phone which is given in the footer section.</div>
                        </div>
                        <img src="/help.png" alt="Contact our customer support" className="p-6 h-52 md:h-64" />
                    </div>
                    <form novalidate="" className="space-y-6">
                        <div>
                            <label for="name" className="text-sm">Full name</label>
                            <input id="name" type="text" placeholder="" className="w-full p-3 rounded bg-gray-100" />
                        </div>
                        <div>
                            <label for="email" className="text-sm">Email</label>
                            <input id="email" type="email" className="w-full p-3 rounded bg-gray-100" />
                        </div>
                        <div>
                            <label for="message" className="text-sm">Message</label>
                            <textarea id="message" rows="3" className="w-full p-3 rounded bg-gray-100"></textarea>
                        </div>
                        <button type="submit" className="btn w-full p-3 text-sm font-bold tracki uppercase rounded bg-violet-400 text-gray-900 hover:text-white">Send Message</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;
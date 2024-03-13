import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Nav_2 from "../NavBar/Nav_2";


const Home = () => {
    const [user, setUser] = useState("");
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));

    }, []);

    return (
        <>
            <Nav_2 />
            <h1 className="text-5xl">Home Page: {user.full_name}</h1>
        </>
    );
};

export default Home;
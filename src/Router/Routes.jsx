import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Login from './../Components/Login/Login';
import Home from "../Components/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import Registration from './../Components/Registration/Registration';
import MemberProfileEdit from "../Components/MemberProfile/MemberProfileEdit";



const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <PrivateRoutes><Home></Home></PrivateRoutes>

            },
            {
                path: "login/",
                element: <Login></Login>

            },
            {
                path: "register/",
                element: <Registration></Registration>

            },
            {
                path: "profile/",
                element: <MemberProfileEdit></MemberProfileEdit>

            },



        ]
    }
])

export default Routes;
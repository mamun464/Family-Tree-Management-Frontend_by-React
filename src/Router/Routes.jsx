import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Login from './../Components/Login/Login';
import Home from "../Components/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import Registration from './../Components/Registration/Registration';
import MemberProfileEdit from "../Components/MemberProfile/MemberProfileEdit";
import Test from "../Components/MemberProfile/Test";
import App from "../App";
import ProfileView from "../Components/MemberprofileView/ProfileView";
import OwnProfile from "../Components/MemberprofileView/OwnProfile";
import AllMember from "../Components/AllMember/AllMember";
import SingleMemberDetails from "../Components/AllMember/SingleMemberDetails";



const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            // {
            //     path: "/",
            //     element: <PrivateRoutes><Home></Home></PrivateRoutes>

            // },
            {
                path: "/",
                element: <AllMember></AllMember>

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
                path: "profile-edit/",
                element: <PrivateRoutes><MemberProfileEdit></MemberProfileEdit></PrivateRoutes>

            },
            {
                path: "my-profile/",
                element: <PrivateRoutes><OwnProfile></OwnProfile></PrivateRoutes>

            },

            {
                path: "members/:id",
                element: <PrivateRoutes><SingleMemberDetails></SingleMemberDetails></PrivateRoutes>

            },



        ]
    }
])

export default Routes;
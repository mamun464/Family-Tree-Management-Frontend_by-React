import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root";
import Login from './../Components/Login/Login';
import PrivateRoutes from "./PrivateRoutes";
import Registration from './../Components/Registration/Registration';
import MemberProfileEdit from "../Components/MemberProfile/MemberProfileEdit";
import OwnProfile from "../Components/MemberprofileView/OwnProfile";
import AllMember from "../Components/AllMember/AllMember";
import SingleMemberDetails from "../Components/AllMember/SingleMemberDetails";
import AddRelation from "../Components/Relationship/AddRelation";
import Contact from "../Components/Contact/Contact";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
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
                path: "contact/",
                element: <Contact></Contact>
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
            {
                path: "connection/",
                element: <PrivateRoutes>
                    <AddRelation></AddRelation>
                </PrivateRoutes>
            }
        ]
    },
    {
        path: ":userId/:token/",
        element: <ForgetPassword></ForgetPassword>
    }
]);


export default Routes;
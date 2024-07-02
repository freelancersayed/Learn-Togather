import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Shared/Login/Login";
import SignUp from "../Pages/Shared/Login/SignUp";
import About from "../Pages/NavItem/About";
import Contact from "../Pages/NavItem/Contact";
import PrivetRout from "./PrivetRout";
import DashBoard from "../DashBoard/DashBoard";
import TutorDashBoard from "../DashBoard/TutorDashBoard/TutorDashBoard";
import StudentDashBoar from "../DashBoard/StudentDashBoard/StudentDashBoar";
import StudyDetails from "../Pages/StudySection/StudyDetails";
import TutorForm from "../Pages/TutorSection/TutorForm";
import CreateStudySession from "../Pages/TutorSection/CreateStudyForm";
import AllSession from "../Pages/TutorSection/AllSession";
import UploadedForm from "../Pages/TutorSection/UploadedForm";
import ViewAllMaterials from "../Pages/TutorSection/ViewAllMaterials";
import ApprovedSession from "../Pages/TutorSection/ApprovedSession";
import Alluser from "../DashBoard/AdminDashBoard/Alluser";
import AllSessionAdmin from "../DashBoard/AdminDashBoard/AllSessionAdmin";
import AllMaterielsAdmin from "../DashBoard/AdminDashBoard/AllMaterielsAdmin";
import TecherHome from "../Pages/TutorSection/TecherHome";
// import PendingSession from "../DashBoard/AdminDashBoard/PendingSession";
import AdminHome from "../DashBoard/AdminDashBoard/AdminHome";
import CreateNoteForm from "../DashBoard/StudentDashBoard/CreatNote";
import PersonalNote from "../DashBoard/StudentDashBoard/PersonalNote";
import AllStudent from "../DashBoard/StudentDashBoard/AllStudent";
import NotFound from "../Pages/ErrorPage/ErrorPage";
import AllCourse from "../Pages/AllCourse";
import AnnouncementForm from "../DashBoard/AdminDashBoard/AnnowuncementForm";
import AnnouncementList from "../DashBoard/AdminDashBoard/AnnowuncementUi";






export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signUp',
          element: <SignUp></SignUp>
        },
        {
          path: 'about',
          element: <About></About>
        },
        {
          path: 'course',
          element: <AllCourse></AllCourse>
        },
        {
          path: 'contact',
          element: <AnnouncementList></AnnouncementList>
        },
        {
          path: 'study-details/:_id',
          element: <PrivetRout><StudyDetails></StudyDetails></PrivetRout>,
          loader: ()=>fetch('https://learn-together-server-lemon.vercel.app/study-session')
        },
        {
          path: 'dashboard',
          element: <PrivetRout><DashBoard></DashBoard></PrivetRout>,
          children: [
            {
              path: 'all-user',
              element: <PrivetRout><Alluser></Alluser></PrivetRout>
            },
            {
              path: 'all-session-admin',
              element: <PrivetRout><AllSessionAdmin></AllSessionAdmin></PrivetRout>
            },
            {
              path: 'all-materiel-admin',
              element: <PrivetRout><AllMaterielsAdmin></AllMaterielsAdmin></PrivetRout>
            },
            // {
            //   path: 'pending-session',
            //   element: <PendingSession></PendingSession>
            // },
            {
              path: 'admin-home',
              element: <PrivetRout><AnnouncementForm></AnnouncementForm></PrivetRout>
            },
            {
              path: 'tutor',
              element: <PrivetRout><TutorDashBoard></TutorDashBoard></PrivetRout>
            },
            {
              path: 'tutor-home',
              element: <PrivetRout><TecherHome></TecherHome></PrivetRout>
            },
            {
              path: 'student',
              element: <PrivetRout><StudentDashBoar></StudentDashBoar></PrivetRout>
            },
            {
              path: 'tutorForm',
              element: <PrivetRout><TutorForm></TutorForm></PrivetRout>
            },
            {
              path: 'form',
              element: <PrivetRout><CreateStudySession></CreateStudySession></PrivetRout>
            },
            {
              path: 'all-session',
              element: <PrivetRout><AllSession></AllSession></PrivetRout>
            },
            {
              path: 'uploadedform',
              element: <PrivetRout><UploadedForm></UploadedForm></PrivetRout>
            },
            {
              path: 'approved-session',
              element: <PrivetRout><ApprovedSession></ApprovedSession></PrivetRout>
            },
            {
              path: 'all-materials',
              element: <PrivetRout><ViewAllMaterials></ViewAllMaterials></PrivetRout>
            },
            {
            path: 'note-form',
            element: <PrivetRout><CreateNoteForm></CreateNoteForm></PrivetRout>
            },
            {
            path: 'personal-note',
            element: <PrivetRout><PersonalNote></PersonalNote></PrivetRout>
            },
            {
              path: 'all-student',
              element: <PrivetRout><AllStudent></AllStudent></PrivetRout>
            }
          ]
        }
    ]
  },
]);

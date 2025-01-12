import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Common/Navbar";
import Aboutus from "./Pages/Aboutus";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./components/Core/Dashboard/MyProfile";
import OpenRoute from "./components/Core/Auth/OpenRoute";
import Error from './Pages/Error';
import Dashboard from './Pages/Dashboard'
import Settings from "./Pages/Settings";
import EnrolledCourses from "./components/Core/Dashboard/EnrolledCourses";
import Cart from "./components/Core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./components/Core/Dashboard/My Courses/index";
import AddCourse from "./components/Core/Dashboard/AddCourse";
import EditCourse from "./components/Core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetail from "./components/Core/Catalog/CourseDetails/CourseDetail";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/Core/ViewCourse/VideoDetails";
import Instructor from "./components/Core/Dashboard/InstructorDashboard.jsx/Instructor";

function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<Aboutus/>}/>
        <Route path="/resetpassword" element={<ForgotPassword/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/category/:categoryName" element={<Catalog/>}/>
        <Route path="/course/:courseId" element={<CourseDetail/>}/>

        <Route element={
          <OpenRoute>
            <ViewCourse/>
          </OpenRoute>
        }>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
          )
        }
        </Route>

        <Route element={
          <OpenRoute>
            <Dashboard/>
          </OpenRoute>
        }>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/wishlist" element={<Cart/>}/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                <Route path="/dashboard/instructor" element={<Instructor/>}/>
              </>
            )
          }
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;

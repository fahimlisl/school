import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/website/Home.jsx";
import Login from "./pages/auth/Login.jsx";

// layouts
import AdminLayout from "./components/layout/AdminLayout.jsx";

// pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
// import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import TeacherDashboard from "./pages/teacher/Dashboard.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import About from "./pages/website/About.jsx";
import Courses from "./pages/website/Courses.jsx";
import Gallery from "./pages/website/Gallery.jsx";
import Contact from "./pages/website/Contact.jsx";
import NoticeBoard from "./pages/website/NoticeBoard.jsx";

// Admin sub-pages
import StudentList from "./pages/admin/Students/StudentList.jsx";
import AddStudent from "./pages/admin/Students/AddStudent.jsx";
import TeacherList from "./pages/admin/Teachers/TeacherList.jsx";
// import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import OnlineRegistration from "../src/pages/website/OnlineRegistration.jsx"
import FetchList from "./pages/admin/onlineStudent/FetchList.jsx"


export default function Router() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/notice" element={<NoticeBoard />} />

      {/* SINGLE LOGIN PAGE FOR EVERYONE */}
      <Route path="/login" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin sub-routes */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentList />} />
        <Route path="add-student" element={<AddStudent />} />
        {/* <Route path="teachers" element={<TeacherList />} /> */}
        <Route path="*" element={<AdminDashboard />} />
        // wherever your routes are
        {/* <Route path="/admin/teachers" element={<TeacherList />} /> */}
        <Route path="teachers" element={<TeacherList />} />
        <Route path="online-students" element={<FetchList />} />
      </Route>

        <Route path="online-registration" element={<OnlineRegistration />} />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

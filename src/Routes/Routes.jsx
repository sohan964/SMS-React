import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";

import AdminHome from "../pages/admins/AdminHome/AdminHome";
import AdminDashboard from "../Layout/AdminDashboard";
import AdminLogin from "../pages/admins/AdminLogin/AdminLogin";
import DepartmentList from "../pages/departments/DepartmentList";
import UpdateDepartment from "../pages/departments/UpdateDepartment";
import AddDepartment from "../pages/departments/AddDepartment";
import TeacherRoutines from "../pages/routines/TeacherRoutines/TeacherRoutines";
import CreateClassRoutine from "../pages/routines/CreateClassRoutine/CreateClassRoutine";
import RegisterStudent from "../pages/admins/Admissions/RegisterStudent";
import StudentAdmission from "../pages/admins/Admissions/StudentAdmission";
import RegisterTeacher from "../pages/admins/ManageTeachers/RegisterTeacher";
import CreateTeacher from "../pages/admins/ManageTeachers/CreateTeacher";
import StudentEnrollment from "../pages/admins/Admissions/StudentEnrollment";
import ManageTeachers from "../pages/admins/ManageTeachers/ManageTeachers";
import TeacherHome from "../pages/teachers/TeacherHome/TeacherHome";
import TeacherDashboard from "../Layout/TeacherDashboard";
import TeacherLogin from "../pages/teachers/TeacherLogin/TeacherLogin";
import ManageAttendances from "../pages/teachers/ManageAttendances/ManageAttendances";
import TakeAttendances from "../pages/teachers/ManageAttendances/TakeAttendances";
import AttendanceSummary from "../pages/teachers/ManageAttendances/AttendanceSummary";
import AttendanceDetails from "../pages/teachers/ManageAttendances/AttendanceDetails";
import ManageExams from "../pages/admins/ManageExams/ManageExams";
import AddExamSession from "../pages/admins/ManageExams/AddExamSession";
import AddResults from "../pages/teachers/ManageResults/AddResults";
import StudentLogin from "../pages/students/StudentLogin/StudentLogin";
import StudentDashboard from "../Layout/StudentDashboard";
import StudentHome from "../pages/students/StudentHome/StudentHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path :"/admin-login",
                element: <AdminLogin></AdminLogin>
            },
            {
                path :"/teacher-login",
                element: <TeacherLogin></TeacherLogin>
            },
            {
                path: "/student-login",
                element: <StudentLogin></StudentLogin>
            }
        ]
    },
    {
        path: "/admin-dashboard",
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                path : "",
                element: <AdminHome></AdminHome>
            },
            {
                path: "manage-departments",
                element:<DepartmentList></DepartmentList>
            },
            {
                path: "manage-departments/update-department/:id",
                element: <UpdateDepartment></UpdateDepartment>,
                loader: async({params})=> await fetch(`http://localhost:5074/api/Department/get-departmentbyid/${params?.id}`) 
            },
            {
                path: "manage-departments/add-department",
                element: <AddDepartment></AddDepartment>
            },
            {
                path: "teacher-routine",
                element: <TeacherRoutines></TeacherRoutines>
            },
            {
                path: "create-class-routine",
                element: <CreateClassRoutine></CreateClassRoutine>
            },
            {
                path: "student-register",
                element: <RegisterStudent></RegisterStudent>
            },
            {
                path: "student-enrollment",
                element: <StudentEnrollment></StudentEnrollment>
            },
            
            {
                path: "student-admission",
                element: <StudentAdmission></StudentAdmission>
            },
            {
                path: "manage-teachers",
                element: <ManageTeachers></ManageTeachers>
            },
            {
                path: "teacher-register",
                element: <RegisterTeacher></RegisterTeacher>
            },
            {
                path: "create-teacher",
                element: <CreateTeacher></CreateTeacher>
            },
            //manage exams route can be added here
            {
                path: "manage-exams",
                element: <ManageExams></ManageExams>
            },
            {
                path: "create-exam-session",
                element: <AddExamSession></AddExamSession>
            },
            

        ]
    },
    {
        path: "/teacher-dashboard",
        element: <TeacherDashboard></TeacherDashboard>,
        children: [
            {
                path: "",
                element:<TeacherHome></TeacherHome>
            },
            {
                path: "manage-attendances",
                element: <ManageAttendances></ManageAttendances>
            },
            {
                path: "manage-attendances/take-attendance",
                element: <TakeAttendances></TakeAttendances>
            },
            {
                path: "manage-attendances/attendance-summary",
                element: <AttendanceSummary></AttendanceSummary>
            },
            {
                path: "manage-attendances/attendance-details",
                element: <AttendanceDetails></AttendanceDetails>
            },
            {
                path: "manage-results/add-results",
                element: <AddResults></AddResults>
            }
        ]
    },
    {
        path: "/student-dashboard",
        element: <StudentDashboard></StudentDashboard>,
        children: [
            {
                path: "",
                element: <StudentHome></StudentHome>
            }
        ]
    }
])
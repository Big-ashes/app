import logo from "./logo.svg";
import "./App.css";
import { Routes, Router, Route, Link, Outlet } from "react-router";
import Login from "./page/login/";
import BetweenLayout from "./layout/betweenlayout/";
import Signup from "./page/signup/";
import Submitedcourse from "./page/submited_course/";
import Newcourse from "./page/new_course/";
import Auditcourse from "./page/audit_course";
import Auditsubmit from "./page/audit_submit";
import Auditresult from "./page/audit_result";
import Courselist from "./page/course_list";
import Chooseresult from "./page/choose_result";
import Modifysubmit from "./page/modify_submit";
import Modifyresult from "./page/modify_result";
import Searchstudent from "./page/searchstudent";

function App() {
  return (
    <Routes>
      <Route path="" element={<BetweenLayout />}>
        <Route path="/teacher/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="" element={<Outlet />} >
        <Route path="/teacher_index/:id" element={<Submitedcourse />} />
        <Route path="/submited_course/:id" element={<Submitedcourse />} />
        <Route path="/new_course/:id" element={<Newcourse />} />
        <Route path="/audit_course/:id" element={<Auditcourse />} />
      </Route>
     <Route path="" element={<Outlet />} >
        <Route path="/manager_index/" element={<Auditsubmit />} />
        <Route path="/audit_submit/" element={<Auditsubmit />} />
        <Route path="/modify_submit/:id" element={<Modifysubmit />} />
        <Route path="/audit_result/" element={<Auditresult />} />
        <Route path="/modify_result/:id" element={<Modifyresult />} />
      </Route>
      <Route path="" element={<Outlet />} >
        <Route path="/student_index/:id" element={<Courselist />} />
        <Route path="/course_list/:id" element={<Courselist />} />
        <Route path="/choose_result/:id" element={<Chooseresult />} />
        <Route path="/searchstudent/:id" element={<Searchstudent />} />
      </Route>
    </Routes>
  );
}

export default App;
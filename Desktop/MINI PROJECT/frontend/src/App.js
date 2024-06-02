import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import StudentProfile from "./components/StudentProfile";
import Admin from "./components/Admin";
import RequestAdmin from "./RequestAdmin";
import EditProfile from "./components/EditProfile";
import ViewProfile from "./components/ViewProfile";
import UpdateRequests from "./components/UpdateRequests";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/admin" element={<Admin />} />

          <Route
            exact
            path="/RequestAdmin/:username"
            element={<RequestAdmin />}
          />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/EditStudent" element={<EditProfile />} />
          <Route exact path="/student-profile" element={<StudentProfile />} />
          <Route exact path="/UpdateRequests" element={<UpdateRequests />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

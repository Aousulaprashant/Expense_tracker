import React, { useEffect } from "react";
import Header from "./components/Header/Header.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Stackoverflow from "./components/StackoverFlow";
import Addquestion from "./components/Addquestion";
import ViewQuestion from "./components/ViewQuestion";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/UserSlice.js";
import { auth } from "./firebase.js";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const PrivateRoute = () => {
    return user ? <Outlet /> : <Navigate to="/Auth" />;
  };

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/Auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Stackoverflow />} />
            <Route path="/add-question" element={<Addquestion />} />
            <Route path="/view-page" element={<ViewQuestion />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

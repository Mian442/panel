import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@material-ui/core";
import "./App.css";

import Main from "./Components/RightPanel/Main";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import DashBoard from "./Pages/Dashboard/DashBoard";
import NotAuthorized from "./Pages/NotAuthorized";
import NotFound from "./Pages/NotFound";

import UploadVideo from "./Components/RightPanel/UploadVideo";
import History from "./Components/RightPanel/History";
import OutputFiles from "./Components/RightPanel/OutputFiles";
import UserDetails from "./Components/RightPanel/UserDetails";
import Setting from "./Components/RightPanel/Setting";
import ReviewRequest from "./Components/RightPanel/ReviewRequest";
import Profile from "./Components/RightPanel/Profile";
import RunModule from "./Components/RightPanel/RunModule";

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <CssBaseline />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signUp" exact component={SignUp} />
          <Route
            path="/dashboard"
            exact
            children={
              <DashBoard content={<Main />} var={{ main: "contained" }} />
            }
          />
          <Route
            path="/dashboard/upload-a-video"
            exact
            children={
              <DashBoard
                content={<UploadVideo />}
                var={{ uploadVideo: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/run-module"
            exact
            children={
              <DashBoard
                content={<RunModule />}
                var={{ run_module: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/output-files"
            exact
            children={
              <DashBoard
                content={<OutputFiles />}
                var={{ output_files: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/history"
            exact
            children={
              <DashBoard content={<History />} var={{ history: "contained" }} />
            }
          />
          <Route
            path="/dashboard/users-details"
            exact
            children={
              <DashBoard
                content={<UserDetails />}
                var={{ users_details: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/review-request"
            exact
            children={
              <DashBoard
                content={<ReviewRequest />}
                var={{ review_request: "contained" }}
              />
            }
          />
          <Route
            path="/dashboard/profile"
            exact
            children={
              <DashBoard content={<Profile />} var={{ profile: "contained" }} />
            }
          />

          <Route
            path="/dashboard/setting"
            exact
            children={
              <DashBoard content={<Setting />} var={{ setting: "contained" }} />
            }
          />

          <Route path="/not-found" component={NotFound} />
          <Route path="/not-authorized" component={NotAuthorized} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;

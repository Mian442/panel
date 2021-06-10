import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
// import { PROFILE_UPDATE } from "../../Redux/Actions/Actions";
import Saving from "../Saving";
const Profile = ({ history }) => {
  const User = useSelector((state) => state.User.TOKEN);
  const dispatch = useDispatch();
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  // if (!IS_LOGGED) {
  //   history.push("/");
  // }
  const [model, setModel] = useState(false);
  const [text, setText] = useState({
    password: "",
    confirmPassword: "",
    phNo: User?.phNo,
  });
  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
      <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
        Update Profile
      </Typography>

      <Paper
        elevation={8}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          width: "40%",
          alignSelf: "center",
        }}
        square
      >
        <TextField
          label="Phone no."
          placeholder="Enter Phone no."
          onChange={(e) => {
            setText({ ...text, phNo: e.target.value });
          }}
          variant="outlined"
          style={{ width: "100%", marginBlock: 12 }}
          size="medium"
          value={text.phNo}
        />
        <TextField
          label="New Password"
          placeholder="Enter Password"
          onChange={(e) => {
            setText({ ...text, password: e.target.value });
          }}
          variant="outlined"
          style={{ width: "100%", marginBlock: 12 }}
          size="medium"
          value={text.password}
          type="password"
        />
        <TextField
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          onChange={(e) => {
            setText({ ...text, confirmPassword: e.target.value });
          }}
          variant="outlined"
          style={{ width: "100%", marginBlock: 12 }}
          size="medium"
          value={text.confirmPassword}
          type="password"
        />
        <Button
          color="primary"
          style={{ marginInline: 12, alignSelf: "flex-end" }}
          variant="contained"
          size="large"
          onClick={() => {
            if (
              text.confirmPassword === text.password &&
              text.confirmPassword !== "" &&
              text.password !== ""
            ) {
              setModel(true);
              // dispatch(
              //   PROFILE_UPDATE(
              //     { password: text.password, phNo: text.phNo, id: User.id },
              //     () => {
              //       setModel(false);
              //       setText({
              //         password: "",
              //         confirmPassword: "",
              //         phNo: User?.phNo,
              //       });
              //     },
              //     () => {
              //       setModel(false);
              //     }
              //   )
              // );
            } else {
              toast.error("Password not match!");
            }
          }}
        >
          <FiSave fontSize={24} />
          Save Changes
        </Button>
      </Paper>
      <Saving visible={model} title="Saving" />
    </div>
  );
};

export default withRouter(Profile);

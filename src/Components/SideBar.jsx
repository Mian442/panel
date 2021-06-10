import React from "react";
import {
  ListItem,
  List,
  Button,
  makeStyles,
  Typography,
  ListSubheader,
} from "@material-ui/core";
import { withRouter } from "react-router";
import { MdDashboard } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { BsCloudUpload } from "react-icons/bs";
import {
  FaUser,
  FaUserCog,
  FaHourglassHalf,
} from "react-icons/fa";
import { VscOutput, VscRunAll } from "react-icons/vsc";
import { AiOutlineHistory } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { useDispatch } from "react-redux";
import { USER_STATUS_OUT } from "../Redux/Actions/Actions";
const styles = makeStyles({
  SideBarBtn: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "100%",
    fontSize: 14,
    justifyContent: "flex-start",
  },
});

const SideBar = (props) => {
  const classes = styles();
  const dispatch = useDispatch();
  const list = [
    {
      name: "Dashboard",
      variant: props.var.main,
      icon: <MdDashboard fontSize={18} />,
      path: "",
      shown: true,
    },
    {
      name: "Upload a Video",
      variant: props.var.uploadVideo,
      icon: <BsCloudUpload fontSize={18} />,
      path: "upload-a-video",
      shown: true,
    },
    {
      name: "Run Module",
      variant: props.var.run_module,
      icon: <VscRunAll fontSize={18} />,
      path: "run-module",
      shown: true,
    },
    {
      name: "Output Files",
      variant: props.var.output_files,
      icon: <VscOutput fontSize={18} />,
      path: "output-files",
      shown: true,
    },
    {
      name: "History",
      variant: props.var.history,
      icon: <AiOutlineHistory fontSize={18} />,
      path: "history",
      shown: true,
    },
    {
      name: "Users Details",
      variant: props.var.users_details,
      icon: <FaUser fontSize={18} />,
      path: "users-details",
      shown: true,
    },
    {
      name: "Review Request",
      variant: props.var.review_request,
      icon: <FaHourglassHalf fontSize={18} />,
      path: "review-request",
      shown: true,
    },
    {
      name: "Update Profile",
      variant: props.var.profile,
      icon: <ImProfile fontSize={18} />,
      path: "profile",
      shown: true,
    },
    {
      name: "Admin Setting",
      variant: props.var.setting,
      icon: <FaUserCog fontSize={18} />,
      path: "setting",
      shown: true,
    },
    {
      name: "Log Out",
      variant: props.var.settings,
      icon: <AiOutlineLogout fontSize={18} />,
      path: "",
      shown: true,
    },
  ];
  return (
    <div style={{ padding: 10 }} className="sidebar">
      <>
        <List>
          <Typography
            align="center"
            variant="h5"
            style={{ marginBlock: 10, color: "#fff" }}
          >
            Admin Panel
          </Typography>
          <List
            subheader={
              <ListSubheader style={{ color: "#bdbdbd" }}>
                Options
              </ListSubheader>
            }
          ></List>
          {list.map(
            (item, i) =>
              item.shown && (
                <ListItem key={i}>
                  <Button
                    color="secondary"
                    variant={item.variant}
                    className={classes.SideBarBtn}
                    size="small"
                    onClick={() => {
                      if (item.name === "Log Out") {
                        dispatch(USER_STATUS_OUT());
                        props.history.push("/");
                      } else props.history.push("/dashboard/" + item.path);
                    }}
                  >
                    <span style={{ marginRight: 7 }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </Button>
                </ListItem>
              )
          )}
        </List>
      </>
    </div>
  );
};

export default withRouter(SideBar);

import { Avatar, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
// import { GET_DASHBOARD } from "../../Redux/Actions/Actions";
import Loading from "../Loading";
import firebase from "firebase";
import { toast } from "react-toastify";
const Main = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  // if (!IS_LOGGED) {
  //   history.push("/");
  // }
  const dashboard = useSelector((state) => state.User.dashboard);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const list = [
    {
      img: "/images/users.png",
      title: "Registered Worker",
      backgroundColor: "#c5cae9",
    },

    {
      img: "/images/pending.png",

      title: "Pending Registration",
      backgroundColor: "#ffecb3",
    },
  ];

  useEffect(() => {
    // dispatch();
    // GET_DASHBOARD(() => {
    //   setTimeout(() => {
    //     setLoading(true);
    //   }, 3000);
    // })
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Dashboard
        </Typography>
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {list.map((item, i) => (
            <Paper
              key={i}
              elevation={8}
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 300,
                flexWrap: "wrap",
                margin: 20,
              }}
              square
            >
              <Avatar
                src={item.img}
                alt={item.title}
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: item.backgroundColor,
                  padding: 7,
                }}
                variant="rounded"
              />
              <div style={{ marginLeft: 20 }}>
                <Typography variant="body1" style={{ color: "#9e9e9e" }}>
                  {item.title}
                </Typography>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    );
};

export default withRouter(Main);

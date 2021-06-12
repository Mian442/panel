import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Loading from "../Loading";
import Saving from "../Saving";
import { MdDeleteForever } from "react-icons/md";
// import {
//   GET_WORKERS_LIST,
//   DELETE_USER,
//   RESTRICTS_USER,
//   REMOVE_USER_RESTRICTION,
// } from "../../Redux/Actions/Actions";
import Details from "../Card/Details";
const OutputFiles = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  // if (!IS_LOGGED) {
  //   history.push("/");
  // }
  const allWorkers = useSelector((state) => state.User.allWorkers);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(
    //   GET_WORKERS_LIST(() => {
    //     setTimeout(() => {
    //       setLoading(true);
    //     }, 3000);
    //   })
    // );
  }, [dispatch]);
  const [test,setTest]=useState([])
useEffect(() => {
  setTimeout(() => {
    setTest([{user:{
name:"Ali",
email:"Ali@gmail.com"
},
category:"Vechical"}])
  }, 10000);
  },[]);

  if (loading) {
    return <Loading />;
  } else
    return (
      <div style={{ padding: 20 }}>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          OutputFiles
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {test.map((item, i) => (
                  <TableRow key={i} style={{ cursor: "pointer" }}>
                    <TableCell
                      onClick={() => {
                        setData(item.user);
                        setShow(true);
                      }}
                    >
                      {item.user?.name}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setData(item.user);
                        setShow(true);
                      }}
                    >
                      {item.user?.email}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setData(item.user);
                        setShow(true);
                      }}
                    >
                      {item.category}
                    </TableCell>
                    <TableCell>
                              <a download href="https://drive.google.com/file/d/1WAMXc-i8vPRR8EXdOWalW_vQ13rgI5ws/view?usp=sharing">Download File</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* <Fab
          color="primary"
          aria-label="download"
          style={{ position: "fixed", right: 20, bottom: 20 }}
        >
          <HiOutlineDocumentDownload fontSize={24} />
        </Fab> */}
        <Saving visible={model} title={title} />
        <Details
          visible={show}
          handelClose={() => {
            setShow(false);
          }}
          data={data}
        />
      </div>
    );
};

export default withRouter(OutputFiles);

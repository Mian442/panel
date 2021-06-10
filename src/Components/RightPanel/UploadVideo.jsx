import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import * as yup from "yup";
// import {
//   ADD_CATEGORIES,
//   DELETE_CATEGORIES,
//   GET_CATEGORIES_LIST,
//   GET_CATEGORIES_PDF,
//   UPDATE_CATEGORIES,
// } from "../../Redux/Actions/Actions";
import Loading from "../Loading";
import { toast } from "react-toastify";
import Saving from "../Saving";
import firebase from "firebase";
import { AddRounded, VideoLibrary } from "@material-ui/icons";
import Video from "../Video/Video";
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
}
const UploadVideo = ({ history }) => {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  // if (!IS_LOGGED) {
  //   history.push("/");
  // }

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const [uploading, setUploading] = useState(0);
  const [video, setVideo] = useState(null);
  const allCategories = useSelector((state) => state.User.allCategories);
  const [data, setData] = useState(allCategories);
  const User = useSelector((state) => state.User.TOKEN);
  useEffect(() => {
    // dispatch(
    //   GET_CATEGORIES_LIST((e) => {
    //     setData(e);
    //     setTimeout(() => {
    //       setLoading(true);
    //     }, 3000);
    //   })
    // );
    // eslint-disable-next-line
  }, [dispatch]);
  // const list_filter = (e) => {
  //   setData(
  //     allCategories.filter(
  //       (item) =>
  //         item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
  //     )
  //   );
  //   setSearch(e.target.value);
  // };
  const videoUpload = (file) => {
    const fireStore = firebase.storage();
    const storeRef = fireStore.ref("/video/" + file.name);
    const task = storeRef.put(file);
    task.on(
      "state_changed",
      (p) => {
        setUploading(Math.round((p.bytesTransferred / p.totalBytes) * 100));
      },
      (err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((u) => {
          setText(u);
        });
      }
    );
  };
  if (loading) {
    return <Loading />;
  } else
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Video
        </Typography>
        <Paper
          elevation={8}
          style={{
            padding: 20,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          square
        >
          <div
            style={{
              margin: 20,
              width: "93%",
              flexDirection: "row",
            }}
            className="video"
          >
            <Typography
              variant="h6"
              style={{ paddingTop: 10, marginLeft: 20 }}
              align="left"
            >
              Add Video
            </Typography>
            <input
              accept="video/*"
              style={{ display: "none" }}
              id="icon-button-video-file"
              type="file"
              onChange={(e) => {
                if (e.target.files[0].size / (1024 * 1024) <= 1000) {
                  setUploading(0);
                  setVideo(e.target.files[0]);
                } else {
                  toast.error("Video Size is Larger than 100MB");
                }
              }}
            />
            <label htmlFor="icon-button-video-file" style={{ display: "flex" }}>
              <Typography
                variant="subtitle1"
                align="left"
                style={{
                  width: 60,
                  paddingTop: 10,
                  marginLeft: 20,
                }}
              >
                Video
              </Typography>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <VideoLibrary />
              </IconButton>
              {video === null ? null : (
                <Typography
                  variant="subtitle1"
                  style={{ paddingTop: 10, width: "100%" }}
                  color="secondary"
                >
                  {video.name} {(video.size / (1024 * 1024)).toFixed(4)}
                  Mb
                </Typography>
              )}
            </label>
            <Button
              color="primary"
              variant="contained"
              leftIcon={AddRounded}
              style={{ margin: 20 }}
              disabled={uploading === 0 || uploading === 100 ? false : true}
              onClick={() => {
                if (video !== null) {
                  videoUpload(video);
                } else {
                  toast.error("Episode Info is Missing!");
                }
              }}
            >
              Add
            </Button>
            <div style={{ width: "100%" }}>
              {uploading > 0 && uploading < 100 && (
                <Typography
                  variant="subtitle1"
                  style={{ paddingTop: 10, width: "100%" }}
                  color="primary"
                >
                  Uploading...
                </Typography>
              )}
              {uploading === 100 && (
                <Typography
                  variant="subtitle1"
                  style={{ paddingTop: 10, width: "100%", color: "green" }}
                >
                  Completed!
                </Typography>
              )}
              {uploading > 0 && <LinearProgressWithLabel value={uploading} />}
              {text !== "" && (
                <div>
                  <Typography
                  variant="subtitle2"
                  style={{ paddingTop: 10, width: "100%" }}
                  color="primary"
                >
                  Download Url:{"\n\n"}
                  {text}
                </Typography>
                <Video src={text} />
                </div>
                
              )}
            </div>
          </div>
        </Paper>
        <Typography align="center" variant="h3" style={{ marginBlock: 20 }}>
          Video List
        </Typography>
        <Paper elevation={8} style={{ padding: 20, marginBlock: 20 }} square>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Video</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <TextField
                        value={item.name}
                        label="Edit"
                        variant="outlined"
                        onChange={(e) => {
                          let d = [...data];
                          for (var x in d) {
                            if (item._id === d[x]._id) {
                              d[x].name = e.target.value;
                            }
                          }

                          setData(d);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <Button
                          color="secondary"
                          style={{ marginInline: 12 }}
                          variant="contained"
                          size="large"
                          onClick={() => {
                            setTitle("Deleting");
                            setModel(true);
                            // dispatch(
                            //   DELETE_CATEGORIES(
                            //     item._id,
                            //     (d) => {
                            //       setTimeout(() => {
                            //         setModel(false);
                            //         setData(d);
                            //       }, 3000);
                            //     },
                            //     () => {
                            //       setModel(false);
                            //     }
                            //   )
                            // );
                          }}
                        >
                          <MdDeleteForever fontSize={24} />
                        </Button>
                        <Button
                          color="primary"
                          style={{
                            marginInline: 12,
                            backgroundColor: "#69f0ae",
                          }}
                          variant="contained"
                          size="large"
                          onClick={() => {
                            setTitle("Update");
                            setModel(true);
                            // dispatch(
                            //   UPDATE_CATEGORIES(
                            //     { id: item._id, name: item.name },
                            //     (d) => {
                            //       setTimeout(() => {
                            //         setModel(false);
                            //         setData(d);
                            //         setSearch("");
                            //       }, 3000);
                            //     },
                            //     () => {
                            //       setModel(false);
                            //     }
                            //   )
                            // );
                          }}
                        >
                          <RiEdit2Fill fontSize={24} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      
        <Saving visible={model} title={title} />
      </div>
    );
};

export default withRouter(UploadVideo);

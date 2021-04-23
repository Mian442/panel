import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import MainStore from "./Redux/Store/MainStore";
import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB7jbL4TD4Nu2N9Hw6Gu27sc3-3Ahhh9yo",
  authDomain: "vts-media-files.firebaseapp.com",
  projectId: "vts-media-files",
  storageBucket: "vts-media-files.appspot.com",
  messagingSenderId: "721399661503",
  appId: "1:721399661503:web:152350a984e971a1c7170a",
};
firebase.default.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={MainStore}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

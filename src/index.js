import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import MainStore from "./Redux/Store/MainStore";
import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB9bJ1QNBz2jJHDTBje03f2_GIduQNvLA0",
  authDomain: "test-38207.firebaseapp.com",
  projectId: "test-38207",
  storageBucket: "test-38207.appspot.com",
  messagingSenderId: "13956945037",
  appId: "1:13956945037:web:ac1d7762159623987b7ec4",
  measurementId: "G-Y0BS8C19QH",
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

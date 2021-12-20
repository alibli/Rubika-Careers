import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "font-awesome/css/font-awesome.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyModal from './components/ApplyModal';
import JobDetails from './components/JobDetails';



ReactDOM.render(
  <React.StrictMode>
    <App />
   </React.StrictMode>,
  document.getElementById('root')
);


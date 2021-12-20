import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyModal from './components/ApplyModal';
import JobDetails from './components/JobDetails';
import Jobs from './components/Jobs';

function App() {
  return (
    <>
      <Header></Header>
      <Jobs />
      <BrowserRouter>
        <Routes>
          <Route path="apply" element={<ApplyModal />} />
          <Route path="job-details" element={<JobDetails />} />
        </Routes>
      </BrowserRouter>


      <Footer></Footer>
    </>
  );
}

export default App;

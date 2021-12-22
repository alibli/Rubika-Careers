import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyModal from './components/ApplyModal';
import JobDetails from './components/JobDetails';
import Jobs from './components/Jobs';
import Table from './components/Core/Table';

function App() {
  return (
    <>

      <BrowserRouter>
        <Header></Header>

        <Routes>

          <Route path="/" element={<Jobs />} />
          <Route path="/apply" element={<ApplyModal />} />
          <Route path="job-details" element={<JobDetails />} />
          <Route path="test" element={<Table />} />

        </Routes>
        <Footer></Footer>

      </BrowserRouter>


    </>
  );
}

export default App;

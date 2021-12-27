import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyModal from './components/ApplyModal';
import JobsPage from './components/JobsPage';
import JobDetailsPage from './components/JobDetailsPage';
import UserRequestsTable from './components/UserPanel/UserRequestsTable';
import AdminRequestsTable from './components/AdminPanel/AdminJobRequests';
import AdminJobRequestDetails from './components/AdminPanel/AdminJobRequestDetails';

function App() {
  return (
    <>

      <BrowserRouter>
        <Header></Header>

        <Routes>

          <Route path="/" element={<JobsPage />} />
          <Route path="job-details/:jobId" element={<JobDetailsPage />} />
          <Route path="/apply" element={<ApplyModal />} />
          <Route path="job-details" element={<JobDetailsPage />} />
          <Route path="test2" element={<UserRequestsTable />} />
          <Route path="test3" element={<AdminRequestsTable />} />
          <Route path="test4" element={<AdminJobRequestDetails />} />

          
        </Routes>
        <Footer></Footer>

      </BrowserRouter>


    </>
  );
}

export default App;

import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserInfo from './components/UserPanel/UserInfo';
import JobsPage from './components/JobsPage';
import JobDetailsPage from './components/JobDetailsPage';
import UserApplicationsTable from './components/UserPanel/UserApplicationsTable';
import AdminJobsTable from './components/AdminPanel/AdminJobsTable';
import JobRequestsTable from './components/AdminPanel/JobRequestsTable';
import Notification from './components/Core/Notification';
// import BackForwardBtn from './components/Core/BackForwardBtn';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <BackForwardBtn /> */}
        <Header></Header>

        <Routes>

          <Route path="/" element={<JobsPage />} />
          <Route path="job-details/:jobId" element={<JobDetailsPage />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="user-panel" element={<UserApplicationsTable />} />
          <Route path="admin-panel" element={<AdminJobsTable />} />
          <Route path="admin-panel/:jobId/job-requests" element={<JobRequestsTable />} />


        </Routes>

        <Notification />
        <Footer></Footer>

      </BrowserRouter>
    </>
  );
}

export default App;

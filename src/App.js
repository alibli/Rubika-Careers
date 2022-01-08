import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserInfo from './components/UserPanel/UserInfo';
import JobsPage from './components/JobsPage';
import JobDetailsPage from './components/JobDetailsPage';
import UserRequestsTable from './components/UserPanel/UserRequestsTable';
import AdminJobs from './components/AdminPanel/AdminJobs';
import AdminJobRequestDetails from './components/AdminPanel/AdminJobRequestDetails';
import Notification from './components/Core/Notification';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>

        <Routes>

          <Route path="/" element={<JobsPage />} />
          <Route path="job-details/:jobId" element={<JobDetailsPage />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="user-panel" element={<UserRequestsTable />} />
          <Route path="admin-panel" element={<AdminJobs />} />
          <Route path="test4" element={<AdminJobRequestDetails />} />
          
        </Routes>
        
        <Notification />
        <Footer></Footer>

      </BrowserRouter>
    </>
  );
}

export default App;

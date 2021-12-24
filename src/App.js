import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyModal from './components/ApplyModal';
import JobDetails from './components/JobDetails';
import JobsPage from './components/JobsPage';

function App() {
  return (
    <>

      <BrowserRouter>
        <Header></Header>

        <Routes>

          <Route path="/" element={<JobsPage />} />
          <Route path="/apply" element={<ApplyModal />} />
          <Route path="job-details" element={<JobDetails />} />

        </Routes>
        <Footer></Footer>

      </BrowserRouter>


    </>
  );
}

export default App;

import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyModal from './components/ApplyModal';
import JobsPage from './components/JobsPage';
import JobDetailsPage from './components/JobDetailsPage';

function App() {
  return (
    <>

      <BrowserRouter>
        <Header></Header>

        <Routes>

          <Route path="/" element={<JobsPage />} />
          <Route path="/apply" element={<ApplyModal />} />
          <Route path="job-details" element={<JobDetailsPage />} />

        </Routes>
        <Footer></Footer>

      </BrowserRouter>


    </>
  );
}

export default App;

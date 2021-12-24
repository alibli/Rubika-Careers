import Subject from "./Subject";
class JobsService {
    constructor() {
        const CURRENTJOBDETAILS = JSON.parse(window.localStorage.currentJobDetails);
        this.currentJobDetails = CURRENTJOBDETAILS.length !== 0 ? CURRENTJOBDETAILS : [];

        this.jobsList = [
            {
                id: 1,
                title: 'برنامه‌نویس ارشد فرانت',
                description: 'نیازمندی‌ها...',
                taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
            },
            {
                id: 2,
                title: 'دیجیتال مارکتر',
                description: 'نیازمندی‌ها...',
                taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
            },
            {
                id: 3,
                title: 'کارشناس منابع انسانی',
                description: 'نیازمندی‌ها...',
                taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
            },
        ];

        this.jobDetailsSubject = new Subject();
    
    }

    //public
    getJobsList = () => {
        return this.jobsList;
    }

    getCurrentJobDetails = () => {
        return this.currentJobDetails;
    }

    setJobsList = (jobsList) => {
        this.jobsList = jobsList;
    }

    setCurrentJobDetails = (id) => {
        const details = this.getJobDetailsById(id)
        this.currentJobDetails = details;
        window.localStorage.setItem('currentJobDetails', JSON.stringify(details))
        this.jobDetailsSubject.notify({ action: 'JOB-CHOSEN' });
    }

    //private
    getJobDetailsById = (id) => {
        return this.jobsList.filter(job => job.id === id);
    }
}

const jobsService = new JobsService();

export default jobsService;
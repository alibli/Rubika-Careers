import Subject from "./Subject";
class JobsService {
    constructor() {
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

        this.jobsListSubject = new Subject();

    }

    //public
    getJobsList = () => {
        return this.jobsList;
    }

    setJobsList = (jobsList) => {
        this.jobsList = jobsList;
        this.jobsListSubject.notify({ action: 'JOBS-LIST-FILLED' });
    }

    getJobDetailsById = (id) => {
        // eslint-disable-next-line eqeqeq
        const details = this.jobsList.filter(job => job.id == id);
        if (details.length !== 0) {
            return details;
        }
    }
}

const jobsService = new JobsService();

export default jobsService;
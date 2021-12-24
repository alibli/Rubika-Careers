class JobsService {
    constructor() {

        this.jobsList = [
            {
                id: 1,
                title: 'برنامه‌نویس ارشد فرانت',
                desctiption: 'نیازمندی‌ها...',
                taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
            },
            {
                id: 2,
                title: 'دیجیتال مارکتر',
                desctiption: 'نیازمندی‌ها...',
                taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
            },
            {
                id: 3,
                title: 'کارشناس منابع انسانی',
                desctiption: 'نیازمندی‌ها...',
                taskURL: 'https://www.google.com/search?q=task&oq=task&aqs=chrome..69i57.1637j0j7&sourceid=chrome&ie=UTF-8'
            },
        ]
    
    }

    //public
    getJobsList = () => {
        return this.jobsList;
    }

    setJobsList = (jobsList) => {
        this.jobsList = jobsList;
    }
}

const jobsService = new JobsService();

export default jobsService;
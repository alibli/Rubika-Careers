import Subject from './Subject';

class ToastService {
    constructor() {
        this.toastSubject = new Subject();
    }

    //public

    showToast = (msg, alrtModel) => {
        this.toastSubject.notify({
            action: 'SHOW-TOAST',
            message: msg,
            alertModel: alrtModel
        });
        
    };

}

const toastService = new ToastService();

export default toastService;
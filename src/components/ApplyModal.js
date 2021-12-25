import Modal from "./Core/Modal";

function ApplyModal(props) {

    const buttons = [
        {
            label: 'ارسال',
            onClickHandler: () => { }
        }
    ]

    const rows = [
        {
            elements:
                <>
                    <label htmlFor='salary-question'>
                        حقوق مورد نظر شما:
                    </label>
                    <input
                        className='modal-input'
                        name='salary-question'
                        type='text' />
                </>
        },
        {
            elements:
                <>
                    <label htmlFor='years-question'>
                        پیش‌بینی می‌کنید چه مدت کنار ما باشید؟
                    </label>
                    <input
                        className='modal-input'
                        name='years-question'
                        type='text' />
                </>
        },
        {
            elements:
                <>
                    <label htmlFor='resume'>
                        رزومه
                    </label>
                    <input
                        className='modal-input'
                        name='resume'
                        type='file' />
                </>
        },
        {
            elements:
                <>
                    <label htmlFor='task-answer'>
                        پاسخ تسک
                    </label>
                    <input
                        className='modal-input'
                        name='task-answer'
                        type='file' />
                </>
        }

    ]

    const bottom = []

    return (
        <Modal
            size="sm"
            show={props.show}
            onHide={props.onHide}
            buttons={buttons}
            rows={rows}
            bottom={bottom} />
    );
}

export default ApplyModal;
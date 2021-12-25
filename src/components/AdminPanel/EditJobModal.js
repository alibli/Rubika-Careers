import Modal from "../Core/Modal";

function EditJobModal(props) {

    const buttons = [
        {
            label: 'ذخیره',
            onClickHandler: () => { }
        }
    ]

    const rows = [
        {
            elements:
                <>
                    <label htmlFor='edit-job-title'>
                        عنوان
                    </label>
                    <input
                        className='modal-input'
                        name='edit-job-title'
                        type='text' />
                </>
        },
        {
            elements:
                <>
                    <label htmlFor='edit-job-descrip'>
                        شرح
                    </label>
                    <textarea
                        className='modal-input'
                        name='edit-job-descrip'
                        type='text'
                        style={{
                            height: '500px'
                        }} />
                </>
        },
        {
            elements:
                <div style={{ 
                    display: 'flex',
                    justifyCongtent: 'space-between',
                    width: '60%'
                }}>
                    <label htmlFor='edit-job-task'>
                        فایل تسک
                    </label>
                    <input
                        style={{
                            margin: 'auto'
                        }}
                        className='modal-input'
                        name='edit-job-task'
                        type='file' />
                </div>
        }
    ]

    const bottom = [];

    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={props.onHide}
            buttons={buttons}
            rows={rows}
            bottom={bottom} />
    );
}

export default EditJobModal;
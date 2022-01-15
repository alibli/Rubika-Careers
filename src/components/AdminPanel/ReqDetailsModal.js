import ModalComponent from "../Core/ModalComponent";
import { Container, Row } from 'react-bootstrap';

function reqDetailsModal(props) {

    const body = <Container>
        <Row>
            <>
                <label htmlFor='salary-question'>
                    حقوق مورد نظر (تومان)
                </label>
                <input
                    className='modal-input'
                    name='salary-question'
                    type='number'
                    style={{
                        padding: '0 !important',
                        margin: '0 !important'
                    }}
                    disabled
                    value={props.reqSalaryInterest}
                />
            </>
        </Row>

        <Row>
            <label htmlFor='years-question'>
                پیش‌بینی می‌کنید چه مدت در کنار ما باشید؟ (ماه)
            </label>
            <input
                className='modal-input'
                name='years-question'
                type='number'
                style={{
                    padding: '0 !important',
                    margin: '0 !important'
                }}
                disabled
                value={props.reqDurationInterest}
            />
        </Row>

        <Row>
            <>
                <label htmlFor='resume'>
                    رزومه
                </label>

                <a href={props.reqResumeLink}>
                    دانلود
                </a>

            </>
        </Row>

        <Row>
            <>
                <label htmlFor='task-answer'>
                    پاسخ تسک
                </label>

                <a href={props.reqTaskSolutionLink}>
                    دانلود
                </a>

            </>
        </Row>
    </Container>;

    const footer = <></>;

    return (
        <ModalComponent
            size="sm"
            body={body}
            footer={footer}
            show={props.show}
            onHide={props.onHide} />
    );
}

export default reqDetailsModal;
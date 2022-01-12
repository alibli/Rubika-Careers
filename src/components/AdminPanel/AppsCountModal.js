import ModalComponent from "../Core/ModalComponent";
import { Container, Row, Button } from 'react-bootstrap';
import { useState } from "react";

function AppsCountModal(props) {

    const body = <Container>
        <Row>
            <>
                <h5>
                    جدید
                </h5>

                {
                    <p>
                        {props.newApplicationsNum}
                    </p>
                }
            </>
        </Row>

        <Row>
            <>
                <h5>
                    دیده شده
                </h5>

                {
                    <p>
                        {props.seenApplicationsNum}
                    </p>
                }
            </>
        </Row>

        <Row>
            <>
                <h5>
                    تایید شده
                </h5>

                {
                    <p>
                        {props.acceptedApplicationsNum}
                    </p>
                }
            </>
        </Row>

        <Row>
            <>
                <h5>
                     رد شده
                </h5>

                {
                    <p>
                        {props.rejectedApplicationsNum}
                    </p>
                }
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

export default AppsCountModal;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Container, Card, Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';
import api, { ApiResponse } from '../../api/api';

import { Formik, Form, Field} from "formik"

export default class ContactPage extends React.Component {

    private submitFeedback(name: string, message: string, mail: string) {
        api('api/inbox/add', 'post', { name, mail, message })
            .then((res: ApiResponse) => {
                if (res.status === "error") {
                    return false;
                }
            });
        return true;
    }


    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        name: '',
                        mail: '',
                        message: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const flag = this.submitFeedback(values.name, values.message, values.mail);
                        values.name = "";
                        values.message = "";
                        values.mail = "";
                        flag ? alert("Poruka uspesno poslata!") : alert("Poruka uspesno poslata!");
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Container>
                                <Row className="justify-content-center"  >
                                    <Col lg="5" md="6" sm="12" xs="12" >
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>
                                                    <FontAwesomeIcon icon={faPhone} /> Feedback
                                    </Card.Title>
                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                                                    <Field type="text" className="form-control" name="name" />
                                                </BootstrapForm.Group>
                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Mail</BootstrapForm.Label>
                                                    <Field type="email" className="form-control" name="mail" />
                                                </BootstrapForm.Group>
                                                <BootstrapForm.Group>
                                                    <BootstrapForm.Label>Message</BootstrapForm.Label>
                                                    <Field type="text" as="textarea" className="form-control" rows="3" name="message" />
                                                </BootstrapForm.Group>
                                                <Button variant="primary" disabled={isSubmitting} type="submit">Submit</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </Container>
                        </Form>
                    )}
                </Formik>


            </Container>
        );
    }


}
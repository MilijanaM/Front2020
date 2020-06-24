import React from 'react';
import { Container, Card, Row, Col} from 'react-bootstrap';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCarousel from "./ProductCarousel"
import Categories from './Categories';
import News from './News';

interface HomePageState {
    isUserLoggedIn: boolean;
}

class HomePage extends React.Component {
    state: HomePageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
        };
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    render() {
        /* if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }
    */

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt} /> Top level categories
                        </Card.Title>
                        <Row>
                            <Col lg="9" md="9" sm="12" xs="12">
                                <Categories />
                            </Col>
                            <Col lg="3" md="3" sm="12" xs="12">
                                <ProductCarousel />
                                <Row>
                                    <News />
                                </Row>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default HomePage;
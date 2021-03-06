import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CategoryType from '../../types/CategoryType';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';

interface CategoriesState {
    categories?: CategoryType[];
}

interface ApiCategoryDto {
    categoryId: number;
    name: string;
}

class Categories extends React.Component {
    state: CategoriesState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentWillMount() {
        this.getCategories();
    }

    componentWillUpdate() {
        this.getCategories();
    }

    private getCategories() {
        api('api/category/', 'get', {})//?filter=parentCategoryId||$isnull 
            .then((res: ApiResponse) => {
                console.log("Categories: res.status", res.status)
                if (res.status === 'error' || res.status === 'login') {
                    return;
                }
                console.log("Categories: res.data", res.data)
                this.putCategoriesInState(res.data);
            });
    }

    private putCategoriesInState(data?: ApiCategoryDto[]) {
        const categories: CategoryType[] | undefined = data?.map(category => {
            return {
                categoryId: category.categoryId,
                name: category.name,
                items: [],
            };
        });

        const newState = Object.assign(this.state, {
            categories: categories,
        });

        this.setState(newState);
    }
    render() {
        return (
            <Row>
                {this.state.categories?.map(this.singleCategory)}
            </Row>
        );
    }

    private singleCategory(category: CategoryType) {
        return (
            <Col lg="3" md="4" sm="6" xs="12">
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title as="p">
                            {category.name}
                        </Card.Title>
                        <Link to={`/category/${category.categoryId}`}
                            className="btn btn-primary btn-block btn-sm">
                            Open category
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default Categories;
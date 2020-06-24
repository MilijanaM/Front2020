import React from 'react';
import { Card, Row } from 'react-bootstrap';
import api, { ApiResponse } from '../../api/api';

interface NewsState {
    news: NewsType[];
}

interface ApiNewsDto {
    newsId: number;
    caption: number;
    text: string;
}
interface NewsType {
    newsId: number;
    caption: number;
    text: string;
}

class News extends React.Component {
    state: NewsState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            news: [],
        };
    }

    componentWillMount() {
        this.getNews();
    }

    componentWillUpdate() {
        this.getNews();
    }


    private getNews() {
        console.log("### news:")
        api('api/news/', 'get', {})
            .then((res: ApiResponse) => {
                console.log("### news:", res.status)
                if (res.status === "error") {
                    return;
                }
                console.log("### news:", res.data)
                this.putNewsInState(res.data);
            });
    }

    private putNewsInState(data?: ApiNewsDto[]) {
        const news: NewsType[] | undefined = data?.map(n => {
            return {
                caption: n.caption,
                newsId: n.newsId,
                text: n.text,
            };
        });

        const newState = Object.assign(this.state, {
            news,
        });

        this.setState(newState);
    }

    private newsItem({ caption, text }: NewsType) {
        return (
            <Card border="info" className="mx-3 my-2" >
                <Card.Body>
                    {caption}. {text}
                </Card.Body>
            </Card>)
    }
    render() {
        return (
            <Row>
                {this.state.news.map(this.newsItem)}
            </Row>
        );
    }
}

export default News;
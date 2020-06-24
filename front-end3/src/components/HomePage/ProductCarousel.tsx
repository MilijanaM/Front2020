import React from 'react';
import { Carousel } from 'react-bootstrap';
import api, { ApiResponse } from '../../api/api';
import PhotoType from '../../types/PhotoType';
import { Link } from 'react-router-dom';

interface ProductCarouselState {
    gallery: PhotoType[];
}

interface ApiGalleryDto {
    description: string;
    photos: PhotoType[];
}

class ProductCarousel extends React.Component {
    state: ProductCarouselState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            gallery: [],
        };
    }

    componentWillMount() {
        this.getGallery();
    }

    componentWillUpdate() {
        this.getGallery();
    }
    private getGallery() {
        api('api/category/', 'get', {})//?filter=parentCategoryId||$isnull 
            .then((res: ApiResponse) => {
                this.putGalleryInState(res.data);
            });
    }

    private putGalleryInState(data?: ApiGalleryDto[]) {
        /*
        const newState = Object.assign(this.state, {
            photos: data?.photos,
            description: data?.description,
        });

        this.setState(newState);
        */
    }

    // Img Carousel *************************************************************
    //dummy images
    private images: Array<PhotoType> = [
        {
            imagePath: "https://source.unsplash.com/vdbq-iiyvGY/800x600",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate pellentesque convallis. Aenean lacinia nunc quis malesuada cursus.",
        },
        {
            imagePath: "https://source.unsplash.com/4z0-2mQE7io/800x600",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate pellentesque convallis. Aenean lacinia nunc quis malesuada cursus.",
        },
        {
            imagePath: "https://source.unsplash.com/1DMNn6gBbwQ/800x600",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate pellentesque convallis. Aenean lacinia nunc quis malesuada cursus.",
        },
    ]

    private carouselItem({ imagePath, description, photoId, productId }: PhotoType) {
        return (<Carousel.Item>
            <Link key={productId} to="/">
                <img
                    className="d-block w-100"
                    src={imagePath}
                    alt={imagePath}
                />

            </Link>
            {/* <Carousel.Caption>
                {caption}
            </Carousel.Caption> */}
        </Carousel.Item>)
    }
    render() {
        return (
            <Carousel controls={false}>
                {this.images.map(this.carouselItem)}
            </Carousel>
        );
    }
}

export default ProductCarousel;
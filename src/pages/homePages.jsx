import React, { useState, useEffect } from "react";
import Axios from 'axios'

import Navbar from '../component/navbar';
import Card from '../component/cardProducts';
import Footer from "../component/footer";
import { Link } from 'react-router-dom';

import {
    Container, Row, Col, InputGroup, Form, Button, Carousel
} from 'react-bootstrap'

import './pagesStyle.css'

const url = 'http://localhost:2000'

export default function HomePages() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [products, setProducts] = useState([])

    // pagination
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)

    let prodPerPage = 12
    let startCard = (page - 1) * prodPerPage
    let sliceCard = products.slice(startCard, startCard + prodPerPage)

    let sliceGallery = products.slice(1, 6)

    useEffect(() => {
        Axios.get(`${url}/products`)
            .then(res => {
                setProducts(res.data)
                setMaxPage(Math.ceil(res.data.length / prodPerPage))
            })
    }, [prodPerPage])

    const onNext = () => {
        setPage(page + 1)
    }

    const onPrev = () => {
        setPage(page - 1)
    }

    return (
        <>
            <Navbar />
            <Container fluid className="container-landing-page px-4">
                <Row>
                    <Col className="cont-left-lp col-5">
                        <div className="text-landing-page">
                            Welcome to the My Shop !
                        </div>

                        <div>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Search
                                </Button>
                            </InputGroup>
                        </div>

                        <div>
                            <Button variant="outline-primary" size="sm">jacket</Button>
                            <Button variant="outline-primary" className="mx-2" size="sm">shoes</Button>
                            <Button variant="outline-primary" size="sm">cloth</Button>
                        </div>
                    </Col>
                    <Col className="cont-gallery col-7">
                        <div className="gallery">
                            {sliceGallery.map(item =>
                                <img className="gallery-img" src={item.images[0]} alt="homeimg" as={Link} to={`/detail/${item.id}`} key={item.id} />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row >
                    <Col>
                        <Col className="title-products col-12 py-3">Popular Products</Col>
                        <Row>
                            <Col className="cont-carousel col-6">
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    <Carousel.Item>
                                        <img
                                            className="carousel-img d-block w-100"
                                            src="https://i.pinimg.com/564x/f2/ab/e5/f2abe5d9d2c659c5fcd0bfb89c010551.jpg"
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="carousel-img d-block w-100"
                                            src="https://i.pinimg.com/736x/f3/d3/bd/f3d3bd4ad90fa46b2c1fe2b26b9e46f0.jpg"
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="carousel-img d-block w-100"
                                            src="https://i.pinimg.com/564x/9c/e3/c5/9ce3c5a1b379ddc2570ae2fe6d489e36.jpg"
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                            <Col className="col-6">
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    <Carousel.Item>
                                        <img
                                            className="carousel-img d-block w-100"
                                            src="https://i.pinimg.com/564x/f2/ab/e5/f2abe5d9d2c659c5fcd0bfb89c010551.jpg"
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="carousel-img d-block w-100"
                                            src="https://i.pinimg.com/736x/f3/d3/bd/f3d3bd4ad90fa46b2c1fe2b26b9e46f0.jpg"
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="carousel-img d-block w-100"
                                            src="https://i.pinimg.com/564x/9c/e3/c5/9ce3c5a1b379ddc2570ae2fe6d489e36.jpg"
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col className="title-products col-12"> Our Products </Col>
                    <div className="container-card-map p-0 m-0">
                        {sliceCard.map((item) =>
                            <Card
                                data={item}
                                key={item.id}
                            />
                        )}
                    </div>

                    {/* PAGINATION */}
                    <div className="pagination-product my-4">
                        <Button className="mx-3" variant="outline-primary" size="sm" onClick={onPrev} disabled={page === 1 ? true : false}>Prev</Button>
                        <label style={{ color: "white" }}>Page {page}/{maxPage} </label>
                        <Button className="mx-3" variant="outline-primary" size="sm" onClick={onNext} disabled={page === maxPage ? true : false}>Next</Button>
                    </div>
                </Row>

                <Footer />
            </Container>
        </>
    )
}
import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    Container, Col, Row, Button
} from "react-bootstrap"

import NavBar from '../component/navbar'
import Card from '../component/cardProducts';

import "./pagesStyle.css"

const url = 'https://dbassessmentwdt.herokuapp.com'

export default function Detail() {
    const state = useSelector((state) => state.reducer)

    const [products, setProducts] = useState({})
    const [otherProducts, setOtherProducts] = useState([])
    const [favList, setFavList] = useState([])

    const [qty, setQty] = useState(1)
    const [toLogin, setToLogin] = useState(false)

    // pagination
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)

    let prodPerPage = 6
    let startCard = (page - 1) * prodPerPage
    let sliceCard = otherProducts.slice(startCard, startCard + prodPerPage)
    const onNext = () => {
        setPage(page + 1)
    }
    const onPrev = () => {
        setPage(page - 1)
    }

    let { id } = useParams();
    useEffect(() => {
        Axios.get(`${url}/products/${id}`)
            .then(res => {
                setProducts(res.data)
            })
        Axios.get(`${url}/products`)
            .then(res => {
                setOtherProducts(res.data)
                setMaxPage(Math.ceil(res.data.length / prodPerPage))
            })
        let idUser = localStorage.getItem('idUser')
        Axios.get(`${url}/user/${idUser}`)
            .then(res => {
                setFavList(res.data.favorite)
            });
    }, [id, prodPerPage])

    const onMin = () => {
        setQty(+qty - 1)
    }

    const onPlus = () => {
        setQty(+qty + 1)
    }

    const onQty = (e) => {
        setQty(+e.target.value)

        let n = +e.target.value
        let maxQty = +products.stock
        if (n < +1) {
            setQty('')
            if (qty === '') {
                setQty(1)
            }
        } else if (n > maxQty) {
            setQty(maxQty)
        } else if (n === '') {
            setQty(1)
        }
    }

    const onAddToCart = () => {
        if (!state.username)
            return setToLogin(true)

        let tempCart = state.cart
        let dataProducts = {
            id: products.id,
            name: products.name,
            price: products.price,
            images: products.images[0],
            maxStock: products.stock,
            qtyBuy: qty,
        }

        // untuk menambahkan update data jika produk sudak tersedia
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id === products.id) {
                let tempCart = state.cart
                let tempProd = state.cart[i]
                tempProd.qtyBuy += qty
                return (
                    tempCart.splice(i, 1, tempProd),
                    Axios.patch(`${url}/user/${state.id}`, { cart: tempCart })
                        .then(res => {
                            Axios.get(`${url}/products/${id}`)
                                .then(res => {
                                    setProducts(res.data)
                                })
                        })
                )
            }
        }

        tempCart.push(dataProducts)

        Axios.patch(`${url}/user/${state.id}`, { cart: tempCart })
            .then(res => {
                Axios.get(`${url}/products/${id}`)
                    .then(res => {
                        setProducts(res.data)
                    })
            })
    }

    const onAddToFav = () => {
        if (!state.username)
            return setToLogin(true)

        let tempFav = state.favorite
        let dataFavorite = {
            id: products.id,
            name: products.name,
            price: products.price,
            images: products.images[0],
            maxStock: products.stock,
        }

        // untuk menambahkan update data jika produk sudak tersedia
        for (let i = 0; i < state.favorite.length; i++) {
            if (state.favorite[i].id === products.id) {
                let tempFav = state.favorite
                return (
                    
                    Axios.patch(`${url}/user/${state.id}`, { favorite: tempFav })
                        .then(res => {
                            Axios.get(`${url}/user/${state.id}`)
                                .then(res => {
                                    setFavList(res.data.favorite)
                                })
                        })
                )
            }
        }

        tempFav.push(dataFavorite)

        Axios.patch(`${url}/user/${state.id}`, { favorite: tempFav })
            .then(res => {
                Axios.get(`${url}/user/${state.id}`)
                    .then(res => {
                        setFavList(res.data.favorite)
                    })
            })
    }

    if (toLogin)
        return (<Navigate to="/login" />)

    return (
        <div>
            <NavBar />
            <Container fluid className="px-4" id="detailPages">
                <Row className="mt-3 mb-0">
                    <Col lg={12} className="heading-detail px-0">
                        <label>Detail Product</label>
                        <Button className="my-2" variant="outline-primary" size="sm" as={Link} to="/cart">Go to Cart</Button>
                    </Col>
                </Row>

                <Row className="py-4">
                    <Col lg={5} className="detail-img-box px-0">
                        {products.images ?
                            <img src={products.images[0]} alt="products" className="img-detail" />
                            : []}
                    </Col>

                    <Col lg={7} className="ps-4">
                        <Col className="detail-brand mt-3 mb-0 p-0">{products.brand ? products.brand : ''} </Col>
                        <Col className="detail-title">{products.name ? products.name : ''}</Col>
                        <Col className="detail-price">IDR : {products.price ? products.price.toLocaleString() : ''}</Col>
                        <Col className="detail-p"> Ready stock :{products.stock ? products.stock : ''}</Col>
                        <Col className="detail-p">{products.description ? products.description : ''}</Col>

                        <Col>
                            <label className="detail-p me-3"> Set Quantity : </label>
                            <button className="btn-qty" onClick={onMin} disabled={qty === 1 ? true : false}> -</button>
                            <input className="qty-input mx-2" type="text" value={qty} onChange={(e) => onQty(e)} />
                            <button className="btn-qty" onClick={onPlus} disabled={qty === products.stock ? true : false}>+</button>
                        </Col>
                        <Col>
                            <Button className="my-2" variant="outline-primary" size="sm" onClick={onAddToCart}>
                                <i className="fa-solid fa-cart-shopping px-2"></i>Add to Cart
                                <span className="badge-cart px-1 mx-1">{state.cart.length}</span>
                            </Button>
                            <Button className="m-2" variant="outline-primary" size="sm" onClick={onAddToFav}>Add to Favorite
                                <span className="badge-cart px-1 mx-1">{favList.length}</span>
                            </Button>
                            <Button className="m-2" variant="outline-primary" size="sm" as={Link} to="/">Back to Shop</Button>
                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Col className="title-products col-12 mt-3"> Other Products you May Like </Col>
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
            </Container>
        </div>
    )
}
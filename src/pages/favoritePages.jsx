import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from "axios";
import {
    Container, Row, Col, Button
} from 'react-bootstrap'

import NavBar from '../component/navbar'
import './pagesStyle.css'

const url = 'http://localhost:2000'

export default function Favorite() {
    const state = useSelector((state) => state.reducer)

    const [favList, setFavList] = useState([])

    useEffect(() => {
        let id = localStorage.getItem('idUser')
        Axios.get(`${url}/user/${id}`)
            .then(res => {
                setFavList(res.data.favorite)
            });
    }, [])

    const onAddToCart = (index) => {
        let tempCart = state.cart
        let dataProducts = {
            id: favList[index].id,
            name: favList[index].name,
            price: favList[index].price,
            images: favList[index].images,
            maxStock: favList[index].stock,
            qtyBuy: 1,
        }

        // untuk menambahkan update data jika produk sudak tersedia
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id === favList[index].id) {
                let tempCart = state.cart
                let tempProd = state.cart[i]

                return (
                    tempCart.splice(i, 1, tempProd),
                    Axios.patch(`${url}/user/${state.id}`, { cart: tempCart })
                        .then(res => {
                            Axios.get(`${url}/user/${state.id}`)
                                .then(res => {
                                    setFavList(res.data.favorite)
                                })
                        })
                )
            }
        }

        tempCart.push(dataProducts)

        Axios.patch(`${url}/user/${state.id}`, { cart: tempCart })
            .then(res => {
                Axios.get(`${url}/user/${state.id}`)
                    .then(res => {
                        setFavList(res.data.favorite)
                    })
            })
    }

    const onDelete = (index) => {
        let tempFav = state.favorite
        tempFav.splice(index, 1)
        Axios.patch(`${url}/user/${state.id}`, { favorite: tempFav })
            .then(res => {
                setFavList(res.data.favorite)
            })
    }


    return (
        <div className="bg-detail">
            <NavBar />
            <Container fluid className="px-4" style={{ paddingBottom: "4rem" }}>
                <Row className="mt-3 mb-0">
                    <Col lg={12} className="heading-detail px-0">
                        <label>Your Favorite Products</label>
                        <Button className="my-2" variant="outline-primary" size="sm" as={Link} to="/cart">Go to Cart</Button>
                    </Col>
                </Row>

                {favList.length !== 0 ?
                    <>
                        {favList.map((item, index) =>
                            <Row key={index}>
                                <div className="cart-box mt-3 py-3">
                                    <div className="cart-box-img py-2">
                                        <img className="cart-img me-2" src={item.images} alt="product" />
                                    </div>
                                    <div className="cart-title ms-3">
                                        <div className="cart-title-name">{item.name}</div>
                                        <div className="cart-stock">Ready stock : {item.maxStock}</div>
                                    </div>
                                    <div className="cart-price-pcs me-2">IDR {item.price.toLocaleString()} / pcs</div>

                                    <div className="cart-price ">
                                        <Button className="my-2" variant="outline-primary" size="sm" onClick={() => onAddToCart(index)}>
                                            <i className="fa-solid fa-cart-shopping"></i>Add to Cart
                                            <span className="badge-cart px-1">{state.cart.length}</span>
                                        </Button>
                                    </div>
                                    <div className="cart-close" >
                                        <button className="btn-style-3" onClick={() => onDelete(index)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            </Row>
                        )}
                        <Row>
                            <div className="cart-box-bottom py-4 mt-3">
                                <div>
                                    <Button className="my-2" variant="outline-primary" size="sm" as={Link} to="/">Back to Shop</Button>
                                </div>
                            </div>
                        </Row>
                    </>
                    :
                    <>
                        {!state.id ?
                            <div className="empty-cart">
                                <i className="fa-solid fa-triangle-exclamation py-3"></i>Please Login first to see your Favorite Cart !
                                <Button className="my-2" variant="outline-primary" size="sm" as={Link} to="/login">Go to Log In</Button>
                            </div>
                            :
                            <>
                                <div className="empty-cart">
                                    <i className="fa-solid fa-triangle-exclamation my-3"></i>Your Favorite List is Empty !
                                    <Button className="my-2" variant="outline-primary" size="sm" as={Link} to="/">Back to Shop</Button>
                                </div>
                            </>
                        }
                    </>
                }

            </Container>
        </div>
    )
}
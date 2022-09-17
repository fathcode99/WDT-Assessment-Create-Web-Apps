import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from "axios";
import {
    Container, Row, Col, Modal, Button
} from 'react-bootstrap'

import NavBar from '../component/navbar'
import './pagesStyle.css'

const url = 'https://dbassessmentwdt.herokuapp.com'

export default function Cart() {
    const state = useSelector((state) => state.reducer)
    const dispatch = useDispatch()

    const [cartList, setCartList] = useState([])
    const [indexEdit, setIndexEdit] = useState(null)
    const [errorCeck, setErrorCeck] = useState(false)
    const [notifCheckout, setNotifCheckout] = useState(false)
    const handleClose = () => setErrorCeck(false);
    const handleCloseNotif = () => setNotifCheckout(false);

    const [qty, setQty] = useState(null)

    const TotalPrice = () => {
        let total = null
        for (let i = 0; i < cartList.length; i++) {
            total += +cartList[i].qtyBuy * +cartList[i].price
        }
        return (total)
    }

    useEffect(() => {
        let id = localStorage.getItem('idUser')
        Axios.get(`${url}/user/${id}`)
            .then(res => {
                setCartList(res.data.cart)
            });
    }, [])

    const onDelete = (index) => {
        let tempCart = state.cart
        tempCart.splice(index, 1)
        Axios.patch(`${url}/user/${state.id}`, { cart: tempCart })
            .then(res => {
                setCartList(res.data.cart)
            })
    }

    const onEdit = (index) => {
        setIndexEdit(index)
        setQty(cartList[index].qtyBuy)
    }

    const onMin = () => {
        setQty(+qty - 1)
    }

    const onPlus = () => {
        setQty(+qty + 1)
    }

    const onQty = (e, maxStock) => {
        setQty(+e.target.value)

        let n = +e.target.value

        if (n < +1) {
            setQty(0)
        } else if (n > maxStock) {
            setQty(maxStock)
        } else {
            setQty(n)
        }
    }

    const onSave = (index) => {
        let tempCart = cartList
        let tempProd = cartList[index]

        tempProd.qtyBuy = qty
        tempCart.splice(index, 1, tempProd)

        Axios.patch(`${url}/user/${state.id}`, { cart: tempCart })
            .then(res => {
                setCartList(res.data.cart)
            })
        setIndexEdit(null)
    }

    const onCeckOut = () => {
        if (cartList.length === 0) {
            return setErrorCeck(true)
        } else {
            return (
                Axios.patch(`${url}/user/${state.id}`, { cart: [] })
                    .then(res => {
                        Axios.get(`${url}/user/${state.id}`)
                            .then(res => {
                                dispatch({
                                    type: 'LOGIN',
                                    payload: res.data
                                })
                            })
                        setCartList([])
                    }),
                setNotifCheckout(true)
            )
        }
    }


    return (
        <div className="bg-detail">
            <Modal show={errorCeck} onHide={handleClose}>
                <Modal.Body className="modal-body"><i className="fa-solid fa-triangle-exclamation px-2"></i>Your shopping cart is empty. Please add product first !</Modal.Body>
            </Modal>

            <Modal show={notifCheckout} onHide={handleCloseNotif}>
                <Modal.Body className="modal-body-notif"><i className="fa-solid fa-triangle-exclamation px-2"></i>Your order will be processed immediately. </Modal.Body>
            </Modal>

            <NavBar />
            <Container fluid className="px-4" style={{ paddingBottom: "4rem" }}>
                <Row className="mt-3 mb-0">
                    <Col lg={12} className="heading-detail px-0">
                        <label>Your Shopping Cart</label>
                        <Button className="my-2" variant="outline-primary" size="sm" onClick={onCeckOut}><i className="fa-solid fa-cart-shopping px-2"></i>Checkout</Button>

                    </Col>
                </Row>

                {cartList.length !== 0 ?
                    <>
                        {cartList.map((item, index) =>
                            <Row key={item.id}>
                                <div className="cart-box mt-3 py-3">
                                    <div className="cart-box-img py-2">
                                        <img className="cart-img me-2" src={item.images} alt="product" />
                                    </div>
                                    <div className="cart-title ms-3">
                                        <div className="cart-title-name">{item.name}</div>
                                        <div className="cart-stock">Ready stock : {item.maxStock}</div>
                                    </div>
                                    <div className="cart-price-pcs me-2">IDR {item.price.toLocaleString()} / pcs</div>

                                    <div className="cart-counter me-2">
                                        {indexEdit === index ?
                                            <>
                                                <div>
                                                    <button className="btn-qty" onClick={() => onMin(index)} disabled={qty === 1 ? true : false}> -</button>
                                                    <input className="qty-input" type="text" value={qty} onChange={(e) => onQty(e, item.maxStock)} />
                                                    <button className="btn-qty" onClick={onPlus} disabled={qty === item.maxStock ? true : false}>+</button>
                                                </div>

                                                <div>
                                                    <button className="btn-style-3 px-1" onClick={() => setIndexEdit(null)}>
                                                        <i className="fa-solid fa-rectangle-xmark"></i>
                                                    </button>
                                                    <button className="btn-style-3 p-0" onClick={() => onSave(index)}>
                                                        <i className="fa-solid fa-square-check "></i>
                                                    </button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <p className="m-0">{item.qtyBuy}</p>
                                                    <button className="btn-style-3 mx-2" onClick={() => onEdit(index)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <div className="cart-price me-2">IDR {(item.qtyBuy * item.price).toLocaleString()}</div>
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
                                <div className="cart-bottom-price">
                                    Total Price : IDR {cartList.length !== 0 ? TotalPrice().toLocaleString() : ''}
                                </div>
                            </div>
                        </Row>
                    </>
                    :
                    <>
                        {!state.id ?
                            <div className="empty-cart">
                                <i className="fa-solid fa-triangle-exclamation py-3"></i>Please Login first to see your Shopping Cart !
                                <Button className="my-2" variant="outline-primary" size="sm" as={Link} to="/login">Go to Log In</Button>
                            </div>
                            :
                            <>
                                <div className="empty-cart">
                                    <i className="fa-solid fa-triangle-exclamation my-3"></i>Your Shopping Cart is Empty !
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
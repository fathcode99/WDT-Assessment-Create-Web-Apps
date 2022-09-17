import React, { useState } from "react";

import {
    Modal, Nav, Button
} from 'react-bootstrap'

import { Link, Navigate } from 'react-router-dom'
import Axios from 'axios'

import { useDispatch, useSelector } from "react-redux";

const url = "https://dbassessmentwdt.herokuapp.com"

export default function Login() {
    const state = useSelector((state) => state.reducer)
    const dispatch = useDispatch()

    const handleCloseLogin = () => {
        dispatch({
            type: "HANDLE_CLOSE"
        })
    }

    // Authentication
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const onSign = async () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value

        if (!username && !password) {
            return (setErrorPassword(true), setErrorUsername(true))
        } else if (!username && password) {
            return (setErrorPassword(false), setErrorUsername(true))
        } else if (username && !password) {
            return (setErrorPassword(true), setErrorUsername(false))
        }

        await Axios.get(`${url}/user?username=${username}&password=${password}`)
            .then(res => {
                if (res.data.length === 0) {
                    dispatch({
                        type: "ERROR_LOGIN"
                    })
                } else {
                    localStorage.setItem('idUser', res.data[0].id)
                    dispatch({
                        type: "LOGIN",
                        payload: res.data[0]
                    })
                }
            })
    }

    if (state.username) {
        return (<Navigate to="/" />)
    }

    return (
        <div className="login-bg">
            <Modal show={state.errorLogin} onHide={handleCloseLogin}>
                <Modal.Body className="modal-body"><i className="fa-solid fa-triangle-exclamation px-2"></i>Akun ini belum terdaftar.</Modal.Body>
            </Modal>

            <div className="login-from-container">
                <div className="login-text-title">Hello, welcome back !</div>
                <div>
                    <div className="mt-3">
                        <label className="login-text-label">Username </label>
                        <div>
                            <input className="login-input px-0" style={{ width: "250px" }} type="text" placeholder="Username" id="username" />
                        </div>
                        {errorUsername ? <b className="p-error"> Please input your Username !</b> : ''}
                    </div>

                    <div className="pt-2">
                        <label className="login-text-label">Password </label>
                        <div className="login-box-form-pw">
                            <input className="login-input px-0" style={{ width: "250px" }} type="password" placeholder="Password" id="password" />
                        </div>
                        {errorPassword ? <b className="p-error"> Please input your Password !</b> : ''}
                    </div>
                    <Button className="my-2" variant="outline-primary" size="sm" onClick={onSign}>Login</Button>


                    <p className="text-ask pt-3 m-0">
                        Don't have an account yet ?
                        <Nav as={Link} to="/register" className="btn-sign-up mx-2"> Sign Up </Nav>
                    </p>
                    <p className="text-ask ">
                        Go to
                        <Nav as={Link} to="/" className="btn-sign-up mx-2"> Home </Nav>
                    </p>
                </div>
            </div>
        </div>
    )
}
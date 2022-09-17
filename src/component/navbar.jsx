import React from "react";
import './componentStyle.css'

import { useSelector, useDispatch } from "react-redux";

import {
   Nav, Container, Navbar
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

export default function NavBar() {
   const state = useSelector((state) => state.reducer)
   const dispatch = useDispatch()

   const onLogOut = () => {
      localStorage.removeItem('idUser')
      dispatch({
         type: "LOGOUT"
      })
   }

   return (
      <Navbar bg="dark" variant="dark">
         <Container fluid className="px-4">
            <Navbar.Brand as={Link} to="/">
               Assessment Market
            </Navbar.Brand>

            <Nav className="menu-navbar me-auto">
               <Nav.Link as={Link} to="/">Home</Nav.Link>
               <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
               <Nav.Link as={Link} to="/favorite">Product Favorite</Nav.Link>
            </Nav>

            {state.id ?
               <Nav className="menu-login-navbar me-auto">
                  <Nav.Link as={Link} to="/register">{state.username}</Nav.Link>
                  <Nav.Link onClick={onLogOut}>Log out</Nav.Link>
               </Nav>
               :
               <Nav className="menu-login-navbar me-auto">
                  <Nav.Link as={Link} to="/register">Daftar</Nav.Link>
                  <Nav.Link as={Link} to="/login">Log In</Nav.Link>
               </Nav>
            }

         </Container>
      </Navbar >
   )
}
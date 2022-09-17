import React from "react";
import {
    Col,
    Container, Row
} from 'react-bootstrap'

import "./componentStyle.css"

export default function footer() {
    return (
        <div className="bg-footer">
            <Container >
                <Row className="footer-container">
                    <Col>
                        <Col className="heading-footer">ABOUT US</Col>
                        <Col>History</Col>
                        <Col>Place</Col>
                        <Col>Employee</Col>
                        <Col>Company</Col>
                    </Col>

                    <Col>
                        <Col className="heading-footer">INFORMATION</Col>
                        <Col>History</Col>
                        <Col>Place</Col>
                        <Col>Employee</Col>
                        <Col>Company</Col>
                    </Col>

                    <Col>
                        <Col className="heading-footer">SOCIAL MEDIA</Col>
                        <Col><i className="fa-brands fa-square-facebook"></i> Facebook Pages</Col>
                        <Col><i className="fa-brands fa-square-twitter"></i> Twitter</Col>
                        <Col><i className="fa-brands fa-square-instagram"></i> Instagram </Col>
                    </Col>

                    <Col>
                        <Col className="heading-footer">HELP</Col>
                        <Col>Support</Col>
                        <Col>Contact</Col>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
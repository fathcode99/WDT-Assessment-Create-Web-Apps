import React from "react";

import { Link } from 'react-router-dom'
import "./componentStyle.css"

export default function CardProducts(products) {
    return (
        <Link as={Link} to={`/detail/${products.data.id}`} key={products.data.id} className="link-detail">
            <div className="card-container">
                <img className="card-container-img" src={products.data.images[0]} alt="card-img"/>
                <div className="py-0">
                    <div className="card-title px-2">{products.data.name}</div>
                    <div className="card-price px-2 pb-2">
                        IDR {products.data.price.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link >
    )
}
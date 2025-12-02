import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';


const ProductAll = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [query, setQuery] = useSearchParams();

    const getProducts = async () => {
        setLoading(true)
        setError(null)
        try {
            let keyword = query.get("q") || "";
            let url = `http://localhost:4000/products?q=${keyword}`;            
            let res = await fetch(url)           
            let data = await res.json(); 
            if (data.length < 1) {
                if (keyword !== "") {
                setError(`${keyword}와 일치하는 상품이 없습니다`);
                } else {
                throw new Error("결과가 없습니다");
                }
            }
            setProducts(data)
        } catch (err) {
            console.error('getProducts error', err)
            setError(err)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getProducts();
    }, [query]);


  return (
    <div>
         <Container>
            <Row>
                {products.length > 0 &&
                    products.map(product => (
                    <Col  md={3} sm={12} key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
         </Container>
        
    </div>
  )
}

export default ProductAll
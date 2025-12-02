import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';


const ProductAll = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams();

    const getProducts = async (searchQuery = "") => {
        setLoading(true)
        setError(null)
        try {
            const q = encodeURIComponent(searchQuery);
            const url = q ? `https://my-json-server.typicode.com/chayoungsim/sim-hnm/products?q=${q}` : `https://my-json-server.typicode.com/chayoungsim/sim-hnm/products`;
            
            const res = await fetch(url)
            if (!res.ok) throw new Error(`Fetch error ${res.status}`)
            let data = await res.json();
           
            if (searchQuery) {
                const lowered = searchQuery.toLowerCase();
                const filtered = data.filter(p => (p.title || '').toLowerCase().includes(lowered));
                if (filtered.length !== data.length) {                    
                    data = filtered
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

   const qValue = searchParams.get('q') || '';
   useEffect(() => {
        console.log('search param changed q=', qValue)
        getProducts(qValue)
   },[qValue]) 


  return (
    <div>
         <Container>
            <Row>
                {
                products.map(product => (
                    <Col lg={3} key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))
                }
            </Row>
         </Container>
        
    </div>
  )
}

export default ProductAll
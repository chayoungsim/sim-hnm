import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showDetail = () => {
     navigate(`product/${product.id}`)
  }

  return (
    <div className='product-item' onClick={showDetail}>
        <div><img src={product?.img} alt={product.title} /></div>
        <div>{product?.choice == true ? "CHOICE" : ""}</div>
        <div>{product?.title}</div>
        <div>\{product?.price}</div>
        <div>{product?.new == true ? "신제품" :""}</div>
    </div>
  )
}

export default ProductCard
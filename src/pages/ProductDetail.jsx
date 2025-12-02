import React,{ useEffect , useState} from 'react'
import  { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';


const ProductDetail = () => {

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {id} = useParams();
  const navigate = useNavigate();

  const url= `http://localhost:4000/products/${id}`

  const getProductDetail = async () => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`서버 응답 오류 ${res.status}`)
      const data = await res.json()
      setProduct(data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductDetail();
  },[id])

  const goToList = () => {
      navigate('/')
  }

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러: {error.message}</div>
  if (!product) return <div>상품 정보를 찾을 수 없습니다.</div>

  return (
    <Container>
      <Row>
        <Col><img src={product.img} alt={product.title || 'product'} /></Col>
        <Col>
            <div>{product.title}</div>
            <div>\{product.price}</div>
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Size
                </Dropdown.Toggle>
                <Dropdown.Menu>                  
                  <Dropdown.Item href="#/action-1">{product.size[0]}</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">{product.size[1]}</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">{product.size[2]}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div><Button variant="success" onClick={goToList}>목록으로</Button></div>
        </Col>
      </Row>        
    </Container>
  )
}

export default ProductDetail
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ authenticate, setAuthenticate }) => {

    const menuList = [
        "남성",
        "Divided",
        "남성",
        "신생아/유아",
        "아동",
        "H&M HOME",
        "Sale",
        "지속가능성"
    ]

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    }

    const search = (e) => {
        if(e.key == "Enter") {
            let keyword = e.target.value
            navigate(`/?q=${keyword}`)
        }
    }

  return (
    <div>        
        <div className='login-button'>
            <button type='button' onClick={goToLogin}>                
                {authenticate ? (
                    <div onClick={() => setAuthenticate(false)}>
                        <FontAwesomeIcon icon={faUser} />
                        <span style={{ cursor: "pointer" }}>로그아웃</span>
                    </div>
                    ) : (
                     <div onClick={() => navigate("/login")}>
                        <FontAwesomeIcon icon={faUser} />
                        <span style={{ cursor: "pointer" }}>로그인</span>
                    </div>
                    )
                }
            </button>
        </div>        
        <div><h1>로고</h1></div>
        <div className='menu-wrap'>
            <ul className='meun-lists'>
                {
                    menuList.map((menu,idx) => (
                        <li key={idx}>{menu}</li>
                    ))
                }
            </ul>
            <div className='search-box'>
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" onKeyDown={(e) => search(e)}/>
            </div>
        </div>

    </div>
  )
}

export default Navbar
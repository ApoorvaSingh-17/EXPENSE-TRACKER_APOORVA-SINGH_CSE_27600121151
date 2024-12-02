import { Button, Input  } from 'antd';
import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd';

const Header = ({ onSearch }) => {
  const [loginUser, setLoginUser] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      setLoginUser(user)
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success("Logout successfully!!");
    navigate('/login');
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };


  return (
    <>
     <nav className="custom-navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/">
            SPENDWISE
          </Link>
          <div className="search-bar">
            <Input
              placeholder="Search by category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 200, marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div className="navbar-actions">
            {loginUser && (
              <span className="user-name">Welcome, {loginUser.name}</span>
            )}
            <Button type="primary" onClick={logoutHandler} className="logout-btn">
              Logout
            </Button>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header

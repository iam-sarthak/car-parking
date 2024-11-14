import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    navigate('/login');
  };

  return (
    <>
    <div className="navbar-btn">
      <Link to="/">Home</Link>
      {token ? (
        
        <>
          <Link className="btn" to="/cars/new">Add Car</Link>
          <a className="btn" onClick={handleLogout}>Logout</a>
          </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      </div>
    </>
  );
};

export default Navbar;

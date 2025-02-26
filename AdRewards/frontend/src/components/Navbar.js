import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/advertiser">Advertiser Dashboard</Link>
      <Link to="/user">User Dashboard</Link>
    </nav>
  );
};

export default Navbar;
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function FooterPage() {
  return (
    <div>
      <h1>Footer page</h1>
      <Outlet />
      <ul>
        <li>
          <Link to="footer1">Footer1</Link>
        </li>
        <li>
          <Link to="footer2">Footer2</Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterPage
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export default function Header({ activeLink }) {
  return (
    <div className="pilla_header">
      <ul>
        <li>
          <Link to="/pillar/gobi-cashmere" className={activeLink === 'gobi-cashmere' && 'active'}>
            Gobi Cashmere
          </Link>
        </li>
        <li>
          <Link to="/pillar/mongolian-cashmere" className={activeLink === 'mongolian-cashmere' && 'active'}>
            Mongolian Cashmere
          </Link>
        </li>
        <li>
          <Link to="/pillar/cashmere-is-for-everyone" className={activeLink === 'cashmere-is-for-everyone' && 'active'}>
            Cashmere is for everyone
          </Link>
        </li>
        <li>
          <Link to="/pillar/facts-about-cashmere" className={activeLink === 'facts-about-cashmere' && 'active'}>
            Facts about cashmere
          </Link>
        </li>
        <li>
          <Link to="/pillar/cashmere-care" className={activeLink === 'cashmere-care' && 'active'}>
            Cashmere Care
          </Link>
        </li>
      </ul>
    </div>
  );
}

Header.propTypes = {
  activeLink: PropTypes.string,
};

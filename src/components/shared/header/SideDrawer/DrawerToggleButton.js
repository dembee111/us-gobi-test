import React from 'react';

import './DrawerToggleButton.scss';

const drawerToggleButton = (props) => (
  <button className="toggle-mobile-btn" aria-label="Drawer Toggle" onClick={props.click}>
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 0C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1H17.5C17.7761 1 18 0.776142 18 0.5C18 0.223858 17.7761 0 17.5 0H0.5ZM0 8C0 7.72386 0.223858 7.5 0.5 7.5H14.125C14.4011 7.5 14.625 7.72386 14.625 8C14.625 8.27614 14.4011 8.5 14.125 8.5H0.5C0.223858 8.5 0 8.27614 0 8ZM0 15.5C0 15.2239 0.223858 15 0.5 15H17.5C17.7761 15 18 15.2239 18 15.5C18 15.7761 17.7761 16 17.5 16H0.5C0.223858 16 0 15.7761 0 15.5Z"
        fill="#4F5255"
      />
    </svg>
  </button>
);

export default drawerToggleButton;

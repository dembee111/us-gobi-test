import React from 'react';
import { Link } from 'gatsby';
import { Highlight, connectMenu } from 'react-instantsearch-dom';

const Menu = ({ items, isFromSearch, refine, ...props }) => (
  <ul>
    {items.map((item) => (
      <li key={item.value}>
        <div
          onMouseEnter={(event) => {
            event.preventDefault();
            if (item.value !== '') {
              refine(item.value);
              props.setViewLink(item.value);
            }
          }}
        >
          <Link to={'/search/' + item.label}>
            {isFromSearch ? <Highlight attribute="product_type" hit={item} /> : item.label}
          </Link>
        </div>
      </li>
    ))}
  </ul>
);

const CustomMenu = connectMenu(Menu);
export default CustomMenu;

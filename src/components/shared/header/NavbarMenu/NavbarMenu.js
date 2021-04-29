import React, { useState } from 'react';
import './NavbarMenu.scss';
import { Link } from 'gatsby';
import { headerCategories } from '../../data/headerCategories';

const NavbarMenu = () => {
  const [dropDown, setDropDown] = useState();

  function dropDownEnter(e) {
    setDropDown('hoverClass');
  }

  function dropDownLeave(e) {
    setDropDown('');
  }

  return (
    <div className="menu_list" key="1">
      {headerCategories.map((item, index) => {
        return (
          <div className="top_nav" key={index} onMouseEnter={dropDownEnter} onMouseLeave={dropDownLeave}>
            <h2 className={'tt ' + dropDown + ' ' + item.color_style + ' ' + item.font_style}>
              <Link to={item.link}>{item.label}</Link>
            </h2>
            {item.child ? (
              <div className={'dropdown_nav ' + item.style}>
                <div className="dropdown_grid">
                  {item.child.map((item, index) => {
                    if (item.child) {
                      return (
                        <div key={index} className="tc_cus-col">
                          <ul>
                            {item.child.map((item, index) => {
                              if (item.title_style === 'sub_tt') {
                                return (
                                  <li key={index} className={item.title_style + ' ' + item.margin_top}>
                                    <span>{item.label}</span>
                                  </li>
                                );
                              } else {
                                return (
                                  <li key={index} className={item.font_style}>
                                    <Link to={item.link} className={item.color_style}>
                                      <span>{item.label}</span>
                                    </Link>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              ' '
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavbarMenu;

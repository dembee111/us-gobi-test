import React, { useState } from 'react';
import { Link } from 'gatsby';
import './SubMenu.scss';

const SubMenu2 = (props) => (
  <>
    <div className="sub-list">
      <div>
        <div className="sub-list-back">
          <div
            className="backBtn"
            onClick={() => {
              props.setSubMenuShow(false);
            }}
          >
            <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.68066 0.892822L1.05566 5.51782L5.68066 10.1428" stroke="black" />
              <path d="M1.68066 5.51782H16.4307" stroke="black" />
            </svg>
            <span>Back</span>
          </div>
        </div>

        {props.node.child.map((item, index) => {
          if (item.child) {
            return (
              <ul key={index}>
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
            );
          }
        })}
      </div>
    </div>
  </>
);

export default SubMenu2;

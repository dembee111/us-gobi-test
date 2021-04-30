import React, { useState, useEffect, Fragment } from 'react';
import AlertMessage from '../../../components/shared/AlertMessage';
export default function ListOrders(props) {
  let {
    currentTodos,
    changeData,
    search,
    days,
    setSearch,
    onChange,
    ordersDetailsHandle,
    nextPage,
    prevPage,
    callPages,
    last,
    currentPage,
    totalPage,
    nextPageList,
    prevPageList,
    callPagesList,
    currentTodosList,
    lastList,
  } = props;

  return (
    <Fragment>
      <div className="account-main">
        <div className="grid full">

          <div className="big_card">
            <div className="card-header">
              <h1 className="md_tt bold uppercase">Order History</h1>
              <div className="text">
                <div className="icon">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22.9014C17.5228 22.9014 22 18.4242 22 12.9014C22 7.37852 17.5228 2.90137 12 2.90137C6.47715 2.90137 2 7.37852 2 12.9014C2 18.4242 6.47715 22.9014 12 22.9014Z"
                      stroke="#4F5255"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16.9014V12.9014"
                      stroke="#4F5255"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8.90137H12.01"
                      stroke="#4F5255"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="p">
                  This email will be used for accessing your private pages as well as for receiving correspondence and
                  newsletters.
                </p>
              </div>
              <div className="search_filter">
                <div className="group search">
                  <label htmlFor="orderSearch">Search Google:</label>
                  <input
                    type="text"
                    id="orderSearch"
                    name="orderSearch"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <div className="group">
                  <div className="dropdown-select">
                    <div className="select-grid">
                      <div className="icon">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0)">
                            <path
                              d="M12.7458 2.90234H3.41243C2.67606 2.90234 2.0791 3.4993 2.0791 4.23568V13.569C2.0791 14.3054 2.67606 14.9023 3.41243 14.9023H12.7458C13.4821 14.9023 14.0791 14.3054 14.0791 13.569V4.23568C14.0791 3.4993 13.4821 2.90234 12.7458 2.90234Z"
                              stroke="#12263F"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.7456 1.56836V4.23503"
                              stroke="#12263F"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.4126 1.56836V4.23503"
                              stroke="#12263F"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.0791 6.90234H14.0791"
                              stroke="#12263F"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="16" height="16" fill="white" transform="translate(0.0791016 0.235352)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      <select className="p" onChange={(e) => onChange(e)}>
                        {days &&
                          days.map((item, i) => {
                            return (
                              <option key={i} value={item.day}>
                                {item.title}
                              </option>
                            );
                          })}
                      </select>

                      {/* <div className="icon">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1.23535 0.902344L5.23535 4.90234L9.23535 0.902344"
                            stroke="black"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div> */}
                    </div>
                    <div className="dropdown-list open"></div>
                  </div>
                </div>
              </div>
            </div>
            {props.order === '' ? (
              <AlertMessage
                type={'warning'}
                message="No orders have been found"
              />
            ) : (
              <>
                <div className="card-body">
                  <div className="cs_table">
                    <div className="head">
                      <div className="list">
                        <h1 className="tt bold">Order</h1>
                      </div>
                      <div className="list">
                        <h1 className="tt bold">Image</h1>
                      </div>
                      <div className="list">
                        <h1 className="tt bold">Product</h1>
                      </div>
                      <div className="list">
                        <h1 className="tt bold">Color</h1>
                      </div>
                      <div className="list">
                        <h1 className="tt bold">Price</h1>
                      </div>
                      <div className="list">
                        <h1 className="tt bold">Date</h1>
                      </div>
                      <div className="list">
                        <h1 className="tt bold">Fulfillment</h1>
                      </div>
                      <div className="list"></div>
                      <div className="list"></div>
                    </div>
                    <div className="tbody">
                      {changeData ? (
                        currentTodosList
                          .filter((item) => {
                            if (search == '') {
                              return item;
                            } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                              return item;
                            }
                          })
                          .map((day, i) => (
                            <div className="table_grid" key={i}>
                              <div className="items">
                                {/* <a href="/account/order/view"> */}
                                <span
                                  style={{
                                    color: '#2C7BE5',
                                    background: '#F5F7F6',
                                    border: 'none',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => ordersDetailsHandle(day.orderName)}
                                >
                                  {day.orderName}
                                </span>
                                {/* </a> */}
                              </div>
                              <div className="items">
                                <div className="img">
                                  <img src={day.orgImg} alt="gobi" style={{ width: '35px', height: '55px' }} />
                                </div>
                              </div>
                              <div className="items">
                                <div className="tooltip">
                                  <h1 className="tt txt_normal">{day.title}</h1>
                                  <div className="hide">
                                    <div className="down_arrow"></div>
                                    <h1 className="tt txt_normal">{day.title}</h1>
                                  </div>
                                </div>
                              </div>
                              <div className="items">
                                <span>{day.colorName}</span>
                              </div>
                              <div className="items">
                                <span> ${day.price}</span>
                              </div>
                              <div className="items">
                                <span>{day.createAt}</span>
                              </div>
                              <div className="items">
                                <span className="unfulfilled">
                                  <span>{day.fulfillmentStatus}</span>
                                </span>
                              </div>
                              <div className="items">
                                <div className="items">
                                  <div className="track">
                                    <div className="icon">
                                      <svg
                                        width="17"
                                        height="17"
                                        viewBox="0 0 17 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M2.78613 10.3561C2.78613 10.3561 3.45662 9.68945 5.4681 9.68945C7.47957 9.68945 8.82055 11.0228 10.832 11.0228C12.8435 11.0228 13.514 10.3561 13.514 10.3561V2.35612C13.514 2.35612 12.8435 3.02279 10.832 3.02279C8.82055 3.02279 7.47957 1.68945 5.4681 1.68945C3.45662 1.68945 2.78613 2.35612 2.78613 2.35612V10.3561Z"
                                          stroke="white"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M2.78613 15.0231V10.3564"
                                          stroke="white"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    <span>Tracking</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : currentTodos ? (
                        currentTodos
                          .filter((item) => {
                            if (search == '') {
                              return item;
                            } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                              return item;
                            }
                          })
                          .map((item, i) => (
                            <div className="table_grid" key={i}>
                              <div className="items">
                                <span
                                  style={{
                                    color: '#2C7BE5',
                                    background: '#F5F7F6',
                                    border: 'none',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => ordersDetailsHandle(item.orderName)}
                                >
                                  {item.orderName}
                                </span>
                              </div>
                              <div className="items">
                                <div className="img">
                                  <img src={item.orgImg} alt="gobi" />
                                </div>
                              </div>
                              <div className="items">
                                <div className="tooltip">
                                  <h1 className="tt txt_normal">{item.title}</h1>
                                  <div className="hide">
                                    <div className="down_arrow"></div>
                                    <h1 className="tt txt_normal">{item.title}</h1>
                                  </div>
                                </div>
                              </div>
                              <div className="items">
                                <span>{item.colorNew}</span>
                              </div>
                              <div className="items">
                                <span> $ {item.price}</span>
                              </div>
                              <div className="items">
                                <span>{item.createAt}</span>
                              </div>
                              <div className="items">
                                <span className="unfulfilled">
                                  <span>{item.fulfillmentStatus}</span>
                                </span>
                              </div>
                              <div className="items">
                                <div className="track">
                                  <div className="icon">
                                    <svg
                                      width="17"
                                      height="17"
                                      viewBox="0 0 17 17"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.78613 10.3561C2.78613 10.3561 3.45662 9.68945 5.4681 9.68945C7.47957 9.68945 8.82055 11.0228 10.832 11.0228C12.8435 11.0228 13.514 10.3561 13.514 10.3561V2.35612C13.514 2.35612 12.8435 3.02279 10.832 3.02279C8.82055 3.02279 7.47957 1.68945 5.4681 1.68945C3.45662 1.68945 2.78613 2.35612 2.78613 2.35612V10.3561Z"
                                        stroke="white"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M2.78613 15.0231V10.3564"
                                        stroke="white"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <span>Tracking</span>
                                </div>
                              </div>
                              {/* <div className="items">
                            <div className="delete">
                              <div className="icon">
                                <svg
                                  width="18"
                                  height="17"
                                  viewBox="0 0 18 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.94336 4.5127H4.28434H15.0122"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6.29614 4.51237V3.17904C6.29614 2.82541 6.43742 2.48628 6.68891 2.23623C6.94039 1.98618 7.28147 1.8457 7.63712 1.8457H10.3191C10.6747 1.8457 11.0158 1.98618 11.2673 2.23623C11.5188 2.48628 11.6601 2.82541 11.6601 3.17904V4.51237M13.6715 4.51237V13.8457C13.6715 14.1993 13.5303 14.5385 13.2788 14.7885C13.0273 15.0386 12.6862 15.179 12.3306 15.179H5.62565C5.27 15.179 4.92892 15.0386 4.67743 14.7885C4.42595 14.5385 4.28467 14.1993 4.28467 13.8457V4.51237H13.6715Z"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.63721 7.8457V11.8457"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.3188 7.8457V11.8457"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span>Delete</span>
                            </div>
                          </div> */}
                            </div>
                          ))
                      ) : (
                        <AlertMessage
                          type={'warning'}
                          message="This email will be used for accessing your private pages as well as for receiving correspondence and newsletters."
                        />
                      )}
                      {currentTodos.length > 0 ? (
                        ''
                      ) : (
                        <div style={{ height: '80px' }}>
                          <div
                            style={{
                              left: '50%',
                              position: 'relative',
                              transform: 'translate(-50%,-50%)',
                              top: '50%',
                              width: '32px',
                              height: '32px',
                            }}
                          >
                            <img
                              style={{
                                width: '32px',
                                height: '32px',
                              }}
                              src="https://cdn.shopify.com/s/files/1/1953/2845/files/785_1.gif?v=1597982910"
                            ></img>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="tc_Order-mobile">
                    <div className="table_header">
                      <span>Order</span>
                    </div>
                    {changeData ? (
                      currentTodosList.map((day, i) => (
                        <div className="table_grid" key={i}>
                          <div className="img">
                            <a href="/account/order/view">
                              <img src={day.orgImg} alt="Gobi Cashmere" />
                            </a>
                          </div>
                          <div className="detail">
                            <span className="order">{day.orderName}</span>
                            <h1 className="tt txt_normal">{day.colorName}</h1>
                            <span className="size">{day.colorName}</span>
                            <span className="date">{day.createAt}</span>
                          </div>
                          <div className="price">
                            <span>${day.price}</span>
                          </div>
                          <div className="tc_row">
                            <div className="track">
                              <div className="icon">
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.78613 10.3561C2.78613 10.3561 3.45662 9.68945 5.4681 9.68945C7.47957 9.68945 8.82055 11.0228 10.832 11.0228C12.8435 11.0228 13.514 10.3561 13.514 10.3561V2.35612C13.514 2.35612 12.8435 3.02279 10.832 3.02279C8.82055 3.02279 7.47957 1.68945 5.4681 1.68945C3.45662 1.68945 2.78613 2.35612 2.78613 2.35612V10.3561Z"
                                    stroke="white"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.78613 15.0231V10.3564"
                                    stroke="white"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span>Tracking</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : currentTodos ? (
                      currentTodos.map((item, i) => (
                        <div className="table_grid" key={i}>
                          <div className="img">
                            <a href="/account/order/view">
                              <img src={item.orgImg} alt="Gobi Cashmere" />
                            </a>
                          </div>
                          <div className="detail">
                            <span className="order">{item.orderName}</span>
                            <h1 className="tt txt_normal">
                              <a href="/account/order/view">{item.title}</a>
                            </h1>
                            <span className="size">{item.colorName}</span>
                            <span className="date">{item.createAt}</span>
                          </div>
                          <div className="price">
                            <span>${item.price}</span>
                          </div>
                          <div className="tc_row">
                            <div className="track">
                              <div className="icon">
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.78613 10.3561C2.78613 10.3561 3.45662 9.68945 5.4681 9.68945C7.47957 9.68945 8.82055 11.0228 10.832 11.0228C12.8435 11.0228 13.514 10.3561 13.514 10.3561V2.35612C13.514 2.35612 12.8435 3.02279 10.832 3.02279C8.82055 3.02279 7.47957 1.68945 5.4681 1.68945C3.45662 1.68945 2.78613 2.35612 2.78613 2.35612V10.3561Z"
                                    stroke="white"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.78613 15.0231V10.3564"
                                    stroke="white"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span>Tracking</span>
                            </div>
                            <div className="delete">
                              <div className="icon">
                                <svg
                                  width="18"
                                  height="17"
                                  viewBox="0 0 18 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.94336 4.5127H4.28434H15.0122"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6.29614 4.51237V3.17904C6.29614 2.82541 6.43742 2.48628 6.68891 2.23623C6.94039 1.98618 7.28147 1.8457 7.63712 1.8457H10.3191C10.6747 1.8457 11.0158 1.98618 11.2673 2.23623C11.5188 2.48628 11.6601 2.82541 11.6601 3.17904V4.51237M13.6715 4.51237V13.8457C13.6715 14.1993 13.5303 14.5385 13.2788 14.7885C13.0273 15.0386 12.6862 15.179 12.3306 15.179H5.62565C5.27 15.179 4.92892 15.0386 4.67743 14.7885C4.42595 14.5385 4.28467 14.1993 4.28467 13.8457V4.51237H13.6715Z"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.63721 7.8457V11.8457"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.3188 7.8457V11.8457"
                                    stroke="#111111"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span>Delete</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <AlertMessage
                        type={'warning'}
                        message="This email will be used for accessing your private pages as well as for receiving correspondence and newsletters."
                      />
                    )}
                  </div>
                </div>
                {changeData ? (
                  <div className="col d-flex">
                    <nav className="ml-auto">
                      <ul className="pagination">
                        <li className="page-item" onClick={() => prevPageList()}>
                          {currentPage - 1 < 1 ? (
                            <span className="page-link disabled">prev</span>
                          ) : (
                            <span onClick={() => prevPageList()} className="page-link click">
                              prev
                            </span>
                          )}
                        </li>
                        {callPagesList()}
                        <li className="page-item" onClick={() => nextPageList()}>
                          {currentPage + 1 > last ? (
                            <span className="page-link disabled">next</span>
                          ) : (
                            <span onClick={() => nextPageList()} className="page-link  click">
                              next
                            </span>
                          )}
                        </li>
                      </ul>
                    </nav>
                  </div>
                ) : (
                  <div className="col d-flex">
                    <nav className="ml-auto">
                      <ul className="pagination">
                        <li className="page-item">
                          {currentPage - 1 < 1 ? (
                            <span className="page-link disabled">prev</span>
                          ) : (
                            <span onClick={() => prevPage()} className="page-link click">
                              prev
                            </span>
                          )}
                        </li>
                        {callPages()}
                        <li className="page-item">
                          {currentPage + 1 > last ? (
                            <span className="page-link disabled">next</span>
                          ) : (
                            <span onClick={() => nextPage()} className="page-link  click">
                              next
                            </span>
                          )}
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import React from 'react';
import { connect } from 'react-redux';
import AccountSideBar from '../AccountSideBar/AccountSideBar';
import AccountMobileHeader from '../AccountMobileHeader/AccountMobileHeader';
// import useLoginHook from '../../../hooks/useLoginHook';
export default function AccountOrdersPage(props) {
  // useLoginHook();
  function handleClose() {
    props.setDetails('');
  }
  return (
    <div className="account-main">
      <div className="grid med">
        <div className="tc-breadcrumb">
          <ul>
            <li>
              <span className="p">View Order</span>
            </li>
          </ul>
        </div>
        <div className="invoice_card">
          <div className="card-header">
            <h1 className="md_tt bold uppercase" onClick={() => handleClose()}>
              &larr;&nbsp;&nbsp;View Order
            </h1>
            <div className="track">
              <div className="icon">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          <div className="card_sub">
            <div className="number_paid">
              <span className="order_number">{props.details[0].orderName}</span>
              <div className="box">
                <span>Paid</span>
              </div>
              <div className="box unfilled">
                <span>{props.details[0].fulfillmentStatus}</span>
              </div>
            </div>
            <div className="count_date">
              <div className="count">
                <span>{props.details.length} items</span>
              </div>
              <div className="date">
                <span>{props.details[0].createAt}</span>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tc_row">
              {props.details &&
                props.details.map((item, i) => (
                  <div className="list" key={i}>
                    <div className="img">
                      <img src={item.orgImg} alt="Gobi Cashmere" />
                    </div>
                    <div className="detail">
                      <h1 className="bg_tt">
                        <a href="#">{item.title}</a>
                      </h1>
                      <span className="color">{item.colorName}</span>
                      <span className="date">{item.createAt}</span>
                    </div>
                    <div className="price">
                      <div className="count_price">
                        <span>$ {item.price}</span>
                      </div>
                      <div className="final_price">
                        <span>$ {item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="tc_row">
                <div className="tc_table">
                  <div className="tHead">
                    <div className="th bold">Paid</div>
                    <div className="th"></div>
                    <div className="th"></div>
                  </div>
                  <div className="tBody">
                    <div className="tB_list">
                      <div className="tb">Subtotal</div>
                      <div className="tb">
                        <span>{props.details.length}Items</span>
                      </div>
                      <div className="tb pr">
                        $ {props.details[0].currentSubtotalPriceSet.presentmentMoney.amount}
                      </div>
                    </div>
                    {/* <div className="tB_list">
                      <div className="tb">Discount</div>
                      <div className="tb">
                        <span>welcome10</span>
                      </div>
                      <div className="tb pr">-$10.00</div>
                    </div> */}
                    <div className="tB_list">
                      <div className="tb">Shipping</div>
                      <div className="tb">
                        <span>USPS Priority Mail 2-Day (0.695 kg)</span>
                      </div>
                      <div className="tb pr">$ {props.details[0].totalShippingPrice}</div>
                    </div>
                    <div className="tB_list">
                      <div className="tb">Tax</div>
                      <div className="tb">
                        <span>CA COUNTY TAX 0.25%</span>
                      </div>
                      <div className="tb pr">$ {props.details[0].currentTotalTaxSet}</div>
                    </div>
                    <div className="tB_list">
                      <div className="tb bold">Total</div>
                      <div className="tb"></div>
                      <div className="tb pr bold">$ {props.details[0].currentTotalPriceSet}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AccountSideBar from '../AccountSideBar/AccountSideBar';
import AccountMobileHeader from '../AccountMobileHeader/AccountMobileHeader';
import useLoginHook from '../../../hooks/useLoginHook';
import ListOrders from './ListOrders';
import AccountOrdersPage from './AccountOrderViewPage';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  useLoginHook();
  const [order, setOrder] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [changeData, setChange] = useState();
  const [details, setDetails] = useState();
  const [search, setSearch] = useState('');
  const [days, setDays] = useState([
    { title: 'All days', day: 'all' },
    {
      title: 'Today',
      day: moment().format('L'),
    },
    {
      title: 'Yesterday',
      day: moment().subtract(1, 'days').format('L'),
    },
    {
      title: 'Week',
      day: Array.apply(null, Array(7)).map(function (_, i) {
        return moment(i, 'e').format('L');
      }),
    },
  ]);
  const noImg = 'https://cdn.shopify.com/s/files/1/1953/2845/files/no-image.jpg?v=1610370341';
  // let id = 'gid://shopify/Customer/3358063296570';
  let id = atob(props.customer && props.customer.id && props.customer.id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .post('http://localhost:9000/getuser', id)
        .then((res) => {
          let order = res.data.data.customer;
          let data = [];
          order.orders.edges.map((ord) => {
            let orderName = ord.node.name;
            let currentCartDiscountAmountSet = ord.node.currentCartDiscountAmountSet.presentmentMoney.amount;
            let currentSubtotalLineItemsQuantity = ord.node.currentSubtotalLineItemsQuantity;
            let currentSubtotalPriceSet = ord.node.currentSubtotalPriceSet;
            let currentTotalDiscountsSet = ord.node.currentTotalDiscountsSet;
            let currentTotalPriceSet = ord.node.currentTotalPriceSet.presentmentMoney.amount;
            let currentTotalTaxSet = ord.node.currentTotalTaxSet.presentmentMoney.amount;
            let totalShippingPrice = ord.node.totalShippingPrice;
            let totalRefundedSet = ord.node.totalRefundedSet.presentmentMoney.amount;
            let currentTotalWeight = ord.node.currentTotalWeight;
            let createAt = null ? noImg : moment(ord.node.createdAt).format('L');
            ord.node.lineItems.edges.map((line) => {
              let title = line.node.title;
              let fulfillmentStatus = line.node.fulfillmentStatus;
              let price = line.node.discountedUnitPriceSet.presentmentMoney.amount;
              let colorList = line.node.name.split('-');
              let colorName = colorList[1];
              let color = line.node.name.split('/');
              let colorNew = color[1];
              // let createAt =
              //   line.node.product === null ? 'no Products' : moment(line.node.product.createdAt).format('L');
              let orgImg = line.node.product === null ? noImg : line.node.product.images.edges[0].node.originalSrc;
              data.push({
                orderName,
                title,
                createAt,
                orgImg,
                fulfillmentStatus,
                price,
                colorNew,
                colorName,
                currentCartDiscountAmountSet,
                currentSubtotalLineItemsQuantity,
                currentSubtotalPriceSet,
                currentTotalDiscountsSet,
                currentTotalPriceSet,
                currentTotalTaxSet,
                currentTotalWeight,
                totalShippingPrice,
                totalRefundedSet,
              });
            });
            setOrderHistory([data]);
            setOrder(order);
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value === 'all') {
      let data = [];
      for (var i = 0; i < orderHistory[0].length; i++) {
        data.push(orderHistory[0][i]);
      }
      return setChange([data]);
    } else {
      let day = e.target.value;
      let datalist = day.split(',');
      let data = [];
      if (datalist) {
        for (var i = 0; i < orderHistory[0].length; i++) {
          for (var e = 0; e < datalist.length; e++) {
            if (orderHistory[0][i].createAt === datalist[e]) data.push(orderHistory[0][i]);
          }
        }
        return setChange([data]);
      } else {
        data.push(
          _.find(orderHistory[0], function (o) {
            return o.createAt === day ? o.createAt === day : '';
          }),
        );
        setChange([data]);
      }
    }
  };

  const ordersDetailsHandle = (data) => {
    let list = _.filter(orderHistory[0], function (o) {
      return o.orderName === data;
    });
    setDetails(list);
  };

  var chars = _.orderBy(orderHistory[0], ['createAt'], 'desc');
  var list = changeData && _.orderBy(changeData[0], ['createAt'], 'desc');

  const [state, setState] = useState({
    currentPage: 1,
    totalPage: 6,
  });
  let { currentPage, totalPage } = state;

  const indexOfLastTodoList = currentPage * totalPage;
  const indexOfFirstTodoList = indexOfLastTodoList - totalPage;
  const currentTodosList = list && list.slice(indexOfFirstTodoList, indexOfLastTodoList);
  const lastList = Math.ceil(list && list.length / totalPage);
  const nextPageList = () => {
    if (currentPage + 1 <= totalPage) {
      setState({ ...state, currentPage: currentPage + 1 });
    }
  };

  const prevPageList = () => {
    if (currentPage - 1 >= 1) {
      setState({ ...state, currentPage: currentPage - 1 });
    }
  };

  const setPageList = (currentPage) => {
    setState({ ...state, currentPage });
  };
  const callPagesList = () => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(list && list.length / totalPage); i++) {
      pages.push(
        <li key={'li-' + i} className={currentPage === i ? 'page-item active' : 'page-item click'}>
          <span className={currentPage === i ? 'page-link' : 'page-link click'} onClick={() => setPage(i)}>
            {i}
          </span>
        </li>,
      );
    }
    return pages;
  };

  const indexOfLastTodo = currentPage * totalPage;
  const indexOfFirstTodo = indexOfLastTodo - totalPage;
  const currentTodos = chars.slice(indexOfFirstTodo, indexOfLastTodo);
  const last = Math.ceil(chars.length / totalPage);
  const nextPage = () => {
    if (currentPage + 1 <= totalPage) {
      setState({ ...state, currentPage: currentPage + 1 });
    }
  };

  const prevPage = () => {
    if (currentPage - 1 >= 1) {
      setState({ ...state, currentPage: currentPage - 1 });
    }
  };

  const setPage = (currentPage) => {
    setState({ ...state, currentPage });
  };
  const callPages = () => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(chars.length / totalPage); i++) {
      pages.push(
        <li
          key={'li-' + i}
          className={currentPage === i ? 'page-item active' : 'page-item click'}
          onClick={() => setPage(i)}
        >
          <span className={currentPage === i ? 'page-link' : 'page-link click'} onClick={() => setPage(i)}>
            {i}
          </span>
        </li>,
      );
    }
    return pages;
  };

  return [
    <section id="Profile" key={1}>
      <div className="account-page">
        <AccountSideBar />

        {details ? (
          <AccountOrdersPage details={details} setDetails={setDetails} />
        ) : (
          <ListOrders
            orderHistory={chars}
            changeData={list}
            search={search}
            days={days}
            onChange={onChange}
            setSearch={setSearch}
            ordersDetailsHandle={ordersDetailsHandle}
            nextPage={nextPage}
            prevPage={prevPage}
            callPages={callPages}
            currentTodos={currentTodos}
            last={last}
            currentPage={currentPage}
            totalPage={totalPage}
            nextPageList={nextPageList}
            prevPageList={prevPageList}
            callPagesList={callPagesList}
            currentTodosList={currentTodosList}
            lastList={lastList}
            order={order}
          />
        )}
      </div>
    </section>,
  ];
});

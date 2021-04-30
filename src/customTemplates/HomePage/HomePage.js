import './HomePage.scss';
import React, { useEffect } from 'react';
import { ReactTitle } from 'react-meta-tags';
import DesktopHome from './DesktopHome/DesktopHome';
import { connect } from 'react-redux';
import { allPagesEvent } from '../../components/shared/dataLayer/index';
import BlackWeek from './BlackWeek/BlackWeek';

const mapStateToProps = (state) => ({
  currency: state.currency,
  customer: state.customer,
  checkout: state.checkout,
});

export default connect(mapStateToProps)(function HomePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    allPagesEvent();
  }, [typeof window !== `undefined` && window && window.dataLayer]);

  return (
    <div className="home_page">
      <BlackWeek />
      <DesktopHome currency={props.currency} />
      <ReactTitle key={3} title="Premium Cashmere Brand - Gobi Cashmere" />
    </div>
  );
});

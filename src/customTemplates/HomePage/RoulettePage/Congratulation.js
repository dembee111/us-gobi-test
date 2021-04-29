import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './RouletteMain.scss';
export default (function Congratulation(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const okClick = () => {
    props.onFinish(null, 2);
  };

  return (
    <section className="grand-prize">
      <div className="circle-bg"></div>
      <div className="description-box">
        <div className="top-title">
          <h1>Congratulations</h1>
          <p>you won the</p>
        </div>
        <div className="center-title">
          <h1>{props.data.text}</h1>
        </div>
        <div className="grand-btn" onClick={() => okClick()}>
          <span>Continue</span>
        </div>
      </div>
    </section>
  );
});

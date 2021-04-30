import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './RouletteMain.scss';
export default (function GrandPrizeChoose(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const okClick = (isMan) => {
    props.onFinish(isMan, 4);
  };

  return (
    <section className="grand-prize">
      <div className="circle-bg"></div>
      <div className="description-box">
        <div className="choose-title">
          <p>{props.data.data.chooseTitle}</p>
        </div>

        <div
          className="grand-btn"
          onClick={() => {
            okClick(true);
          }}
        >
          <span>{props.data.data.chooseMale}</span>
        </div>
        <div
          className="grand-btn"
          onClick={() => {
            okClick(false);
          }}
        >
          <span>{props.data.data.chooseFemale}</span>
        </div>
      </div>
    </section>
  );
});

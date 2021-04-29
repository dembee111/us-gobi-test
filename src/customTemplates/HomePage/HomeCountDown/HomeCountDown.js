import React, { useEffect, useState } from 'react';
import './HomeCountDown.scss';
import { Link } from 'gatsby';
import {
  getInitFullDate,
  checkFullTimer,
  formatFullCountDown,
  formatCountDown,
} from '../../../components/shared/countDown';

export default (function HomeCountDown(props) {
  const [nowDate, setNowDate] = useState();

  useEffect(() => {
    const getNowDate = async () => {
      const rawDate = await getInitFullDate();

      setNowDate(rawDate);
    };
    getNowDate();
  }, []);

  useEffect(() => {
    if (nowDate) {
      if (nowDate.finish == false) {
        setTimeout(() => {
          const rawItem = checkFullTimer(nowDate);
          setNowDate(rawItem);
        }, 1000);
      }
    }
  }, [nowDate]);

  return (
    <div className="homepage-count">
      <div className="homepage-count-title">
        <h1>Winter Sale ends in</h1>
      </div>
      <div className="count-grid-col">
        <div className="count-grid-item">
          <div className="count-box">
            <div className="count-day-timer">
              <div className="timer-width">
                <div className="timer-f">
                  <div className="timer f-border">
                    {nowDate && nowDate.nowDate && formatFullCountDown(nowDate.nowDate)[0]}
                  </div>
                </div>
                <div className="timer-txt">Days</div>
              </div>
            </div>
            <div className="count-timer">
              <div className="timer-width">
                <div className="timer-f">
                  <div className="timer l-border">
                    {nowDate && nowDate.nowDate && formatFullCountDown(nowDate.nowDate)[1]}
                  </div>
                  <div className="s">:</div>
                </div>
                <div className="timer-txt">HRS</div>
              </div>

              <div className="timer-width">
                <div className="timer-f">
                  <div className="timer">{nowDate && nowDate.nowDate && formatFullCountDown(nowDate.nowDate)[2]}</div>
                  <div className="s">:</div>
                </div>
                <div className="timer-txt">MINS</div>
              </div>

              <div className="timer-width">
                <div className="timer-f">
                  <div className="timer r-border">
                    <div className="date">
                      <div>{nowDate && nowDate.nowDate && formatFullCountDown(nowDate.nowDate)[3]}</div>
                    </div>
                  </div>
                </div>
                <div className="timer-txt">SECS</div>
              </div>

              {/* {nowDate ? formatCountDown(nowDate.nowDate) : '00 : 00 : 00'} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

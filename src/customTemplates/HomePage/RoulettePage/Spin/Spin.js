import React, { useState, useRef, useEffect } from 'react';
import './SpinStyle.scss';
import Confetti from 'react-dom-confetti';
export default function Spin(props) {
  const [active, setActive] = useState(false);
  const [selData, setSelData] = useState();
  const config = {
    angle: '190',
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };
  const [state, setState] = useState({
    prizes: [],
    prize_rotate: [],
    prize_transition: '',
    each_deg: 0,
    rotate_deg: 90,
    start_deg: 0,
    current_deg: 0,
    index: 0,
    duration: 3000,
    time_remaining: 3,
    num: 0,
    numbers: [],
    isClicked: false,
    isShow: true,
    prize: '',
    prize_count: '',
    text: null,
  });

  // props.onFinish(data, 1)

  const obj = props.data;

  useEffect(() => {
    let num = obj.length;
    {
      degree(num);
    }
    let prizes = obj;
    let numbers = obj.map((prize, index) => {
      return index;
    });
    setState({
      ...state,
      prizes,
      num,
      numbers,
    });
    setActive(false);
  }, []);

  useEffect(() => {
    if (selData) {
      setTimeout(() => {
        props.onFinish(selData, 1);
      }, 1000);
    }
  }, [selData]);

  let degree = (num) => {
    for (let i = 1; i <= num; i++) {
      let deg = 360 / num;
      state.each_deg = deg;
      let eachDeg;
      eachDeg = i * deg;
      state.prize_rotate.push(eachDeg);
    }
  };

  const spinCalc = () => {};

  let rotateHandler = () => {
    if (state.time_remaining > 0) {
      let {
        isClicked,
        numbers,
        start_deg,
        prize_rotate,
        rotate_deg,
        prize_transition,
        duration,
        time_remaining,
        current_deg,
        prizes,
        isShow,
      } = state;
      if (isClicked) return;
      isShow = isClicked;

      /* spin % tootsoh*/
      function findCeil(arr, r, l, h) {
        var mid;
        while (l < h) {
          {
            mid = l + ((h - l) >> 1);
            if (r > arr[mid]) l = mid + 1;
            else h = mid;
          }
        }
        return arr[l] >= r ? l : -1;
      }

      function myRand(arr, freq, n) {
        var prefix = (function (s) {
          var a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(n);
        var i;
        prefix[0] = freq[0];
        for (i = 1; i < n; ++i) {
          prefix[i] = prefix[i - 1] + freq[i];
        }
        var r = (((Math.random() * 623567) | 0) % prefix[n - 1]) + 1;
        var indexc = findCeil(prefix, r, 0, n - 1);
        return arr[indexc];
      }

      var arr = [0, 1, 2, 3, 4, 5, 6, 7];
      var freq = props.data.freq;

      var n = arr.length;
      let index = myRand(arr, freq, n);
      /* spin % tootsoh end */

      // let index = numbers[Math.floor(Math.random() * numbers.length)];
      let circle = 4;
      let test;
      test = start_deg + circle * 360 + prize_rotate[index] - (start_deg % 360);
      start_deg = test;
      rotate_deg = `rotate(${test}deg)`;

      prize_transition = `all ${duration / 1000}s cubic-bezier(0.42, 0, 0.2, 0.91)`;
      time_remaining--;
      isClicked = true;

      let remainder = start_deg % 360;
      if (remainder <= 0) {
        current_deg = remainder + 360;
      } else if (remainder > 0) {
        current_deg = remainder;
      }

      setTimeout(() => {
        revealRefs.current[index].classList.value = `item item-skew active`;
      }, duration);

      setTimeout(() => {
        let prize = state.prizes[index];
        let prize_count = prize.name;

        setSelData(prize);
        setState({ ...state, prize_count });
      }, duration);

      setTimeout(() => {
        if (isClicked === true) {
          isClicked = false;
        }
      }, duration);

      setState({ ...state, rotate_deg, prize_transition, isClicked });
    }
  };

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <React.Fragment>
      <div
        style={
          active === false
            ? { display: 'none' }
            : {
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '30',
              }
        }
      >
        <Confetti active={active} config={config} />
      </div>
      <div className="spin-container">
        <div id="app">
          <div className="lucky-wheel">
            <div className="pointer-container">
              <div
                className="pointer"
                id="pointer"
                style={{ transform: `${state.rotate_deg}`, transition: `${state.prize_transition}` }}
                onClick={() => rotateHandler()}
              ></div>
            </div>
            <div className={'spinContainer'}>
              {obj.map((item, i) => (
                <div key={i} ref={addToRefs} className={'item item-skew'}>
                  <div className={'item-content'}>
                    <span>{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

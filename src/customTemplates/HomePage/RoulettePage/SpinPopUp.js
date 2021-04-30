import React, { useEffect, useState } from 'react';
import './RouletteMain.scss';
import Spin from './Spin/Spin';
import GrandPrizeChoose from './GrandPrizeChoose';
import Congratulation from './Congratulation';
import CongratulationForm from './CongratulationForm';
import GiftCodePop from './GiftCodePop';
import ProductData from './ProductData';
import PlusProductList from './PlusProductList';

export default (function SpinPopUp({ callBack, ...props }) {
  const [mainType, setMainType] = useState(0);
  const [selPrize, setSelPrize] = useState();
  const [mainData, setMainData] = useState();
  const [isFinish, setIsFinish] = useState(true);

  const spinData = props.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   if (isFinish) {
  //   }
  // }, [isFinish]);

  const renderMain = () => {
    // 2 - giftbox
    // 6 - MASK
    // 8 grand prize

    if (mainType == 0) {
      return <Spin data={spinData.data} onFinish={onFinish} />;
    } else if (mainType == 1) {
      return <Congratulation data={selPrize} onFinish={onFinish} />;
    } else if (mainType == 2) {
      return (
        <CongratulationForm
          data={selPrize}
          onFinish={onFinish}
          hubSpotForm={spinData.hubSpotForm}
          country={spinData.country}
        />
      );
    } else if (mainType == 3) {
      if (selPrize.id == 2 || selPrize.id == 6) {
        return <ProductData data={selPrize} handle={selPrize.handle} onFinish={onFinish} currency={props.currency} />;
      } else if (selPrize.id == 8) {
        if (selPrize.data.isChoose) {
          return <GrandPrizeChoose data={selPrize} onFinish={onFinish} />;
        } else {
          return <ProductData data={selPrize} handle={selPrize.handle} onFinish={onFinish} currency={props.currency} />;
        }
      } else if (selPrize.id == 9) {
        console.log('plus product');
        return (
          <PlusProductList data={selPrize} handle={selPrize.handle} onFinish={onFinish} currency={props.currency} />
        );
      } else {
        // setIsFinish(true);
        return <GiftCodePop data={selPrize} onFinish={onFinish} coupon={selPrize.coupon} />;
      }
    } else if (mainType == 4) {
      if (selPrize.id == 2) {
        return (
          <GiftCodePop
            data={selPrize}
            addText={'Order now to claim your prize.'}
            onFinish={onFinish}
            coupon={selPrize.coupon}
          />
        );
      } else if (selPrize.id == 8) {
        // setIsFinish(true);
        let rawHandle = '';
        let coupon = '';

        if (selPrize.data.isChoose) {
          rawHandle = selPrize.data.handleFemale;
          coupon = selPrize.data.couponFemale;

          if (mainData.isMan == true) {
            rawHandle = selPrize.data.handleMale;
            coupon = selPrize.data.couponMale;
          }
        } else {
          rawHandle = selPrize.data.handle;
          coupon = selPrize.data.coupon;
        }

        return (
          <ProductData
            data={selPrize}
            handle={rawHandle}
            onFinish={onFinish}
            currency={props.currency}
            coupon={coupon}
          />
        );
      } else if (selPrize.id == 9) {
        // setIsFinish(true);
        let rawHandle = '';
        let coupon = '';

        if (selPrize.data.isChoose) {
          rawHandle = selPrize.data.handleFemale;
          coupon = selPrize.data.couponFemale;

          if (mainData.isMan == true) {
            rawHandle = selPrize.data.handleMale;
            coupon = selPrize.data.couponMale;
          }
        } else {
          rawHandle = selPrize.data.handle;
          coupon = selPrize.data.coupon;
        }

        return (
          <ProductData
            data={selPrize}
            handle={rawHandle}
            onFinish={onFinish}
            currency={props.currency}
            coupon={coupon}
          />
        );
      }
    } else if (mainType == 5) {
      let rawHandle = '';
      let coupon = '';

      if (selPrize.data) {
        if (selPrize.data.isChoose) {
          rawHandle = selPrize.data.handleFemale;
          coupon = selPrize.data.couponFemale;

          if (mainData.isMan == true) {
            rawHandle = selPrize.data.handleMale;
            coupon = selPrize.data.couponMale;
          }
        } else {
          rawHandle = selPrize.data.handle;
          coupon = selPrize.data.coupon;
        }
      } else {
        coupon = selPrize.coupon;
      }

      return <GiftCodePop data={selPrize} addText={'FREE COAT'} onFinish={onFinish} coupon={coupon} />;
    }
  };

  const onFinish = (data, type) => {
    if (type == 1) {
      //test setting
      // data = spinData.data[6];
      // console.log(data);

      setSelPrize(data);
    } else if (type == 3) {
      setMainData({ ...mainData, email: data });
    } else if (type == 4) {
      if (selPrize.id == 2) {
        setMainData({ ...mainData, product: data });
      } else if (selPrize.id == 8) {
        setMainData({ ...mainData, isMan: data });
      } else if (selPrize.id == 9) {
        setMainData({ ...mainData, product: data });
      }
    } else if (type == 5) {
      if (selPrize.id == 9) {
        setMainData({ ...mainData, product1: data });
      } else {
        setMainData({ ...mainData, product: data });
      }
    }

    setMainType(type);
  };

  return (
    <section className="spin-popup-section">
      <div className="spin-popup-bg" onClick={callBack}></div>
      <div className="spin-popup bg1">
        <div className="spin-popup-grid">
          <div className="spin-description">
            <h1>Spin to Win</h1>
            <p>
              {`GOBI Cashmere is bringing joy & happiness with Christmas surprises. 
                        Test your luck and see what amazing prize you'll get!`}
            </p>
            <p className="p-yellow">
              Single play only once a day! <br></br>Prize will be valid for only 24 hours
            </p>
          </div>
          <div className="spin-box">{renderMain()}</div>
        </div>
        <div className="spin-close-btn" onClick={callBack}>
          <img
            src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_62.svg?v=1605839976"
            alt="Close Btn"
          ></img>
        </div>
      </div>
    </section>
  );
});

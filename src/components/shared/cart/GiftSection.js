import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GiftOption from './GiftOption';
import { addFreeGift, giftsDefault, hasIcecreamCollection } from './CartHelpers';
import './GiftSection.scss';

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  currency: state.currency,
  client: state.client,
});
export default connect(mapStateToProps)(GiftSection);

function GiftSection(props) {
  const [giftsCollected, setGiftsCollected] = useState();

  useEffect(() => {
    if (props.client && props.client.query) {
      if (!giftsCollected) {
        addFreeGift(Number(props.checkout.totalPriceV2.amount), giftsDefault).then((gifts) => {
          setGiftsCollected(gifts);
        });
      }
    }
  }, [props.client]);

  if (
    props.checkout &&
    props.checkout.lineItems &&
    props.checkout.lineItems.edges &&
    hasIcecreamCollection(props.checkout.lineItems.edges)
  ) {
    if (props.isMini) {
      return (
        <div className="tc_gift-section_mini">
          <div className="gift_header">
            <div className="gift_tt">
              <span>Add a gift</span>
            </div>
          </div>
          {giftsCollected &&
            giftsCollected.map((giftCollected) => {
              if (giftsCollected)
                return (
                  <GiftOption
                    key={giftCollected.id}
                    giftCollected={giftCollected}
                    setIsGiftAdded={props.setIsGiftAdded}
                    isMini={true}
                  />
                );
            })}
        </div>
      );
    } else {
      return (
        <div className="tc_gift-section">
          <div className="gift_header">
            <div className="gift_tt">
              <span>Add a Gift</span>
            </div>
            <div className="header_icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3996 9V17H2.59961V9" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 5H1V9H17V5Z" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 17V5" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M9.00039 5H5.40039C4.86996 5 4.36125 4.78929 3.98618 4.41421C3.6111 4.03914 3.40039 3.53043 3.40039 3C3.40039 2.46957 3.6111 1.96086 3.98618 1.58579C4.36125 1.21071 4.86996 1 5.40039 1C8.20039 1 9.00039 5 9.00039 5Z"
                  stroke="#212121"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 5H12.6C13.1304 5 13.6391 4.78929 14.0142 4.41421C14.3893 4.03914 14.6 3.53043 14.6 3C14.6 2.46957 14.3893 1.96086 14.0142 1.58579C13.6391 1.21071 13.1304 1 12.6 1C9.8 1 9 5 9 5Z"
                  stroke="#212121"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {giftsCollected &&
            giftsCollected.map((giftCollected) => {
              if (giftsCollected)
                return (
                  <GiftOption
                    key={giftCollected.id}
                    giftCollected={giftCollected}
                    setIsGiftAdded={props.setIsGiftAdded}
                  />
                );
            })}
        </div>
      );
    }
  } else return null;
}

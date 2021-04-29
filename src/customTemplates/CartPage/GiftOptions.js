import React, { useState } from 'react';

const GiftOptions = (props) => {

    return (
        <div className="gift-option">
            <div className="gift-box" onClick={() => props.setRightSide(true)}>
                <div className="img">
                    <img
                        src={props.giftImage}
                        alt="Gobi Cashmere"
                    />
                </div>
                <div className="gift-det">
                    <p className="gift-det-tt">{props.title}</p>
                    <p className="gift-det-text">{props.desc}</p>
                </div>
                <div className="icon">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L7 7L0.999999 1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default GiftOptions
import React from 'react';
import './alert.scss';

const AlerMessage = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`} style={message !== '' ? { display: 'block' } : { display: 'none' }}>
      <div className="alert-content">
        {type === 'danger' && (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.9531 22C18.476 22 22.9531 17.5228 22.9531 12C22.9531 6.47715 18.476 2 12.9531 2C7.43028 2 2.95312 6.47715 2.95312 12C2.95312 17.5228 7.43028 22 12.9531 22Z"
              stroke="#770906"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.9531 9L9.95312 15"
              stroke="#770906"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.95312 9L15.9531 15"
              stroke="#770906"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type === 'warning' && (
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.9531 22C18.476 22 22.9531 17.5228 22.9531 12C22.9531 6.47715 18.476 2 12.9531 2C7.43028 2 2.95312 6.47715 2.95312 12C2.95312 17.5228 7.43028 22 12.9531 22Z"
              stroke="#776906"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12.9531 16V12" stroke="#776906" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M12.9531 8H12.9631"
              stroke="#776906"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type === 'success' && (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.9531 11.5545V12.4745C22.9519 14.6309 22.2536 16.7291 20.9625 18.4563C19.6713 20.1834 17.8564 21.447 15.7885 22.0584C13.7206 22.6698 11.5104 22.5964 9.4876 21.8491C7.46481 21.1017 5.73778 19.7206 4.56409 17.9115C3.39039 16.1025 2.83292 13.9625 2.9748 11.8108C3.11669 9.65904 3.95033 7.6108 5.3514 5.97155C6.75248 4.33229 8.64591 3.18986 10.7493 2.71462C12.8527 2.23938 15.0534 2.45681 17.0231 3.33447"
              stroke="#18820F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.9531 4.47461L12.9531 14.4846L9.95312 11.4846"
              stroke="#18820F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <span className="alert-message">&nbsp;{message}</span>
      </div>
    </div>
  );
};
export default AlerMessage;

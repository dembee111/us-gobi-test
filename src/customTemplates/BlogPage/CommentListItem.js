import React from 'react';
import moment from 'moment';

const toDateTime = (secs) => {
  const t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return moment(t).format('MMM D, YYYY');
};

export default ({ comment }) => {
  if (!comment) return null;
  const {
    name,
    content,
    createdAt: { _seconds },
  } = comment;
  return (
    <div className="box">
      <div className="tt_date">
        <span className="tt">{name}</span>
        <span className="date">{toDateTime(_seconds)}</span>
      </div>
      <div className="body">
        <p>{content}</p>
      </div>
    </div>
  );
};

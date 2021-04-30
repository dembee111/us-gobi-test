import React from 'react';
import CommentListItem from './CommentListItem';

export default ({ comments }) => {
  if (!comments) return null;
  const total = comments.length;
  return (
    <div className="col-12">
      <div className="comment_list">
        <div className="row">
          <div className="col-12">
            <h2 className="bg_tt">Comment ({total})</h2>
          </div>
          <div className="col-md-9">
            {comments && comments.map((comment, index) => <CommentListItem key={index} comment={comment} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

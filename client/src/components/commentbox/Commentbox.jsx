import React from 'react';
import "./commentbox.css";

const Commentbox = (props) => {
  return (
    <div className='comment-box'>
      {(props.comments.length > 0 )&&
      <h2>Comments</h2>}
      <div className = 'comment-list' style={{ height: '320px', width: '100%' , overflowY: 'scroll' }}>
      <ul>
        {props.comments.map((comment) => (
          <li key={comment.id}>
            <div>
              <strong>{comment.username}</strong> said:
            </div>
            <div>{comment.comment}</div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Commentbox;
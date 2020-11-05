import React, { useState } from "react";

const LikeButton = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="ui labeled button">
      <div className="ui red button" onClick={() => props.like(props.id)}>
        {!isLiked ? (
          <i className="heart icon"></i>
        ) : (
          <i className="thumbs down outline icon"></i>
        )}
      </div>
      <a className="ui basic red left pointing label">{props.nbLike}</a>
    </div>
  );
};

export default LikeButton;

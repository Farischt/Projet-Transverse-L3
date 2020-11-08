import React, { useState, useEffect } from "react";
import { useSelector /*, useDispatch */ } from "react-redux";
//import axios from "axios";

const LikeButton = (props) => {
  //let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user.likedItems && user.likedItems.length > 0) {
      const check = user.likedItems.find((a) => a.itemId === props.element._id);
      if (check) setIsLiked(true);
      else setIsLiked(false);
    } else setIsLiked(false);
    console.log("bjr");
  }, [user, props.element._id]);

  /* const handleLike = async () => {
    await axios.post("/api/item/like/" + props.element._id);
    const res = await axios.get("/api/item");
    const userLikes = await axios.get("/api/item/liked");
  };*/

  return (
    <div className="ui labeled button">
      <div className="ui red button">
        {!isLiked && <i className="thumbs up outline icon"></i>}
        {isLiked && <i className="thumbs down outline icon"></i>}
      </div>
      <div className="ui basic red left pointing label">
        {props.element.likes}
      </div>
    </div>
  );
};

export default LikeButton;

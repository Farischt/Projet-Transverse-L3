import React from "react";
import LikeButton from "./LikeButton";
import "../../../../css/Buttons.css";

const Item = (props) => {
  console.log(props);
  return (
    <div className="item">
      <div className="image">
        <img src={props.element.imageUrl} alt="png" />
      </div>
      <div className="content">
        <a className="header"> {props.element.name} </a>
        <div className="meta">
          <span className="cinema"> {props.element.price}$ </span>
        </div>
        <div className="description">
          <p>
            {" "}
            {props.element.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Unde, at ab! Non minima dolorum exercitationem
            placeat impedit tempora. Necessitatibus, laudantium.
          </p>
        </div>
        <div className="extra">
          <div className="ui right floated primary button">
            Ajouter au panier
            <i className="right chevron icon"></i>
          </div>
          <div className="ui right floated primary button">
            Voir plus
            <i className="right chevron icon"></i>
          </div>
          <div
            className="ui label"
            style={{ backgroundColor: "gold", color: "white" }}
          >
            Edition Limité
          </div>
          <div className="ui label">{props.element.sales} vente(s) </div>
        </div>
        <LikeButton id={props.element._id} />
      </div>
    </div>
  );
  //}
};

export default Item;

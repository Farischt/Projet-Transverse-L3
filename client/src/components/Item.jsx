import React, { Component } from "react";
import LikeButton from "./LikeButton";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  render() {
    return (
      <div className="item">
        <div className="image">
          <img
            src="https://www.bentoburo.com/69-thickbox_default/canettes-coca-cola.jpg"
            alt="png"
          />
        </div>
        <div className="content">
          <a className="header"> {this.props.element.name} </a>
          <div className="meta">
            <span className="cinema"> {this.props.element.price}$ </span>
          </div>
          <div className="description">
            <p>
              {" "}
              {this.props.element.description} Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Unde, at ab! Non minima dolorum
              exercitationem placeat impedit tempora. Necessitatibus,
              laudantium.
            </p>
          </div>
          <div className="extra">
            <div
              className="ui right floated primary button"
              style={{ backgroundColor: "#353a40" }}
            >
              Ajouter au panier
              <i className="right chevron icon"></i>
            </div>
            <div
              className="ui label"
              style={{ backgroundColor: "gold", color: "white" }}
            >
              Edition Limité
            </div>
            <div className="ui label">{this.props.element.sales} vente(s) </div>
          </div>
          {/*<div className="ui labeled button">
            <div className="ui red button">
              <i className="heart icon"></i> Like
            </div>
            <a className="ui basic red left pointing label">1,048</a>
    </div>*/}
          <LikeButton
            id={this.props.element._id}
            like={this.props.like}
            nbLike={this.props.element.likes}
          />
        </div>
      </div>
    );
  }
}

export default Item;

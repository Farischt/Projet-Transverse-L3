import React, { Component } from "react";

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  render() {
    return (
      <div className="ui labeled button">
        <div
          className="ui red button"
          onClick={() => this.props.like(this.props.id)}
        >
          {!this.state.isLiked ? (
            <i className="heart icon"></i>
          ) : (
            <i class="thumbs down outline icon"></i>
          )}
        </div>
        <a className="ui basic red left pointing label">{this.props.nbLike}</a>
      </div>
    );
  }
}

export default LikeButton;
